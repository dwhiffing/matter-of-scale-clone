import {expect} from 'chai'
import actions from 'shared/actions/InterfaceActions'

describe('InterfaceActions', () => {

  describe('showNavigationBar', () => {
    it('should set showNavigationBar true when passed true', () => {
      const payload = actions.showNavigationBar(true).payload
      expect(payload).to.equal(true)
    })

    it('should set showNavigationBar false when passed false', () => {
      const payload = actions.showNavigationBar(false).payload
      expect(payload).to.equal(false)
    })
  })

  describe('toggleModalMenu', () => {
    it('should set toggleModalMenu true when passed true', () => {
      const payload = actions.toggleModalMenu(true).payload
      expect(payload).to.equal(true)
    })
    it('should set toggleModalMenu false when passed false', () => {
      const payload = actions.toggleModalMenu(false).payload
      expect(payload).to.equal(false)
    })
  })

  describe('displayFlashMessage', () => {
    it('should set the payload to the passed message', () => {
      const message = "Hello World"
      const payload = actions.displayFlashMessage(message).payload
      expect(payload).to.equal(message)
    })
  })

  describe('launchModal', () => {
    it('should set the payload to the passed modal', () => {
      // this should be a react component
      const component = {component: true}
      const payload = actions.launchModal(component).payload
      expect(payload).to.equal(component)
    })
  })

  describe('closeModal', () => {
    it('should have no payload', () => {
      const payload = actions.closeModal().payload
      expect(payload).to.equal(null)
    })
  })

  describe('clearFlashMessage', () => {
    it('should have no payload', () => {
      const payload = actions.clearFlashMessage().payload
      expect(payload).to.equal(null)
    })
  })

})
