import "babel-core/polyfill"

import ReactDOM from "react-dom"
import React from "react"
import store from 'utils/reduxStore'

import ApplicationHandler from "views/ApplicationHandler"
import PropertyView from "views/PropertyView"
import InstanceView from "views/InstanceView"
import ResearchView from "views/ResearchView"

import { Router, Route } from 'react-router'
import { Provider } from 'react-redux'

import "index.css"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={ApplicationHandler}>
        <Route path="/property" component={PropertyView} />
        <Route path="/research/:property" component={ResearchView} />
        <Route path="/instance/:instance" component={InstanceView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('react')
)
