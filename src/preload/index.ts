import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
// Custom APIs for renderer
const api = {
  LimitUp: (data) => ipcRenderer.invoke('limit-up', data),
  Analyse: (data) => ipcRenderer.invoke('analyse', data),
  LiDragonTotemmitUp: (data) => ipcRenderer.invoke('dragon-totem', data),
  EmotionalCycle: (data) => ipcRenderer.invoke('emotional-cycle', data),
  PlateRotation: (data) => ipcRenderer.invoke('plate-rotation', data),
  Settings: (data) => ipcRenderer.invoke('settings', data),
  TimeSharing: async (data) => await ipcRenderer.invoke('time-sharing', data),
  TimeLine: (data) => ipcRenderer.invoke('timeline', data),
  WinnerList: (data) => ipcRenderer.invoke('winners-list', data)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
