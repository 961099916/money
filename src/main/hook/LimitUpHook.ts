import { all } from './external/SqliteHook'
export default function LimitUpHook(event, data) {
  console.log('接收到 LimitUp IPC 通信，消息为：', data)
  switch (data.type) {
    case 'day':
      return all(
        'select * from zt where date = $date order by limit_up_days desc,related_plates_name desc',
        { $date: data.date }
      )
  }
  return ''
}
