import ReactDOM from 'react-dom'
import {HelmetProvider} from 'react-helmet-async'
// Redux
// https://github.com/rt2zz/redux-persist
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import * as _redux from './setup'
import store, {persistor} from './setup/redux/Store'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import GlobalErrComponent from './cms/layout/core/GlobalErrComponent'

// Apps
import {App} from './app/App'
import {MetronicI18nProvider} from './cms/i18n/Metronici18n'
/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import './_metronic/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './cms/assets/sass/style.react.scss'
import 'rsuite/dist/rsuite.min.css'
import './cms/assets/sass/style.scss'
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = window.__RUNTIME_CONFIG__
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */

/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
_redux.setupAxios(axios, store)

Chart.register(...registerables)

ReactDOM.render(
  <MetronicI18nProvider>
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      {/* */}
      <GlobalErrComponent />
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <HelmetProvider>
          <App basename={PUBLIC_URL} />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </MetronicI18nProvider>,
  document.getElementById('root')
)
