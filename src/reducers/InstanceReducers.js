import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import InstanceFactory, {helpers} from 'factories/InstanceFactory'
import { add, sub, pushToObj, shallowUpdate, reducerCreator, clamp } from 'utils/helpers'
import u from 'updeep'

const initialState = {}

const InstanceReducers = {

  rehydrate(state, action) {
    if (action.key === 'instances') {
      return u.map((instance) => u(instance, helpers), action.payload)
    }
    return state
  },

  // generate some new instances and push them onto the state
  createInstance(state, action) {
    const {id, type, count} = action.payload
    const property = store.getState().properties[type]

    const newInstances = _.times(count, () => {
      const nth = Object.values(state).filter(obj => obj.type == property.id).length + 1
      const instance = Object.assign(helpers, InstanceFactory(id, property, nth))
      instance.goal.setInstance(instance)
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

    // mark an instance as complete and remove it from money/income computation
    // TODO: should remove completed instances so things dont get slow later on
    return shallowUpdate(instanceKey, {
      complete: true,
      autoComplete: -1,
      money: 0
    }, state)
  },

  buyBuilding(state, action) {
    const {instanceKey, cost} = action.payload

    // deduct cost of building when purchased
    return shallowUpdate(instanceKey, {
      money: sub(cost)
    }, state)
  },

  // this is done before DO_TICK so that autoBuy amounts are computed
  doAutobuy(state, action) {
    return u.map((instance) => {
      if (instance.complete) return instance

      let money = instance.money + instance.income()

      const autoBuy = instance.autoBuy.map((a, i) => {
        const maxPerTick = instance.buildings()[i].autoBuyIncrement()
        const autoBuyAmount = clamp(maxPerTick, money)
        money -= autoBuyAmount
        return autoBuyAmount
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
      const progress = instance.goal.progress()
      return u({
        progress: progress,
        autoComplete: c => progress < 100 ? c : c + 0.5
      }, instance)

    }, state)
  }

}

export default reducerCreator(InstanceReducers, initialState)
