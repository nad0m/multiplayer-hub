import React from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { StaticRouter } from 'react-router-dom'

import Head from '../../client/components/Head'
import Scripts from '../../client/components/Scripts'
import { appConfig as landingAppConfig } from '../../client/pages/landing/App'

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
              <Scripts entryName={entryName} />
            </>
          )}
        />
      </StaticRouter>
    ),
    bodyBottomElement: ({ req }) => {
      return null
    }
  }
}

/* ============ Routes ============ */
const routes = [
  {
    method: 'get',
    path: '/landing',
    ...appElements(landingAppConfig)
  }
]

export default routes