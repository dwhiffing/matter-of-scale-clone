import {expect} from 'chai'
import request, {CURRENT_ENV, API_ROOT, API_COOKIE, middleware} from 'shared/utils/APIUtils'

const getHeader = (r, key) => r.req ? r.req._headers[key.toLowerCase()] : r.header[key]

describe('APIUtils', () => {
  describe('CURRENT_ENV', () => {
    it('should return the correct key for dev', () => {
      const dev = CURRENT_ENV('localhost.cougarlife.com')
      expect(dev).to.equal('DEV')
    })
    it('should return the correct key for qa', () => {
      const qa = CURRENT_ENV('qa2.cougarlife.com')
      expect(qa).to.equal('QA')
    })
    it('should return the correct key for prod', () => {
      const prod = CURRENT_ENV('www.cougarlife.com')
      expect(prod).to.equal('PROD')
    })
  })

  describe('request middleware', () => {
    it('should prefix outgoing requests with the API_ROOT when relative', () => {
      let _request = request.brunel.get('/foo/bar')
      expect(_request.url).to.equal(`${API_ROOT()}/foo/bar`)
    })
    it('should not prefix outgoing requests when absolute', () => {
      let _request = request.brunel.get('https://cougarlife.com')
      expect(_request.url).to.equal('https://cougarlife.com')
    })
    it('should add auth headers when a token is available', () => {
      let _request = request.brunel.get('/foo/bar')
      middleware.call({junto: false}, _request, 'abc123')
      expect(getHeader(_request, 'Authorization')).to.equal('Bearer abc123')
      expect(getHeader(_request, 'X-Requested-With')).to.equal('XMLHttpRequest')
    })
    it('should add junto csrf headers when a meta tag is available', () => {
      var meta = document.createElement('meta');
      meta.name = 'csrf-token'
      meta.httpEquiv = 'X-UA-Compatible'
      meta.content = 'foo'
      document.getElementsByTagName('head')[0].appendChild(meta);
      let _request = request.brunel.get('/foo/bar')
      expect(getHeader(_request,  'X-CSRF-Token')).to.equal('foo')
    })
  })

})
