const { makeRouteConfig } = require('../client/utils/ssrUtils/routing')
const { pageConfig: landingConfig } = require('../client/pages/landing/App')
const { pageConfig: exampleConfig } = require('../client/pages/example/App')


/* ============ Routes ============ */
const routes = [
  {
    path: '/landing',
    ...makeRouteConfig(landingConfig)
  },
  {
    path: '/greeting/:userName',
    ...makeRouteConfig(exampleConfig)
  }
]

module.exports = routes
