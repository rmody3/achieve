import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import createStore from '../create_store';
import App from '../components/app'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    
    <Provider store={createStore()}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})