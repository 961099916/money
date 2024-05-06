import React, { useState, useEffect, useMemo } from 'react'
import { Col, Row, Table, Button, DatePicker } from '@douyinfe/semi-ui'
import { IconRefresh } from '@douyinfe/semi-icons'
import axios from 'axios'
import moment from 'moment'
import api from '../api/api'
export default function Zt() {
  const [value, setValue] = useState([])
  const [time, setTime] = useState()
  useEffect(() => {
    const now = moment().format('yyyy-MM-DD')
    setTime(now)
    refresh()
  }, [])
  function onChangeTime(date, dateString) {
    setTime(dateString)
  }
  function refresh() {
      api.Xgb.jrzt(time).then((res) => {
        if (res.data) {
          setValue(res.data)
        }
      })
  }
  const columns = [
    {
      title: '代码',
      width: 120,
      dataIndex: 'symbol'
    },
    {
      title: '名称',
      width: 120,
      dataIndex: 'stock_chi_name'
    },
    {
      title: '原因',
      width: 120,
      dataIndex: 'surge_reason.stock_reason',
      ellipsis: true
    }
  ]
    const scroll = useMemo(() => ({ y: '80vh', x: '70vw' }), [])
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
          <DatePicker defaultValue={new Date()} onChange={onChangeTime} />
        </Col>
        <Col offset={4}>
          <Button
            icon={<IconRefresh />}
            theme="solid"
            style={{ marginRight: 10 }}
            aria-label="刷新"
            onClick={refresh}
          />
        </Col>
      </Row>
      <Row>
        <Table
          columns={columns}
          dataSource={value}
          pagination={false}
          onRow={handleRow}
           scroll={scroll}
        />
      </Row>
    </div>
  )
}
