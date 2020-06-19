import React from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { StaticRouter } from 'react-router-dom'

import Head from '../client/components/Utility/Head'
import Scripts from '../client/components/Utility/Scripts'
import { appConfig as landingAppConfig } from '../client/pages/landing/App'
import { appConfig as exampleAppConfig } from '../client/pages/example/App'

const appElements = ({
  appComponent,
  title,
  description,
  entryName,
  metas,
  renderCustomHeadBody = () => null
}) => {
  const sheet = new ServerStyleSheet()

  return {
    appElement: ({ req }) => (
      <StaticRouter location={req.url} context={{}}>
        <StyleSheetManager sheet={sheet.instance}>{appComponent}</StyleSheetManager>
      </StaticRouter>
    ),
    headElement: ({ req }) => (
      <StaticRouter location={req.url} context={{}}>
        <Head
          title={title}
          description={description}
          entryName={entryName}
          metas={metas}
          renderBody={request => (
            <>
              {sheet.getStyleElement()}
              {typeof renderCustomHeadBody === 'function' && renderCustomHeadBody(request)}
            </>
          )}
        />
      </StaticRouter>
    ),
    bodyBottomElement: ({ req }) => <Scripts entryName={entryName} />
  }
}

/* ============ Routes ============ */
const routes = [
  {
    method: 'get',
    path: '/landing',
    ...appElements(landingAppConfig)
  },
  {
    method: 'get',
    path: '/greeting/:userName',
    ...appElements(exampleAppConfig)
  }
]

module.exports = routes