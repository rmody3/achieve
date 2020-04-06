import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import createStore from '../create_store';
import App from '../components/app'

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('bootstrap')
  const bootstrapData = JSON.parse(node.getAttribute('data-props'))
  const store = createStore()

  const obj = document.createElement('div')
  obj.setAttribute("style", "display: flex; height: 100%;")

  ReactDOM.render(
    <Provider store={store}>
      <App data={
        {
          loggedIn: bootstrapData.bootstrap.logged_in,
          user: bootstrapData.bootstrap.user,
          userType: bootstrapData.bootstrap.user_type
        }
      }/>
    </Provider>,
    document.body.appendChild(obj),
  )
})