import { useEffect, useState } from 'react'
import * as echarts from 'echarts'
import { Button } from '@douyinfe/semi-ui'
export default function TimeSharing() {
  const eles = useState([1, 2, 4, 5, 6])
  return (
    <div style={{ textAlign: 'center', overflow: 'hidden' }}>
      {eles[0].map((ele) => (
        <div style={{ height: '500px' }}>主要按钮</div>
      ))}
    </div>
  )
}
