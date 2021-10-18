import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import App from './App'
import reducers from './reducers'

import * as serviceWorker from './serviceWorker'

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()