import React, { useState, useEffect, useMemo } from 'react'
import { Col, Row, Table, Button, DatePicker, Tag, Popover, Badge } from '@douyinfe/semi-ui'
import { IconRefresh, IconChevronLeft, IconChevronRight } from '@douyinfe/semi-icons'
import LIMIT_UP_COLOR from '../../constants/constant'
import moment from 'moment'
import api from '../../hook/api'
export default function LimitUp() {
  const [value, setValue] = useState([])
  const [time, setTime] = useState(moment().format('yyyy-MM-DD'))
  useEffect(() => {
    refresh()
  }, [])
  function onChangeTime(date, dateString) {
    setTime(dateString)
  }
  function refresh(date) {
    date = !date ? time : date
    api.Xgb.jrzt(date).then((res) => {
      if (res.data) {
        setValue(res.data)
        window.api.store.set(date, JSON.stringify(res.data))
      } else {
        setValue([])
      }
    })
  }
  function before() {
    let date = moment(time, 'YYYY-MM-DD').subtract(1, 'days')
    setTime(date.format('YYYY-MM-DD'))
    refresh(date.format('YYYY-MM-DD'))
  }
  function next() {
    let date = moment(time, 'YYYY-MM-DD').add(1, 'day')
    setTime(date.format('YYYY-MM-DD'))
    refresh(date.format('YYYY-MM-DD'))
  }
  const columns = [
    {
      title: '名称',
      width: 120,
      fixed: true,
      dataIndex: 'stock_chi_name'
    },
    {
      title: '首次涨停时间',
      width: 200,
      render: (text, record, index) => {
        return moment.unix(record.first_limit_up).format('yyyy-MM-DD HH:mm:ss')
      }
    },
    {
      title: '最后一次涨停时间',
      width: 200,
      render: (text, record, index) => {
        return moment.unix(record.last_limit_up).format('yyyy-MM-DD HH:mm:ss')
      }
    },
    {
      title: '流通市值',
      width: 120,
      render: (text, record, index) => {
        return Math.round(record.non_restricted_capital / 1000000) / 100 + '亿'
      }
    },
    {
      title: '换手率',
      width: 120,
      render: (text, record, index) => {
        return Math.round(record.turnover_ratio * 10000) / 100 + '%'
      }
    },
    {
      title: '连板',
      width: 120,
      dataIndex: 'm_days_n_boards_boards',
      sorter: (a, b) => Number(a.m_days_n_boards_boards) - Number(b.m_days_n_boards_boards),
      render: (text, record, index) => {
        return record.m_days_n_boards_boards === 0 ? '首板' : record.m_days_n_boards_boards + '连板'
      }
    },
    {
      title: '涨停原因',
      width: 120,
      dataIndex: 'break_limit_down_times',
      sorter: (a, b) =>
        new Intl.Collator('zh-Hans-CN', { sensitivity: 'accent' }).compare(
          a.surge_reason.related_plates[0].plate_reason,
          b.surge_reason.related_plates[0].plate_reason
        ),
      render: (text, record, index) => {
        const renderObject = {}
        let children = null
        if (record.surge_reason.related_plates[0].plate_reason) {
          children = (
            <Popover
              showArrow
              margin={0}
              content={<article>{record.surge_reason.related_plates[0].plate_reason}</article>}
              position="top"
              key={index}
            >
              <Badge dot>
                <Tag
                  color={LIMIT_UP_COLOR[Number(record.m_days_n_boards_boards)]}
                  key={LIMIT_UP_COLOR[Number(record.m_days_n_boards_boards)]}
                >
                  {record.surge_reason.related_plates[0].plate_name}
                </Tag>
              </Badge>
            </Popover>
          )
        } else {
          children = (
            <Tag
              color={LIMIT_UP_COLOR[Number(record.m_days_n_boards_boards)]}
              key={LIMIT_UP_COLOR[Number(record.m_days_n_boards_boards)]}
            >
              {record.surge_reason.related_plates[0].plate_name}
            </Tag>
          )
        }
        renderObject.children = children
        return renderObject
      }
    },
    {
      title: '原因',
      width: 120,
      dataIndex: 'surge_reason.stock_reason',
      ellipsis: true
    }
  ]
  const handleRow = (record, index) => {
    // 给偶数行设置斑马纹
    if (index % 2 === 0) {
      return {
        style: {
          background: 'var(--semi-color-fill-0)'
        }
      }
    } else {
      return {}
    }
  }
  return (
    <div style={{ padding: 4 }}>
      <Row>
        <Col span={3} style={{ padding: 1 }}>
          <DatePicker value={time} onChange={onChangeTime} />
        </Col>
        <Col offset={3}>
          <Button
            icon={<IconChevronLeft />}
            theme="solid"
            style={{ marginRight: 10 }}
            aria-label="前一天"
            onClick={before}
          />
          <Button
            icon={<IconChevronRight />}
            theme="solid"
            style={{ marginRight: 10 }}
            aria-label="后一天"
            onClick={next}
          />
          <Button
            icon={<IconRefresh />}
            theme="solid"
            style={{ marginRight: 10 }}
            aria-label="刷新"
            onClick={() => refresh()}
          />
        </Col>
      </Row>
      <Row>
        <Table
          columns={columns}
          dataSource={value}
          pagination={false}
          onRow={handleRow}
          scroll={() => useMemo(() => ({ y: '80vh' }), [])}
        />
      </Row>
    </div>
  )
}
