import React from 'react'
import App from './App'
import renderWithCache from '../../utils/ssrUtils/renderWithCache'


renderWithCache(App)

if (module.hot) {
  module.hot.accept()
}
