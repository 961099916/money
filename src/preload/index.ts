import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
// Custom APIs for renderer
const api = {
  LimitUp: (data) => ipcRenderer.invoke('limit-up', data),
  AnalyseHook: (data) => ipcRenderer.invoke('analyse', data),
  LiDragonTotemHookmitUp: (data) => ipcRenderer.invoke('dragon-totem', data),
  EmotionalCycleHook: (data) => ipcRenderer.invoke('emotional-cycle', data),
  PlateRotationHook: (data) => ipcRenderer.invoke('plate-rotation', data),
  SettingsHook: (data) => ipcRenderer.invoke('settings', data),
  TimeSharingHook: (data) => ipcRenderer.invoke('time-sharing', data),
  TimeLineHook: (data) => ipcRenderer.invoke('timeline', data),
  WinnerListHook: (data) => ipcRenderer.invoke('winners-list', data)
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
