import React from 'react'

import Landing from '../../client/pages/landing/App'
import ExamplePage from '../../client/pages/example/App' // example page
import Head from '../../client/components/Head'

export default [
  {
    path: '/',
    appElement: <Landing />,
    headElement: ({ req }) => (
      <>
        <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Landing</title>
      </>
    ),
    bodyBottomElement: ({ req }) => (<script src="/landing.js"></script>)
  },

  // ======= example route ========
  {
    path: '/greeting/:userName',
    appElement: <ExamplePage />,
    headElement: ({ req }) => <Head title="title" description="desc" req={req} entryName="example" />,
    bodyBottomElement: ({ req }) => (<script src="/example.js"></script>)
  }
]