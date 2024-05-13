import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('money.db', (err) => {
  if (err) {
    console.error('连接数据库失败:', err.message)
  } else {
    console.log('成功连接到数据库')
  }
})
export function run(sql: string, params: any) {
  console.log('run', sql, params)
  return new Promise(async (resolve) => {
    db.run(sql, params, (err) => {
      resolve(err)
    })
  })
}
export function all(sql: string, params: any) {
  console.log('run', sql, params)
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error)
      } else {
        resolve(rows)
      }
    })
  })
}
export function get(sql: string, params: any) {
  console.log('run', sql, params)
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, row) => {
      if (error) {
        reject(error)
      } else {
        resolve(row)
      }
    })
  })
}
