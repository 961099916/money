import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Index } from './components'
import './App.css'
import Zt from './components/Zt'
import Qxzqb from './components/Qxzqb'
import Bk from './components/Bk'
import Lhb from './components/Lhb'
import Ltt from './components/Ltt'
export default createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: '/zt',
        element: <Zt />
      },
      {
        path: '/',
        element: <Zt />
      },
      {
        path: '/qxzqb',
        element: <Qxzqb />
      },
      {
        path: '/bk',
        element: <Bk />
      },
      {
        path: '/ltt',
        element: <Ltt />
      },
      {
        path: '/lhb',
        element: <Lhb />
      }
    ]
  }
])
