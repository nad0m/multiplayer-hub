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
	const stylePath = manifest?.[`${entry}.css`]
	const styleSheet = new ServerStyleSheet()
	return {
		head: req => (
			<StaticRouter location={req.url}>
				<Head title={title} description={description} stylePath={stylePath} />
				{styleSheet.getStyleElement()}
				{HeadComponent && <HeadComponent />}
			</StaticRouter>
		),
		app: req => (
			<StaticRouter location={req.url}>
				<StyleSheetManager sheet={styleSheet.instance}>
					<AppComponent />
				</StyleSheetManager>
			</StaticRouter>
		),
		eob: req => {
			return (
				<>
					{bundlePath && <Script defer src={bundlePath} />}
					{ScriptComponent && <ScriptComponent />}
				</>
			)
		}
	}
}

export default makeRouteConfig
