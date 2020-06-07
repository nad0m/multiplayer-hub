import React from 'react'

import HomeApp from '../client/pages/home/App'

export default [
  {
    method: 'get',
    path: '/greeting/:userName',
    htmlTagAttrs: { lang: 'en-GB' },
    appElement: ({ req }) => <HomeApp />,
    headElement: ({ req }) => <title>Home</title>,
  }
]