import {expect} from 'chai'
import loggerMiddleware  from 'shared/redux/loggerMiddleware'

describe('loggerMiddleware:changes', () => {
  it('should detect deep changes between two versions of state')
  it('should return the diff per key')
})

describe('loggerMiddleware', () => {
  it('should log request as blue')
  it('should log success as green')
  it('should log failure as red')
  it('should log to a group if there are changes')
  it('should not log to a group if there are not changes')
  it('should not log to a group if groups are not available on the console')
})
