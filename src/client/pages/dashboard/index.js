import React from 'react'
import clientRender from 'universal-react-apollo/clientRender'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

clientRender(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

if (module.hot) {
  module.hot.accept()
}