import { reducerCreator } from 'shared/redux/helpers'

export const initialState = []

const FlirtReducers = {

  sendFlirt(state, action) {
    return state.concat([{login: action.meta[0]}])
  }
  
}

export default reducerCreator(FlirtReducers, initialState)