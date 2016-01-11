import {expect} from 'chai'
import reducers from 'shared/reducers/InterfaceReducers'

describe('InterfaceReducers', () => {
  const currentState = {
    modalMenuShown: false,
    navigationBarShown: true,
    currentSite: 'cougarlife',
    messageCount: null
  }

  describe('showNavigationBar', () => {
    it('should set navigationBarShown true when passed true', () => {
      const action = {type: 'SHOW_NAVIGATION_BAR', payload: false}
      expect(reducers(currentState, action).navigationBarShown).to.equal(false)
    })

    it('should set navigationBarShown false when passed false', () => {
      const action = {type: 'SHOW_NAVIGATION_BAR', payload: true}
      expect(reducers(currentState, action).navigationBarShown).to.equal(true)
    })
  })

  describe('toggleModalMenu', () => {
    it('should set modalMenuShown true when passed true', () => {
      const action = {type: 'TOGGLE_MODAL_MENU', payload: true}
      expect(reducers(currentState, action).modalMenuShown).to.equal(true)
    })
    it('should set modalMenuShown false when passed false', () => {
      const action = {type: 'TOGGLE_MODAL_MENU', payload: false}
      expect(reducers(currentState, action).modalMenuShown).to.equal(false)
    })
  })

  describe('displayFlashMessage', () => {
    it('should set flashMessage to passed message', () => {
      const message = "Hello World"
      const action = {type: 'DISPLAY_FLASH_MESSAGE', payload: message}
      expect(reducers(currentState, action).flashMessage).to.equal(message)
    })
  })

  describe('clearFlashMessage', () => {
    it('should set flashMessage to null', () => {
      const action = {type: 'CLEAR_FLASH_MESSAGE'}
      expect(reducers(currentState, action).flashMessage).to.equal(null)
    })
  })

  describe('launchModal', () => {
    it('should set modal to passed component', () => {
      const component = {component: 'thing'}
      const action = {type: 'LAUNCH_MODAL', payload: component}
      expect(reducers(currentState, action).modal).to.equal(component)
    })
  })

  describe('closeModal', () => {
    it('should set modal to passed component', () => {
      const action = {type: 'CLOSE_MODAL'}
      expect(reducers(currentState, action).modal).to.equal(null)
    })
  })

})
