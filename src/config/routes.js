const { config: LandingConfig } = require('../client/pages/landing/App')
const { config: ExamplePageConfig } = require('../client/pages/example/App')


const routes = [
  {
    path: '/',
    ...LandingConfig
  },

  // ======= example route ========
  {
    path: '/greeting/:userName',
    ...ExamplePageConfig
  }
]

module.exports = routes
