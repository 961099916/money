import { net } from 'electron'

export async function XGB_ZT(date) {
  let resp = await net.fetch(
    'https://flash-api.xuangubao.cn/api/pool/detail?pool_name=limit_up&date=' + date
  )
  let dataJson = await resp.json()
  return dataJson.data
}
