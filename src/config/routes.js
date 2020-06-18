const { makeSsrRoutingConfig } = require('../client/utils/ssrUtils')
const { config: LandingConfig } = require('../client/pages/landing/App')
const { config: ExamplePageConfig } = require('../client/pages/example/App')


const routes = [
  {
    path: '/',
    ...makeSsrRoutingConfig(LandingConfig)
  },

  // ======= example route ========
  {
    path: '/greeting/:userName',
    ...makeSsrRoutingConfig(ExamplePageConfig)
  }
]

module.exports = routes
