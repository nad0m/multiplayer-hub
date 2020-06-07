import React from 'react'

import Landing from '../../client/pages/landing/App'
import ExamplePage from '../../client/pages/example/App' // example page

export default [
  {
    path: '/',
    appElement: <Landing />,
    bodyBottomElement: ({ req }) => (<script src="/landing.js"></script>)
  },

  // ======= example route ========
  {
    path: '/greeting/:userName',
    appElement: <ExamplePage />,
    bodyBottomElement: ({ req }) => (<script src="/example.js"></script>)
  }
]