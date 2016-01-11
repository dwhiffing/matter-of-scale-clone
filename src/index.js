import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, IndexRoute } from 'react-router'
import history from 'shared/utils/History'
import { Provider } from 'react-redux'
import reduxStore from 'shared/redux/store'

import ApplicationHandler from 'shared/views/handlers/ApplicationHandler'

import ShowHandler from 'profiles/views/handlers/ShowHandler'
import EditHandler from 'profiles/views/handlers/EditHandler'
import ManagePhotosHandler from 'profiles/views/handlers/ManagePhotosHandler'
import CurrentPhotosModalHandler from 'profiles/views/handlers/CurrentPhotosModalHandler'
import ViewedPhotosModalHandler from 'profiles/views/handlers/ViewedPhotosModalHandler'

import DashboardHandler from 'search/views/handlers/DashboardHandler'
import BrowseHandler from 'search/views/handlers/BrowseHandler'
import SearchHandler from 'search/views/handlers/SearchHandler'
import FilterHandler from 'search/views/handlers/FilterHandler'

import MoreHandler from 'shared/views/handlers/MoreHandler'

import './index.scss'
import 'shared/utils/Polyfills'

let elements = (
  <Provider key="provider" store={reduxStore}>
    <Router history={history}>
      <Route path="/" component={ApplicationHandler}>

        <Route path='/profiles/edit' component={EditHandler} />
        <Route path='/profiles/edit/photos' component={ManagePhotosHandler} />
        <Route path='/profiles/:profile_id' component={ShowHandler} />
        <Route path='/profiles/edit/photos/:photo_id' component={CurrentPhotosModalHandler} />
        <Route path='/profiles/:profile_id/photos/:photo_id' component={ViewedPhotosModalHandler} />

        <Route path='/home' component={DashboardHandler} />
        <Route path='/browse' component={BrowseHandler} />
        <Route path='/search' component={SearchHandler} />
        <Route path='/:view/filter' component={FilterHandler} />
        <Route path='/:view/filter/:type' component={FilterHandler} />

        <Route path='/more' component={MoreHandler} />

        <IndexRoute component={DashboardHandler} />

      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(elements, document.getElementById('react'))
