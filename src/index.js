import "babel-core/polyfill"

import ReactDOM from "react-dom"
import React from "react"
import store from 'utils/reduxStore'

import ApplicationView from "views/ApplicationView"
import PropertyView from "views/PropertyView"
import InstanceView from "views/InstanceView"
import ResearchView from "views/ResearchView"

import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import "index.css"
import "bootstrap/css/bootstrap.css"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={ApplicationView}>
        <Route path="/property" component={PropertyView} />
        <Route path="/research/:property" component={ResearchView} />
        <Route path="/instance/:instance" component={InstanceView} />
        <IndexRoute component={PropertyView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('react')
)
