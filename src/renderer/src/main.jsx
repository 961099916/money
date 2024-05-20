import React from 'react'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={App} />
  </React.StrictMode>
)
