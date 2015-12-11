import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import InstanceFactory from 'factories/InstanceFactory'
import { add, sub, toObj, shallowUpdate, reducerCreator } from 'utils/helpers'
import u from 'updeep'

const initialState = {}

const InstanceReducers = {

  createInstance(state, action) {
    const {type, count} = action.payload
    const property = store.getState().properties[action.payload.type]

    const newInstances = _.times(count, () => {
      return InstanceFactory(property, state)
    })

    const concatWithState = [
      Object.values(state),
      ...newInstances
    ].reduce((a, b) => a.concat(b))

    const update = concatWithState.reduce(toObj, {})

    return Object.assign({}, update, state)
  },

  updateInstance(state, action) {
    const {instanceKey, update} = action.payload

    return shallowUpdate(instanceKey, update, state)
  },

  completeInstance(state, action) {
    const instanceKey = action.payload.id

    return shallowUpdate(instanceKey, {
      complete: true,
      autoComplete: -1,
      money: 0
    }, state)
  },

  buyBuilding(state, action) {
    const {instanceKey, cost} = action.payload

    return shallowUpdate(instanceKey, {
      money: sub(cost)
    }, state)
  },

  doTick(state, action) {
    // autobuy needs to subtract from income
    return u.map((instance) => {
      if (instance.complete) return instance
      const income = instance.income()

      const progress = income / instance.goal * 100

      // compute money from instance and update progress to goal
      let update = {
        progress: progress,
        money: add(income)
      }

      // if instance is complete, also add to autocompletion
      if (progress >= 100) {
        update = Object.assign({
          autoComplete: add(.5)
        }, update)
      }

      return u(update, instance)
    }, state)
  }

}

export default reducerCreator(InstanceReducers, initialState)
