import store from 'utils/reduxStore'
import InstanceFactory, { rehydrate } from 'factories/InstanceFactory'
import { sub, pushToObj, shallowUpdate, clamp, toObj } from 'utils/helpers'
import u from 'updeep'
import _ from 'lodash'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {

    case 'persist/REHYDRATE':
      return payload.instances ?
        u.map(i => rehydrate(i), payload.instances) :
        state

    case 'UPDATE_INSTANCE':
      return shallowUpdate(payload.instanceKey, payload.update, state)

    case 'DO_BUILDING_PURCHASE':
      return shallowUpdate(payload.instanceKey, {
        money: sub(payload.cost * payload.count),
      }, state)

    case 'DO_CREATE_INSTANCE': {
      const { id, type, nth, count } = action.payload
      const property = store.getState().properties[type]

      const newInstances = _.times(count, () => {
        const instance = rehydrate(InstanceFactory(id, property, nth))
        return instance
      })

      return pushToObj(state, newInstances)
    }

    case 'DO_COMPLETE_INSTANCE': {
      const instanceKey = payload.instanceKey
      // omit the instace from the store
      const omittedState = Object.values(
        u.omit(instanceKey, state)
      ).reduce(toObj, {})

      // update the id to reflect the index so that buildings remain mapped properly
      return u.map((instance, index) => {
        return u({ id: index }, instance)
      }, omittedState)
    }

    case 'DO_TICK': {
      const newState = u.map((instance) => {
        let money = instance.money + instance.income()

        const autoBuy = instance.buildings().map(building => {
          const maxAutoBuy = clamp(building.autoBuyIncrement(), money)
          const amount = instance.disableAutoBuy ? 0 : maxAutoBuy
          money -= amount
          return amount
        })

        return u({
          money: money,
          autoBuy: autoBuy,
        }, instance)

      }, state)

      return u.map((instance) => {
        return u({
          progress: instance.goalProgress(),
          autoComplete: c => instance.goalProgress() < 100 ? c : c + 0.5,
        }, instance)
      }, newState)
    }

    default:
      return state
  }
}
