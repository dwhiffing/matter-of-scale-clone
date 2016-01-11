# Entry Point

Foster initializes with src/index.js.  

This file includes React, React Router, Redux and various Handlers

Once it imports the style entry point at src/index.scss, we define all the routes of the application with react router.  

The outermost Component is the Redux Provider, included with the react-redux bindings. We provide this component with our redux instance, and it subscribes all Smart Components to the store so they are re-rendered as the store updates.

Our routes are nested at two levels, The ApplicationHandler and everything else.  The ApplicationHandler provides the base layout and connects the currentProfile and interface data from the store. The nested components are each associated with a route of the application and usually connect to another part of the redux store.

# Dependencies

## react / react-dom

Used as the view layer in foster.  It provides the createClass function, which we use to define components to make up all user facing parts of the application.

## react-router

Used to define all the end points of the application. It is also used to manage the history state and manage transitions between the various endpoints

## redux

Used as the data layer in foster.  It defines a single store, which is a plain old javascript object where each key is a domain of the application ({currentProfile, viewedProfile, viewedPhotos.etc}).  We define reducers which are pure functions, matching this shape: (currentState, action) => newState.  This ensures that the state of our application is only mutated through actions, which makes following the flow of data much simpler.  You should read the guides in their entirity and take a look through the source for redux, as it is very small (5k minified)

## react-redux

In order to connect React components to this store, we use the react-redux library, which provides the Provider and Connect components.  Provider wraps the entire application and provides state to Components wrapped with Connect.  Connect will map the requested state and actions as defined in the passed functions and merge them into the component's props

// will provide the photos and viewedProfile keys from the reduxStore as this.props.photos and this.props.viewedProfile.  Will also provide PhotoActions and ViewedProfileActions as props.
const stateToConnect = mapState(['photos', 'viewedProfile'])
const actionsToConnect = mapActions([PhotoActions, ViewedProfileActions])
export const ShowHandler = React.createClass({/*...*/})
connect(stateToConnect, actionsToConnect)(ShowHandler)

**lodash:** utility library used all over the application.

**redux-actions:** provides some helper functions to enforce standards on redux reducers / actionCreators  

**bluebird:** used to provide promise functionality for superagent requests

**superagent:** used to make XHR requests to brunel and junto to fetch data.

**superagent-bluebird-promise:** used to wrap superagent requests with bluebird promises

**classnames:** used in components to simplify classname logic
