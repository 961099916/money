import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Index } from './pages'
import './App.css'
import LimitUp from './pages/limit-up/LimitUp'
import Emotional from './pages/emotional-cycle/Emotional'
import PlateRotation from './pages/plate-rotation/PlateRotation'
import WinnersList from './pages/winners-list/WinnersList'
import DragonTotem from './pages/dragon-totem/DragonTotem'
import TimeSharing from './pages/time-sharing/TimeSharing'
export default createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: '/zt',
        element: <LimitUp />
      },
      {
        path: '/',
        element: <LimitUp />
      },
      {
        path: '/qxzqb',
        element: <Emotional />
      },
      {
        path: '/bk',
        element: <PlateRotation />
      },
      {
        path: '/ltt',
        element: <DragonTotem />
      },
      {
        path: '/lhb',
        element: <WinnersList />
      },
      {
        path: '/fenshi',
        element: <TimeSharing />
      }
    ]
  }
])
