import sqlite3 from 'sqlite3'
import schedule from 'node-schedule'
import { XGB_ZT } from '../hook/external/RequestHook'
import moment from 'moment'
const db = new sqlite3.Database('money.db', (err) => {
  if (err) {
    console.error('连接数据库失败:', err.message)
  } else {
    console.log('成功连接到数据库')
  }
})

export function init() {
  initZt()
}
function initZt() {
  var now = moment()
  const begin = moment('2024-05-01', 'YYYY-MM-DD')
  while (now > begin) {
    saveZt(now.format('YYYY-MM-DD'))
    now = now.subtract(1, 'day')
  }
}
function saveZt(date) {
  db.all('select * from zt where date = $date', { $date: date }, (error, rows) => {
    if (error) {
    } else {
      if (rows.length == 0) {
        XGB_ZT(date).then((datas) => {
          if (datas) {
            for (let data in datas) {
              let code = datas[data].symbol
              let row = {}
              row.code = code.split('.')[0]
              row.first_limit_up = moment
                .unix(datas[data].first_limit_up)
                .format('yyyy-MM-DD HH:mm:ss')
              row.last_limit_up = moment
                .unix(datas[data].last_limit_up)
                .format('yyyy-MM-DD HH:mm:ss')
              row.non_restricted_capital =
                Math.round(datas[data].non_restricted_capital / 1000000) / 100 + '亿'
              row.turnover_ratio = Math.round(datas[data].turnover_ratio * 10000) / 100 + '%'
              row.related_plates_reason = datas[data].surge_reason.related_plates[0].plate_reason
              row.related_plates_name = datas[data].surge_reason.related_plates[0].plate_name
              row.stock_reason = datas[data].surge_reason.stock_reason
              row.name = datas[data].stock_chi_name
              row.prev_close_price = datas[data].prev_close_price
              row.type = code.split('.')[1]
              row.price = datas[data].price
              row.date = date
              row.limit_up_days = datas[data].limit_up_days
              for (let key in row) {
                row['$' + key] = row[key]
                delete row[key]
              }
              db.run(
                'INSERT INTO "zt" ( "id", "code", "name",  "turnover_ratio", "non_restricted_capital", "last_limit_up", "first_limit_up", "stock_reason", "type", "price", "prev_close_price", "related_plates_name", "date", "related_plates_reason" ,"limit_up_days")VALUES($id,$code,$name,$turnover_ratio,$non_restricted_capital,$last_limit_up,$first_limit_up,$stock_reason,$type,$price,$prev_close_price,$related_plates_name,$date,$related_plates_reason,$limit_up_days )',
                row
              )
            }
          }
        })
      }
    }
  })
}
async function initJob() {
  schedule.scheduleJob('*/5 * * * * *', function () {
    db.run('select * from zt where date = 2024-05-12', (error, rows) => {
      if (error) {
      } else {
        if (!rows) {
          XGB_ZT('2024-05-09').then((datas) => {
            for (let data in datas) {
              let code = datas[data].symbol
              let row = {}
              row.code = code.split('.')[0]
              row.first_limit_up = moment
                .unix(datas[data].first_limit_up)
                .format('yyyy-MM-DD HH:mm:ss')
              row.last_limit_up = moment
                .unix(datas[data].last_limit_up)
                .format('yyyy-MM-DD HH:mm:ss')
              row.non_restricted_capital =
                Math.round(datas[data].non_restricted_capital / 1000000) / 100 + '亿'
              row.turnover_ratio = Math.round(datas[data].turnover_ratio * 10000) / 100 + '%'
              row.related_plates_reason = datas[data].surge_reason.related_plates[0].plate_reason
              row.related_plates_name = datas[data].surge_reason.related_plates[0].plate_name
              row.stock_reason = datas[data].surge_reason.stock_reason
              row.name = datas[data].stock_chi_name
              row.prev_close_price = datas[data].prev_close_price
              row.type = 1
              row.price = datas[data].price
              row.date = '2024-05-10'
              row.limit_up_days = datas[data].limit_up_days
              for (let key in row) {
                row['$' + key] = row[key]
                delete row[key]
              }
              db.run(
                'INSERT INTO "zt" ( "id", "code", "name",  "turnover_ratio", "non_restricted_capital", "last_limit_up", "first_limit_up", "stock_reason", "type", "price", "prev_close_price", "related_plates_name", "date", "related_plates_reason" ,"limit_up_days")VALUES($id,$code,$name,$turnover_ratio,$non_restricted_capital,$last_limit_up,$first_limit_up,$stock_reason,$type,$price,$prev_close_price,$related_plates_name,$date,$related_plates_reason,$limit_up_days )',
                row,
                (error, row) => {
                  console.log(error)
                }
              )
            }
          })
        }
      }
    })
  })
}
