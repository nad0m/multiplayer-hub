import React from 'react'
import path from 'path'

import paths from '../../server/serverConfig/paths'

const Scripts = ({ entryName }) => {
  const manifest = require(path.join(paths.build, 'manifest.json')) || {}
  return (
    <>
      <script defer src={manifest['runtime.js']} />
      <script defer src={manifest['vendor.js']} />
      <script defer src={manifest[`${entryName}.js`]} />
    </>
  )
}

export default Scripts