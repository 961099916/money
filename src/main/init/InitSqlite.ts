import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('money.db', (err) => {
  if (err) {
    console.error('连接数据库失败:', err.message)
  } else {
    console.log('成功连接到数据库')
  }
})

export  function init() {

}
