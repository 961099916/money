import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Index from './pages/Index'
import LimitUp from './pages/limit-up/LimitUp'
import Emotional from './pages/emotional-cycle/Emotional'
import PlateRotation from './pages/plate-rotation/PlateRotation'
import WinnersList from './pages/winners-list/WinnersList'
import DragonTotem from './pages/dragon-totem/DragonTotem'
import TimeSharing from './pages/time-sharing/TimeSharing'
import Settings from './pages/settings/Settings'
export default createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: '/limit-up',
        element: <LimitUp />
      },
      {
        path: '/',
        element: <LimitUp />
      },
      {
        path: '/emotional',
        element: <Emotional />
      },
      {
        path: '/plate-rotation',
        element: <PlateRotation />
      },
      {
        path: '/dragon-totem',
        element: <DragonTotem />
      },
      {
        path: '/winners-list',
        element: <WinnersList />
      },
      {
        path: '/time-sharing',
        element: <TimeSharing />
      },
      {
        path: '/settings',
        element: <Settings />
      }
    ]
  }
])
