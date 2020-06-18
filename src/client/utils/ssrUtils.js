import React from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export const makeSsrRoutingConfig = config => {
  const {
    AppComponent,
    HeadComponent,
    BottomComponent,
  } = config
  const styleSheet = new ServerStyleSheet()
  return {
    appElement: props => (
      <StyleSheetManager sheet={styleSheet.instance}><AppComponent {...props} /></StyleSheetManager>
    ),
    headElement: props => (
      <head>
        {styleSheet.getStyleElement()}
        <HeadComponent {...props} />
      </head>
    ),
    bodyBottomElement: props => (
      <><BottomComponent {...props} /></>
    )
  }
}