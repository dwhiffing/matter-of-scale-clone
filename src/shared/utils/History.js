import createBrowserHistory from 'history/lib/createHashHistory'
let history = createBrowserHistory()

/* istanbul ignore next */
// slash prefix for foster routes, no slash for junto bound routes
export const changeRoute = function(link, state=null) {
  if (!link) return
  if (link[0] !== '/') {
    window.location = `/${link}`
  } else {
    history.pushState(state, link)
  }
}
/* istanbul ignore next */
export const replaceRoute = function(link, state=null) {
  if (!link) return
  if (link[0] !== '/') {
    window.location = `/${link}`
  } else {
    history.replaceState(state, link)
  }
}


export default history
