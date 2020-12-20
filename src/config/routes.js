const { makeRouteConfig } = require('../client/utils/ssrUtils/makeRouteConfig')
const { pageConfig: landingConfig } = require('../client/pages/landing/App')
const { pageConfig: exampleConfig } = require('../client/pages/example/App')
const { pageConfig: dashboardConfig } = require('../client/pages/dashboard/App')

/* ============ Routes ============ */
const routes = [
  {
    path: ['', '/', '/index', '/landing'],
    ...makeRouteConfig(landingConfig),
  },
  {
    path: '/greeting/:userName',
    ...makeRouteConfig(exampleConfig),
  },
  {
    path: '/dashboard',
    ...makeRouteConfig(dashboardConfig),
  },
]

module.exports = routes
