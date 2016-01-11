import superagent from 'superagent-bluebird-promise'
import { EventEmitter } from 'events'
import store from 'shared/redux/store'

// determine the API root for the current environment

export const ENV_ROOTS = {
  DEV: "https://api.cougarlife.com/api/v1",
  QA: "https://api01q4.cougarlife.com/api/v1",
  PROD: "https://api.cougarlife.com/api/v1",
  JUNTO: "https://cougarlife.com/api/1.0",
  JUNTO_REL: "/api/1.0",
}

export const TEST_ROOTS = {
  BRUNEL: "https://api.cougarlife.com/api/v1",
  JUNTO_API: "https://cougarlife.com/api/1.0",
  JUNTO: "https://cougarlife.com"
}

export const ENV_COOKIES = {
  DEV: '_bpi_session_id_development',
  QA: '_bpi_session_id_tor1qa4_cl',
  PROD: '_bpi_session_id'
}

export const CURRENT_ENV = (origin) => {
  origin = origin /* istanbul ignore next */ || window.location.origin
  if (/localhost/.test(origin)) return 'DEV'
  if (/qa/.test(origin)) return 'QA'
  return 'PROD'
}

export const API_ROOT = (origin) => {
  return ENV_ROOTS[CURRENT_ENV()]
}

export const API_COOKIE = (origin) => {
  return ENV_COOKIES[CURRENT_ENV()]
}

// RequestEmitter is an EventEmitter than emits superagent requests
class RequestEmitter extends EventEmitter {
  constructor(opts = {}) {
    super()
    this.junto_api = !!opts.junto_api
    this.junto = !!opts.junto
  }
}

// generate a request function for each HTTP method
// this is done to allow request.brunel.post(fn) rather than something like request.brunel.doRequest('post', fn)
['get', 'post', 'put', 'head', 'patch', 'delete'].forEach(method => {
  let name = 'delete' === method ? 'del' : method
  RequestEmitter.prototype[name] = function(url, fn) {
    let req = superagent(method.toUpperCase(), url)
    this.emit('request', req)
    return req
  }
})

// place any logic here to modify requests as they go out
export const middleware = function(request, token) {
  const useAbsolutePath = location.host === 'cougarlife.com' || location.host === ''

  // apply the API root if the request is relative
  if (request.url[0] === '/' && !this.junto) {
    /* istanbul ignore next: ensure path is absolute for tests */
    const prefix = useAbsolutePath ? ENV_ROOTS.JUNTO : ENV_ROOTS.JUNTO_REL

    request.url = (this.junto_api ? prefix : API_ROOT()) + request.url
  }

  if (this.junto && useAbsolutePath) {
    // TODO: this exists because nock requires absolute paths
    request.url = `${TEST_ROOTS.JUNTO}${request.url}`
  }

  // superagent will timeout after 60 seconds if a request isn't sent after being created
  // this flag sets a no-op callback so we can create requests and test without sending the
  /* istanbul ignore next: set callback to a no-op to prevent mocked requests from timing out */
  request._callback = () => {}

  token = token || store.getState().session.token
  // prepare the token to set a auth header for it
  if (token) {
    request.set('Authorization', `Bearer ${token}`)
    request.set('X-Requested-With', 'XMLHttpRequest')
  }

  const juntoCSRF = document.getElementsByName('csrf-token')[0]
  if (juntoCSRF) {
    request.set('X-CSRF-Token', juntoCSRF.content)
  }
}

// requests to brunel are prefixed with the current env's ROOT
const brunel = new RequestEmitter().on('request', middleware)

// requests to junto_api just append /api/1.0
const junto_api = new RequestEmitter({junto_api: true}).on('request', middleware)

// requests to junto don't append anything
const junto = new RequestEmitter({junto: true}).on('request', middleware)

export default {brunel, junto_api, junto}
