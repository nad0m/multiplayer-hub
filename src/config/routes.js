const { makeRouteConfig } = require('../client/utils/ssrUtils/routing')
const { pageConfig: landingConfig } = require('../client/pages/landing/App')
const { pageConfig: exampleConfig } = require('../client/pages/example/App')
const { pageConfig: dashboardConfig } = require('../client/pages/dashboard/App')


/* ============ Routes ============ */
const routes = [
  {
    method: 'get',
    path: '/landing',
    ...makeRouteConfig(landingConfig)
  },
  {
    method: 'get',
    path: '/greeting/:userName',
    ...makeRouteConfig(exampleConfig)
  },
  {
    method: 'get',
    path: '/dashboard',
    ...makeRouteConfig(dashboardConfig)
  }
]

module.exports = routes
