import {expect} from 'chai'
import promiseMiddleware, {parse} from 'shared/redux/promiseMiddleware'

describe('promiseMiddleware:parse', () => {
  it('should parse array responses by responding with the body mapped', () => {
    expect(parse([{body: 'foo'}, {body: 'bar'}])).to.deep.equal(['foo', 'bar'])
  })
  it('should parse array responses with missing body by responding with undefined', () => {
    expect(parse([{text: 'foo'}, {text: 'bar'}])).to.deep.equal([undefined, undefined])
  })
  it('should parse missing body responses with non json text key', () => {
    expect(parse({text: {foo: 'bar'}})).to.deep.equal({foo: 'bar'})
  })
  it('should parse missing body responses with empty string text to null', () => {
    expect(parse({text: ''})).to.equal(null)
  })
  it('should parse body responses with body', () => {
    expect(parse({body: 'foo'})).to.equal('foo')
  })
  it('should parse string responses to undefined', () => {
    expect(parse('OK')).to.equal(undefined)
  })
})

describe('promiseMiddleware', () => {
  it('should dispatch as normal for non async actions')
  it('should prevent infinite failure loop')
  it('should dispatch a request action immediately for async actions')
  it('should dispatch a success action on resolved promise')
  it('should dispatch a failure action on rejected promise')
})
