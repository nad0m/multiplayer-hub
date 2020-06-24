import React from 'react'
import { REACT_ROOT } from '../../../config/constants'

const Document = ({ state, headContent, appContent, eobContent }) => (
	<html>
		<head dangerouslySetInnerHTML={{ __html: headContent }} />
		<body>
			<div id={REACT_ROOT} dangerouslySetInnerHTML={{ __html: appContent }} />
			{eobContent}
			<script dangerouslySetInnerHTML={{
				__html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
			}} />
		</body>
	</html>
)

export default Document
