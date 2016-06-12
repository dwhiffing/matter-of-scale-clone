import PropertyFactory, { rehydrate } from 'factories/PropertyFactory'
import { add, sub, toObj, shallowUpdate } from 'utils/helpers'
import u from 'updeep'

const initialState = u.map((property) => rehydrate(property), PropertyFactory().reduce(toObj, {}))

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {

    case 'persist/REHYDRATE':
      return payload.properties ?
        u.map(p => rehydrate(p), payload.properties) :
        state

    case 'UPDATE_PROPERTY':
      return shallowUpdate(payload.propertyKey, payload.update, state)

    case 'DO_CREATE_INSTANCE': {
      const property = state[payload.type]
      // deduct build queue if instance was created by completing an instance
      if (property.toBuild > 0 && property.id !== 0) {
        return shallowUpdate(property.id, {
          toBuild: sub(1),
        }, state)
      }
      return state
    }

    case 'DO_COMPLETE_INSTANCE': {
      const propertyKey = payload.propertyKey
      const property = state[propertyKey]

      // update research currency and next instance tick
      let update = {
        [propertyKey]: {
          toCompleteUntilNextInstance: sub(1),
          researchMoney: add(1),
          completed: add(1),
        },
      }

      // if next is complete, reset it and queue an instance of the next level
      if (property.toCompleteUntilNextInstance <= 1) {
        update = {
          [propertyKey]:  {
            toCompleteUntilNextInstance: property.research('incrementCost'),
            researchMoney: add(1),
            completed: add(1),
          },
          [propertyKey + 1]:  {
            unlocked: true,
            toBuild: add(1),
          },
        }
      }

      return u(update, state)
    }

    default:
      return state
  }
}
