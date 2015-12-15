import _ from 'lodash'
import u from 'updeep'
import BuildingFactory, { rehydrate } from 'factories/BuildingFactory'
import { add, pushToObj, shallowUpdate, reducerCreator, toObj } from 'utils/helpers'

const initialState = {}

const buildingReducers = {

  rehydrate(state, action) {
    if (action.key === 'buildings') {
      return u.map((building) => rehydrate(building), action.payload)
    }
    return state
  },

  updateBuilding(state, action) {
    const {buildingKey, update} = action.payload

    return shallowUpdate(buildingKey, update, state)
  },

  buyBuilding(state, action) {
    const {buildingKey, count} = action.payload

    // add 1 to building count when purchase is successful
    return shallowUpdate(buildingKey, {
      count: add(count)
    }, state)
  },

  // when an instance is created, push it's building set onto the state
  createInstance(state, action) {
    let { id, type, count } = action.payload

    const newBuildingSet = _.times(count, () => {
      return u.map((building) => rehydrate(building), BuildingFactory(id, type))
    })

    return pushToObj(state, ...newBuildingSet)
  },

  completeInstance(state, action) {

    // TODO: helper for array from range
    // omit the buildings from the store
    const id = action.payload.id*10
    const omittedState = Object.values(
      u.omit(_.range(id, id+10), state)
    ).reduce(toObj, {})

    // update the id to reflect the index so that buildings remain mapped properly
    return u.map((building, index) => {
      return u({
        instanceId: Math.floor(index / 10)
      }, building)
    }, omittedState)
  },

  doTick(state, action) {
    return u.map(building => {

      // autobuy the amount instance set aside for us last tick
      let update = {
        autoBuyAmount: add(building.autoBuyFromLastTick())
      }

      // if we have enough, buy the next building
      if (building.autoBuyComplete()) {
        update = {
          autoBuyAmount: 0,
          count: c => c + 1
        }
      }

      return u(update, building)
    }, state)
  }

}

export default reducerCreator(buildingReducers, initialState)
