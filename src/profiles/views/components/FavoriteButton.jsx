import React from 'react'
import FavoriteActions from 'profiles/actions/FavoriteActions'
import Icon from 'shared/views/interface/Icon'
import cx from 'classnames'
import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'

const stateToConnect = mapState(['favorites', 'currentProfile'])
const actionsToConnect = mapActions([FavoriteActions])

export const FavoriteButton = React.createClass({
  getDefaultProps() {
    return {
      favorites: []
    }
  },

  clickHandler(e) {
    let { favorites, currentProfile, profile } = this.props
    if (favorites.some(f => f.id === profile)) {
      this.props.removeFavorite(profile, currentProfile.login)
    } else {
      this.props.addFavorite(profile, currentProfile.login)
    }
  },

  render() {
    let { favorites, currentProfile, profile } = this.props
    let isFavorite = favorites.map(f => f.id).indexOf(profile) > -1

    return (
      <div
        className={cx('favorite-button absolute h1 t-0 r-0 p3', {
          favorite: !isFavorite, unfavorite: isFavorite
        })}
        onClick={this.clickHandler}
        style={this.props.style}>

        <Icon
          name="unfavorite"
          className="absolute text-shadow fade color-yellow">
        </Icon>

        <Icon
          name="favorite"
          className="absolute text-shadow fade color-white">
        </Icon>

      </div>
    )
  }
})

export default connect(stateToConnect, actionsToConnect)(FavoriteButton)
