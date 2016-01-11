import { reducerCreator } from 'shared/redux/helpers'

export const initialState = {
  modalMenuShown: false,
  navigationBarShown: true,
  currentSite: 'cougarlife',
  modal: null,
  flashMessage: null
}

const InterfaceReducers = {
  showNavigationBar(state, action) {
    return Object.assign({}, state, {navigationBarShown: action.payload})
  },

  toggleModalMenu(state, action) {
    return Object.assign({}, state, {modalMenuShown: action.payload})
  },

  displayFlashMessage(state, action) {
    return Object.assign({}, state, {flashMessage: action.payload})
  },

  clearFlashMessage(state, action) {
    return Object.assign({}, state, {flashMessage: null})
  },

  launchModal(state, action) {
    return Object.assign({}, state, {modal: action.payload})
  },

  closeModal(state, action) {
    return Object.assign({}, state, {modal: null})
  },
}

export default reducerCreator(InterfaceReducers, initialState)
