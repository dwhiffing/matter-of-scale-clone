import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import reducers from 'profiles/reducers/FavoriteReducers'

const favoriteList = Factory.createList(3, 'simpleProfile')

describe('FavoriteReducers', () => {

  describe('fetchCurrentProfileRequest', () => {
    const currentState = favoriteList
    const action = {type: "FETCH_CURRENT_PROFILE_REQUEST"}

    it('should empty the favorite list', () => {
      const nextState = []

      expect(reducers(currentState, action)).deep.equal(nextState)
    })
  })

  describe('fetchCurrentProfile', () => {
    const currentState = []
    const action = {type: "FETCH_CURRENT_PROFILE", payload: {session_profile: {favorites: favoriteList}}}

    it('should set the favorite list from "profiles" key on payload', () => {
      const nextState = favoriteList

      expect(reducers(currentState, action)).to.deep.equal(nextState)
    })
  })

  describe('addFavorite', () => {
    const newFavorite = Factory.create('simpleProfile')
    const currentState = favoriteList
    const action = {type: "ADD_FAVORITE", payload: {profile: newFavorite}}

    it('should add new favorite from profile key on payload', () => {
      const nextState = favoriteList.concat(newFavorite)

      expect(reducers(currentState, action)).to.deep.equal(nextState)
    })
  })

  describe('removeFavorite', () => {
    const currentState = favoriteList
    const action = {type: "REMOVE_FAVORITE", payload: {}, meta: [2]}

    it('should remove a favorite from profile key on payload', () => {
      const nextState = favoriteList.filter(fave => fave.id != action.meta[0])

      expect(reducers(currentState, action)).to.deep.equal(nextState)
    })
  })

})
