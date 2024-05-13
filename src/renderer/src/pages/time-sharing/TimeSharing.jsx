import * as echarts from 'echarts'
import React, { useState, useEffect, useMemo } from 'react'
import { Col, Row, Table, Button, DatePicker, Tag, Popover, Badge, Tabs } from '@douyinfe/semi-ui'
import { IconRefresh, IconChevronLeft, IconChevronRight } from '@douyinfe/semi-icons'
import moment from 'moment'
import './TimeSharing.css'
export default function TimeSharing() {
  const [value, setValue] = useState([])
  const [table, setTable] = useState([])
  const [time, setTime] = useState(moment().format('yyyy-MM-DD'))
  const [tabList, setTableList] = useState([{ tab: '全部', itemKey: null }])
  const [index, setIndex] = useState(null)
  useEffect(() => {
    refresh(moment().format('yyyy-MM-DD'))
  }, [])
  async function refresh(date) {
    setTime(date)
  }

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
        <Tabs type="card" activeKey={index} tabList={tabList} id="tabs"></Tabs>
      </Row>
    </div>
  )
}
