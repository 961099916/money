import { net } from 'electron'
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('money.db', (err) => {
  if (err) {
    console.error('连接数据库失败:', err.message)
  } else {
    console.log('成功连接到数据库')
  }
})
export async function Create(sql, key) {
  return await db.run(sql, key)
}
export function Retrieve() {}
export function Update() {}
export function Delete() {}

export async function Init() {
  await db.run(
    'CREATE TABLE IF NOT EXISTS mytable (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)'
  )
  await db.run('INSERT INTO mytable (name, age) VALUES (?, ?)', ['Alice', 25], (err) => {
    if (err) {
      console.error('插入数据失败:', err.message)
    } else {
      console.log('插入数据成功')
    }
  })
  await db.all('SELECT * FROM mytable', (err, rows) => {
    if (err) {
      console.error('查询数据失败:', err.message)
    } else {
      console.log('查询结果:')
      rows.forEach((row) => {
        console.log(row.id, row.name, row.age)
      })
    }
  })
  await db.run('DELETE FROM mytable', [], (err) => {
    if (err) {
      console.error('删除数据失败:', err.message)
    } else {
      console.log('删除数据成功')
    }
  })
}
