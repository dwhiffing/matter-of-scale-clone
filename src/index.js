import "babel-core/polyfill"

import ReactDOM from "react-dom"
import React from "react"
import store from 'utils/reduxStore'

import ApplicationHandler from "views/ApplicationHandler"
import PropertiesView from "views/PropertiesView"
import PropertyView from "views/PropertyView"
import ResearchView from "views/ResearchView"

import { Router, Route } from 'react-router'
import { Provider } from 'react-redux'

import "index.css"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={ApplicationHandler}>
        <Route path="/properties" component={PropertiesView} />
        <Route path="/research/:property" component={ResearchView} />
        <Route path="/property/:instance" component={PropertyView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('react')
)
