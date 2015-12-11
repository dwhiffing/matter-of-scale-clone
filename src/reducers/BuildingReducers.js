import _ from 'lodash'
import u from 'updeep'
import BuildingFactory from 'factories/BuildingFactory'
import { add, toObj, shallowUpdate, reducerCreator } from 'utils/helpers'

const initialState = {}

const buildingReducers = {

  createInstance(state, action) {
    let { type, count } = action.payload

    const newBuildingSet = _.times(count, () => {
      return BuildingFactory(type)
    })

    const concatWithState = [
      Object.values(state),
      ...newBuildingSet
    ].reduce((a, b) => a.concat(b))

    const update = concatWithState.reduce(toObj, {})

    return Object.assign({}, update, state)
  },

  updateBuilding(state, action) {
    const {buildingKey, update} = action.payload

    return shallowUpdate(buildingKey, update, state)
  },

  buyBuilding(state, action) {
    const {buildingKey} = action.payload

    return shallowUpdate(buildingKey, {count: add(1)}, state)
  },

  doTick(state, action) {
    return u.map(building => {

      // this needs to handle actually spending money on autobuy
      let update = {
        autoBuyAmount: add(building.autoBuyIncrement())
      }

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
