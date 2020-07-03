import React from 'react'
import { StaticRouter } from 'react-router-dom'

import paths from '../../../config/paths'
import Head from '../../components/Utility/Head'
import Script from '../../components/Utility/Script'
import GlobalStyle from '../../components/Utility/GlobalStyle'


export const makeRouteConfig = config => {
	const {
		entry,
		title,
		description,
		app: AppComponent,
		head: HeadComponent,
		script: ScriptComponent
	} = config

	// resolving the relative js and css bundle paths
	const manifest = require(`${paths.build}/manifest.json`) || {}
	const bundlePath = manifest?.[`${entry}.js`]
	return {
		head: req => (
			<StaticRouter location={req.url}>
				<Head title={title} description={description} />
				{HeadComponent && <HeadComponent />}
			</StaticRouter>
		),
		app: req => (
			<StaticRouter location={req.url}>
				<GlobalStyle />
				<AppComponent />
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
