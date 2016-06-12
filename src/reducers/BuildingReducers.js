import _ from 'lodash'
import u from 'updeep'
import BuildingFactory, { rehydrate } from 'factories/BuildingFactory'
import { add, pushToObj, shallowUpdate, toObj } from 'utils/helpers'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {

    case 'persist/REHYDRATE':
      return payload.buildings ?
        u.map(b => rehydrate(b), payload.buildings) :
        state

    case 'UPDATE_BUILDING':
      return shallowUpdate(payload.buildingKey, payload.update, state)

    case 'DO_BUILDING_PURCHASE':
      return shallowUpdate(payload.buildingKey, {
        count: add(payload.count),
      }, state)

    case 'DO_CREATE_INSTANCE': {
      const { id, type, count } = payload
      const newBuildingSet = _.times(count, () =>
        u.map(b => rehydrate(b), BuildingFactory(id, type))
      )

      return pushToObj(state, ...newBuildingSet)
    }

    case 'DO_COMPLETE_INSTANCE': {
      // omit the buildings from the store
      const id = payload.instanceKey * 10
      const omittedState = Object.values(
        u.omit(_.range(id, id + 10), state)
      ).reduce(toObj, {})

      // update the id to reflect the index so that buildings remain mapped properly
      return u.map((building, index) => {
        return u({
          instanceId: Math.floor(index / 10),
        }, building)
      }, omittedState)
    }

    case 'DO_TICK':
      return u.map(building => {
        // autobuy the amount instance set aside for us last tick
        let update = {
          autoBuyAmount: add(building.autoBuyFromLastTick()),
        }
        // if we have enough, buy the next building
        if (building.autoBuyComplete()) {
          update = {
            autoBuyAmount: 0,
            count: c => c + 1,
          }
        }
        return u(update, building)
      }, state)

    default:
      return state
  }
}
