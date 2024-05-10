import { ElectronAPI } from '@electron-toolkit/preload'
const api = {
  
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: api
  }
}
