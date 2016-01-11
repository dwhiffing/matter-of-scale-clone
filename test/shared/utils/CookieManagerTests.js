import {expect} from 'chai'
import { API_COOKIE } from 'shared/utils/APIUtils'
import CookieManager from 'shared/utils/CookieManager'

describe('CookieManager', () => {

  describe('get', () => {
    it('should get a cookie from the document', () => {
      CookieManager.set('foo', 'bar')
      expect(CookieManager.get('foo')).to.equal('bar')
    })
    it('should return null for a missing cookie', () => {
      expect(CookieManager.get('bar')).to.equal(null)
    })
  })

  describe('set', () => {
    it('should set a cookie', () => {
      CookieManager.set('foo', 'baz')
      expect(CookieManager.get('foo')).to.equal('baz')
    })
  })

  describe('del', () => {
    it('should remove a cookie', () => {
      CookieManager.del('foo')
      expect(CookieManager.get('foo')).to.equal(null)
    })
  })

  describe('getJuntoCookie', () => {
    it('should return the junto cookie', () => {
      CookieManager.set(API_COOKIE(), 'baz')
      expect(CookieManager.getJuntoCookie()).to.equal('baz')
    })
  })

})
