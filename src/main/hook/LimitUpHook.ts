import { XGB_ZT } from './external/RequestHook'
import { JSONPath } from 'jsonpath-plus'
import { Create, Retrieve, Update, Delete } from './external/SqliteHook'
export default function LimitUpHook(event, data) {
  console.log('接收到 LimitUp IPC 通信，消息为：', data)
  switch (data.type) {
    case 'day':
      return xgbZt(data.date)
  }
  return ''
}

async function xgbZt(date) {
  let datas = await XGB_ZT(date)
  return datas
}
