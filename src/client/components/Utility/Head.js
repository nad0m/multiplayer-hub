import React from 'react'

const Head = ({ title, description, metas = [], req = {}, renderBody, entryName = '' }) => {
  let manifest = {}
  try {
    manifest = require(path.join(paths.build, 'manifest.json'))
  } catch (e) { }
  
  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {Array.isArray(metas) && metas.map((meta, i) => <meta {...meta} key={`meta${i}`} />)}
      <meta httpEquiv="X-UA-Compatible" content="chrome=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta property="og:type" content="website" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet"></link>
      {typeof renderBody === 'function' && renderBody(req)}
    </>
  )
}

export default Head
