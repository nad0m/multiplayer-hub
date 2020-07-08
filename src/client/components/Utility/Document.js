import React from 'react'
import PropTypes from 'prop-types'

import { REACT_ROOT } from '../../../config/constants'

const Document = ({ state, headContent, appContent, eobContent }) => (
  <html>
    <head>{headContent}</head>
    <body>
      <div id={REACT_ROOT} dangerouslySetInnerHTML={{ __html: appContent }} />
      {eobContent}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
            /</g,
            '\\u003c'
          )};`,
        }}
      />
    </body>
  </html>
)

Document.propTypes = {
  state: PropTypes.object,
  headContent: PropTypes.element,
  appContent: PropTypes.element,
  eobContent: PropTypes.element,
}

export default Document
