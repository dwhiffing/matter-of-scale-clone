import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import PersistUtils from 'shared/utils/PersistUtils'

describe('PersistUtils', () => {
  let storage = {}
  const settings = Factory.create('filterSettings')
  const key = '__key__'

  describe('getSaved', () => {
    it('should return localStorage if available', () => {
      PersistUtils.save(key, settings, storage)
      let saved = PersistUtils.getSaved(key, {
        [key]: JSON.stringify(settings)
      })
      expect(saved).to.deep.equal(settings)
    })

    it('should return null if localStorage not available', () => {
      let saved = PersistUtils.getSaved(key, {
        wrongKey: JSON.stringify(settings)
      })
      expect(saved).to.equal(null)
    })

    it('should fetch from the window if localStorage is not available', () => {
      window[key] = settings
      let saved = PersistUtils.getSaved(key, null)
      expect(saved).to.deep.equal(settings)
    })
  })

  describe('save', () => {
    it('should set localStorage key if localStorage is available', () => {
      PersistUtils.save(key, settings, storage)
      expect(storage[key]).to.deep.equal(JSON.stringify(settings))
    })
    it('should set window key if localStorage is not available', () => {
      PersistUtils.save(key, settings, null)
      expect(window[key]).to.deep.equal(settings)
    })
  })

})
