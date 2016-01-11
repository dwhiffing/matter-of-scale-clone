import React from 'react'
import Factory from 'shared/test/mocks'
import ComponentTest from 'legit-tests/no-dom'
import sinon from 'sinon'
import {expect} from 'chai'
import ProfileFooter from 'profiles/views/components/ProfileFooter'
import {findMany} from 'shared/test/testMiddleware'

describe('ProfileFooter', () => {
  const currentProfile = Factory.create('profile')
  const profile = Factory.create('profile', {public_photo_count: 3, private_photo_count: 5})
  const location = `${profile.city}, ${profile.state}`
  const age = profile.preference.age
  const props = {
    currentProfile: currentProfile,
    profile: profile,
  }

  it('should display the profile login in h2.ellipsis', () => {
    ComponentTest(<ProfileFooter {...props} />)
      .find('h2')
      .test(({h2}) => {
        expect(h2.classList.contains('ellipsis')).to.be.true
        expect(h2.innerHTML).to.equal(profile.login)
      })
  })

  it('should display profile age and location', () => {
    ComponentTest(<ProfileFooter {...props} />)
      .find('h3')
      .test(({h3}) => {
        expect(h3.innerHTML).to.equal(`${age}/${location}`)
      })
  })

  it('should display result age and location', () => {
    ComponentTest(<ProfileFooter {...props} profile={Factory.create('searchResult', {age: 18, location: 'Toronto, On'})} />)
      .find('h3')
      .element((h3) => {
        let [age, location] = h3.innerHTML.split('/')
        expect(age).to.equal('18')
        expect(location).to.equal('Toronto, On')
      })
  })
  
  it('should display the profile public and private photo count', () => {
    ComponentTest(<ProfileFooter {...props} />)
      .find('.publicCount')
      .find('.privateCount')
      .test((elements) => {
        expect(elements['publicCount'].innerHTML).to.equal('3')
        expect(elements['privateCount'].innerHTML).to.equal('5')
      })
  })

  it('should display a priority badge when passed priority', () => {
    ComponentTest(<ProfileFooter {...props} priority />)
      .find('.priorityBadge')
      .element((badge) => {
        expect(badge.children[0].classList.contains('icon-cl-logo')).to.true
      })
  })

  it('should not display a priority badge when not passed priority', () => {
    ComponentTest(<ProfileFooter {...props} />)
      .find('.priorityBadge')
      .element((badge) => {
        expect(badge).to.be.empty
      })
  })
})
