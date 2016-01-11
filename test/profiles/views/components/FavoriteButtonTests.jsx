import React from 'react'
import Factory from 'shared/test/mocks'
import ComponentTest from 'legit-tests/no-dom'
import sinon from 'sinon'
import {expect} from 'chai'
import {FavoriteButton} from 'profiles/views/components/FavoriteButton'

describe('FavoriteButton', () => {
  const currentProfile = Factory.create('profile')
  const profile = Factory.create('profile')
  const removeFavorite = sinon.spy()
  const addFavorite = sinon.spy()
  const props = {
    currentProfile: currentProfile,
    profile: profile.id,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite
  }

  it('should show full star when passed a favorite', () => {
    ComponentTest(<FavoriteButton {...props} favorites={[{id: profile.id}]} />)
      .find('div')
      .test(({div}) => {
        expect(div.classList.contains('favorite')).to.be.false
        expect(div.classList.contains('unfavorite')).to.be.true
      })
  })

  it('should show empty star when not passed a favorite', () => {
    ComponentTest(<FavoriteButton {...props} />)
      .find('div')
      .test(({div}) => {
        expect(div.classList.contains('favorite')).to.be.true
        expect(div.classList.contains('unfavorite')).to.be.false
      })
  })

  it("should call removeFavorite with login when clicked with favorite", () => {
    ComponentTest(<FavoriteButton {...props} favorites={[{id: profile.id}]} />)
      .find('div')
      .simulate({method: 'click', element: 'div'})
      .test(({div}) => {
        expect(removeFavorite.called).to.be.true
        expect(removeFavorite.calledWith(profile.id, currentProfile.login)).to.be.true
        expect(addFavorite.called).to.be.false
        expect(div.classList.contains('unfavorite')).to.be.true
        expect(div.classList.contains('favorite')).to.be.false
      })
  })

  it("should call addFavorite with login when clicked without favorite", () => {
    addFavorite.reset()
    removeFavorite.reset()
    ComponentTest(<FavoriteButton {...props} />)
      .find('div')
      .simulate({method: 'click', element: 'div'})
      .test(({div}) => {
        expect(removeFavorite.called).to.be.false
        expect(addFavorite.called).to.be.true
        expect(addFavorite.calledWith(profile.id, currentProfile.login)).to.be.true
        expect(div.classList.contains('favorite')).to.be.true
        expect(div.classList.contains('unfavorite')).to.be.false
      })
  })
})
