import store from 'utils/reduxStore'
import PropertyFactory, { rehydrate } from 'factories/PropertyFactory'
import { add, sub, toObj, shallowUpdate, reducerCreator } from 'utils/helpers'
import u from 'updeep'

const initialState = u.map((property) => rehydrate(property), PropertyFactory().reduce(toObj, {}))

const PropertyReducers = {

  rehydrate(state, action) {
    if (action.key === 'properties') {
      return u.map((property) => rehydrate(property), action.payload)
    }
    return state
  },

  updateProperty(state, action) {
    const {propertyKey, update} = action.payload

    return shallowUpdate(propertyKey, update, state)
  },

  createInstance(state, action) {
    const { id, type } = action.payload
    const property = state[type]
    // deduct build queue if instance was created by completing an instance
    if (property.toBuild > 0 && property.id !== 0) {
      return shallowUpdate(property.id, {
        toBuild: sub(1)
      }, state)
    } else {
      return state
    }
  },

  completeInstance(state, action) {
    const {id, type} = action.payload
    const property = state[type]

    // update research currency and next instance tick
    let update = {
      [type]: {
        toCompleteUntilNextInstance: sub(1),
        researchMoney: add(1),
        completed: add(1)
      }
    }

    // if next is complete, reset it and queue an instance of the next level
    if (property.toCompleteUntilNextInstance <= 1) {
      update = {
        [type]:  {
          toCompleteUntilNextInstance: property.research('incrementCost'),
          researchMoney: add(1),
          completed: add(1)
        },
        [type + 1]:  {
          unlocked: true,
          toBuild: add(1)
        }
      }
    }

    return u(update, state)
  }
}

export default reducerCreator(PropertyReducers, initialState)
