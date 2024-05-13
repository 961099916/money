import { net } from 'electron'
import { all } from './external/SqliteHook'
export default function TimeSharingHook(event, data) {
  console.log('接收到 TimeLine IPC 通信，消息为：', data)

  switch (data.type) {
    case 'day':
      return day(data.date)
  }
}
async function day(date) {
  let stocks = await all(
    'select * from zt where date = $date order by related_plates_name desc,limit_up_days desc',
    { $date: date }
  )
  let datas = []
  for (let stock in stocks) {
    let code = stocks[stock].code
    let datajson = await net
      .fetch(
        'https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/d/' + date + '/' + code + '.json'
      )
      .then((res) => res.json())
    stocks[stock].dayTime = datajson
  }
  console.log(stocks)
  return stocks
}
