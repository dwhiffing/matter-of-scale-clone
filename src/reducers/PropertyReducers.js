import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import PropertyFactory from 'factories/PropertyFactory'
import { add, sub, toObj, shallowUpdate, reducerCreator } from 'utils/helpers'
import u from 'updeep'

const initialState = PropertyFactory().reduce(toObj, {})

const PropertyReducers = {

  updateProperty(state, action) {
    const {propertyKey, update} = action.payload

    return shallowUpdate(propertyKey, update, state)
  },

  createInstance(state, action) {
    const property = state[action.payload.type]

    if (property.toBuild > 0 && property.id !== 0) {
      return shallowUpdate(property.id, {toBuild: sub(1)}, state)
    } else {
      return state
    }
  },

  completeInstance(state, action) {
    const {id, type} = action.payload

    let update = {
      [type]: {
        toCompleteUntilNextInstance: sub(1),
        researchMoney: add(1)
      }
    }

    // add research currency and update next property unlock
    if (state[type].toCompleteUntilNextInstance <= 1) {
      update = {
        [type]:  {
          toCompleteUntilNextInstance: add(type + 2),
          researchMoney: add(1)
        },
        [type + 1]:  {
          unlocked: true,
          toBuild: add(1)
        }
      }
    }

    return u(update, state)
  },

  doTick(state, action) {
    return u.map((property) => {
      const rate = property.upgradeRate
      const instanceCount = property.instances().length
      const amount = (rate + rate * property.research("upgradeRate")) * instanceCount

      return u({
        upgrades: add(amount)
      }, property)
    }, state)
  }
}

export default reducerCreator(PropertyReducers, initialState)
