import React from 'react'

const Document = ({ state, headContent, appContent, eobContent }) => (
	<>
		<html>
			<head dangerouslySetInnerHTML={{ __html: headContent }}/>
			<body>
				<div id="root" dangerouslySetInnerHTML={{ __html: appContent }} />
				<div dangerouslySetInnerHTML={{ __html: eobContent }} />
				<script dangerouslySetInnerHTML={{
					__html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
				}} />
			</body>
		</html>
	</>
)

export default Document