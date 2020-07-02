import renderWithCache from '../../utils/ssrUtils/renderWithCache'
import App from './App'


renderWithCache(App)

if (module.hot) {
	module.hot.accept()
}
