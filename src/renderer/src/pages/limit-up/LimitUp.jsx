import React, { useState, useEffect, useMemo } from 'react'
import { Col, Row, Table, Button, DatePicker, Tag, Popover, Badge, Tabs } from '@douyinfe/semi-ui'
import { IconRefresh, IconChevronLeft, IconChevronRight } from '@douyinfe/semi-icons'
import { LIMIT_UP_COLOR } from '../../constants/constant'
import moment from 'moment'

export default function LimitUp() {
  const [value, setValue] = useState([])
  const [table, setTable] = useState([])
  const [index, setIndex] = useState('1')
  const [time, setTime] = useState(moment().format('yyyy-MM-DD'))
  useEffect(() => {
    refresh(moment().format('yyyy-MM-DD'))
  }, [])
  async function refresh(date) {
    date = !date ? time : date
    setTime(date)
    let data = await window.api.LimitUp({ type: 'day', date: date })
    console.log(data)
    data ? setValue(data) : setValue([])
    data ? setTable(data) : setTable([])
    setIndex('1')
  }

  const tabList = [
    { tab: '今日涨停', itemKey: '1' },
    { tab: '首板', itemKey: '2' },
    { tab: '二板', itemKey: '3' },
    { tab: '三板', itemKey: '4' },
    { tab: '更高板', itemKey: '5' }
  ]

  const columns = [
    {
      title: '名称',
      width: 120,
      fixed: true,
      dataIndex: 'name'
    },
    {
      title: '首次涨停时间',
      width: 200,
      dataIndex: 'first_limit_up'
    },
    {
      title: '最后一次涨停时间',
      width: 200,
      dataIndex: 'last_limit_up'
    },
    {
      title: '流通市值',
      width: 120,
      dataIndex: 'non_restricted_capital'
    },
    {
      title: '换手率',
      width: 120,
      dataIndex: 'turnover_ratio'
    },
    {
      title: '连板',
      width: 120,
      sorter: (a, b) => Number(a.limit_up_days) - Number(b.limit_up_days),
      dataIndex: 'limit_up_days'
    },
    {
      title: '涨停原因',
      width: 120,
      sorter: (a, b) =>
        new Intl.Collator('zh-Hans-CN', { sensitivity: 'accent' }).compare(
          a.related_plates_name,
          b.related_plates_name
        ),
      render: (text, record, index) => {
        const renderObject = {}
        let children = null
        if (record.related_plates_reason) {
          children = (
            <Popover
              showArrow
              margin={0}
              content={<article>{record.related_plates_reason}</article>}
              position="top"
              key={index}
            >
              <Badge dot>
                <Tag
                  color={LIMIT_UP_COLOR[record.limit_up_days]}
                  key={LIMIT_UP_COLOR[record.limit_up_days]}
                >
                  {record.related_plates_name}
                </Tag>
              </Badge>
            </Popover>
          )
        } else {
          children = (
            <Tag
              color={LIMIT_UP_COLOR[record.limit_up_days]}
              key={LIMIT_UP_COLOR[record.limit_up_days]}
            >
              {record.related_plates_name}
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
      dataIndex: 'stock_reason',
      ellipsis: true
    }
  ]
  return (
    <div style={{ padding: 4 }}>
      <Row>
        <Col span={3} style={{ padding: 1 }}>
          <DatePicker value={time} onChange={(date, dateString) => refresh(dateString)} />
        </Col>
        <Col offset={3}>
          <Button
            icon={<IconChevronLeft />}
            theme="solid"
            style={{ marginRight: 10 }}
            aria-label="前一天"
            onClick={() => {
              refresh(moment(time, 'YYYY-MM-DD').add(-1, 'days').format('yyyy-MM-DD'))
            }}
          />
          <Button
            icon={<IconChevronRight />}
            theme="solid"
            style={{ marginRight: 10 }}
            aria-label="后一天"
            onClick={() => {
              refresh(moment(time, 'YYYY-MM-DD').add(1, 'days').format('yyyy-MM-DD'))
            }}
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
        <Tabs
          type="card"
          activeKey={index}
          tabList={tabList}
          onChange={(key) => {
            setIndex(key)
            switch (key) {
              case '1':
                return setTable(value)
              case '2':
                return setTable(value.filter((o) => o.limit_up_days == 1))
              case '3':
                return setTable(value.filter((o) => o.limit_up_days == 2))
              case '4':
                return setTable(value.filter((o) => o.limit_up_days == 3))
              case '5':
                return setTable(value.filter((o) => o.limit_up_days > 3))
            }
          }}
        >
          <Table
            columns={columns}
            dataSource={table}
            pagination={false}
            scroll={() => useMemo(() => ({ y: '80vh' }), [])}
          />
        </Tabs>
      </Row>
    </div>
  )
}
