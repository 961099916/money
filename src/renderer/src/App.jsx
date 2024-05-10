import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Index } from './pages'
import './App.css'
import Zt from './pages/Zt'
import Qxzqb from './pages/Qxzqb'
import Bk from './pages/Bk'
import Lhb from './pages/Lhb'
import Ltt from './pages/Ltt'
import Fenshi from './pages/Fenshi'
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
      },
      {
        path: '/fenshi',
        element: <Fenshi />
      }
    ]
  }
])
