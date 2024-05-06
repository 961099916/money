import { ElectronAPI } from '@electron-toolkit/preload'
const api = {
  store: {
    get(storeKey) {
      return ipcRenderer.sendSync('electron-store-get', storeKey)
    },
    set(storeKey, storeValue) {
      ipcRenderer.send('electron-store-set', storeKey, storeValue)
    }
    // Other method you want to add like has(), reset(), etc.
  }
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: api
  }
}
