import promiseMiddleware from 'shared/redux/promiseMiddleware'
import { applyMiddleware } from 'redux'
import { constantize } from 'shared/redux/helpers'
import { expect } from 'chai'
const middlewares = [ promiseMiddleware ]

/**
 * Returns an array of expected actions given some params
 */
export const mockActions = (type, payload, meta, hasRequest=true) => {
  const actions = []
  const baseAction = {
    type: constantize(type),
    payload: payload,
    meta: meta
  }

  if (hasRequest) {
    let request = Object.assign({},baseAction, {
      type: `${baseAction.type}_REQUEST`,
      payload: {}
    })
    delete request.meta
    actions.push(request)
  }

  actions.push(baseAction)

  return actions
}

/**
 * Creates a mock of Redux store with middleware.
 */
export default function mockStore(getState, expectedActions, done, log) {
  if (!Array.isArray(expectedActions)) {
    expectedActions = [expectedActions]
  }

  function mockStoreWithoutMiddleware() {
    const self = {
      getState() {
        return typeof getState === 'function' ? getState() : getState
      },

      dispatch(action) {
        if (action instanceof Function) {
          return action(self)
        }

        const expectedAction = expectedActions.shift()

        if (log) {
          console.log(action, expectedAction)
        }

        try {
          expect(action).to.deep.equal(expectedAction)
          if (done && !expectedActions.length) {
            done()
          }
          return action
        } catch (e) {
          done(e)
          throw e
        }
      }
    }

    return self
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware)

  return mockStoreWithMiddleware()
}
