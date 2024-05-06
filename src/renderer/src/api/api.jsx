import  http from './http'
import { XGB_URL } from './httpConstant'

const Xgb = {
  jrzt: (date) => http('get', XGB_URL, { pool_name: 'limit_up', date: date })
}

export default {
  Xgb
}
