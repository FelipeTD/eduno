import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry, YellowBox } from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'

import storeConfig from './src/store/storeConfig'

import axios from 'axios'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

axios.defaults.baseURL = 'https://lambe-7c9c2.firebaseio.com/'

const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux)
