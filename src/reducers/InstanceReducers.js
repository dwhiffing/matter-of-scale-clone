import store from 'utils/reduxStore'
import InstanceFactory, { rehydrate } from 'factories/InstanceFactory'
import { add, sub, pushToObj, shallowUpdate, reducerCreator, clamp, toObj } from 'utils/helpers'
import u from 'updeep'

const initialState = {}

const InstanceReducers = {

  rehydrate(state, action) {
    if (action.key === 'instances') {
      return u.map((instance) => rehydrate(instance), action.payload)
    }
    return state
  },

  // generate some new instances and push them onto the state
  createInstance(state, action) {
    const {id, type, count} = action.payload
    const property = store.getState().properties[type]

    const newInstances = _.times(count, () => {
      const nth = Object.values(state).filter(obj => obj.type == property.id).length + 1
      const instance = rehydrate(InstanceFactory(id, property, nth))
      return instance
    })

    return pushToObj(state, newInstances)
  },

  updateInstance(state, action) {
    const {instanceKey, update} = action.payload

    return shallowUpdate(instanceKey, update, state)
  },

  completeInstance(state, action) {
    const instanceKey = action.payload.id

    // omit the instace from the store
    const omittedState = Object.values(
      u.omit(instanceKey, state)
    ).reduce(toObj, {})

    // update the id to reflect the index so that buildings remain mapped properly
    return u.map((instance, index) => {
      return u({id: index}, instance)
    }, omittedState)
  },

  buyBuilding(state, action) {
    const {instanceKey, cost, count} = action.payload

    // deduct cost of building when purchased
    return shallowUpdate(instanceKey, {
      money: sub(cost * count)
    }, state)
  },

  // this is done before DO_TICK so that autoBuy amounts are computed
  doAutobuy(state, action) {
    return u.map((instance) => {
      if (instance.complete) return instance

      let money = instance.money + instance.income()

      const autoBuy = instance.buildings().map((building, i) => {
        const amount = clamp(building.autoBuyIncrement(), money)
        money -= amount
        return amount
      })

      return u({
        money: money,
        autoBuy: autoBuy
      }, instance)

    }, state)
  },

  doTick(state, action) {
    return u.map((instance) => {
      if (instance.complete) return instance

      // get next income and compute progress toward income goal
      const progress = instance.goalProgress()
      return u({
        progress: progress,
        autoComplete: c => progress < 100 ? c : c + 0.5
      }, instance)

    }, state)
  }

}

export default reducerCreator(InstanceReducers, initialState)
