import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import paths from '../../../config/paths'
import Head from '../../components/Utility/Head'
import Script from '../../components/Utility/Script'


export const makeRouteConfig = config => {
  const {
    entry,
    title,
    description,
    app: AppComponent,
    head: HeadComponent,
    script: ScriptComponent
  } = config

  // resolving the relative js bundle path
  const manifest = require(`${paths.build}/manifest.json`) || {}
  const bundlePath = manifest?.[`${entry}.js`]

  const styleSheet = new ServerStyleSheet()
  return {
    appElement: req => (
      <StaticRouter location={req.url}>
        <StyleSheetManager sheet={styleSheet.instance}>
          <AppComponent />
        </StyleSheetManager>
      </StaticRouter>
    ),
    headElement: req => (
      <StaticRouter location={req.url}>
        <Head title={title} description={description}>
          {styleSheet.getStyleElement()}
          {HeadComponent && <HeadComponent />}
        </Head>
      </StaticRouter>
    ),
    bodyBottomElement: req => {
      return (
        <>
          {bundlePath && <Script defer src={bundlePath} />}
          {ScriptComponent && <ScriptComponent />}
        </>
      )
    }
  }
}
