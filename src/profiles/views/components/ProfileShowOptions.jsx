import React from 'react'
import OptionsMenu from 'shared/views/interface/OptionsMenu'
import BlockActions from 'profiles/actions/BlockActions'
import FlirtActions from 'profiles/actions/FlirtActions'
import FavoriteActions from 'profiles/actions/FavoriteActions'
import PrivateAccessActions from 'profiles/actions/PrivateAccessActions'
import { changeRoute } from 'shared/utils/History'

import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'

const stateToConnect = mapState([
  'blocks',
  'favorites',
  'flirts',
  'privateAccess',
  'currentProfile'
])

const actionsToConnect = mapActions([
  BlockActions,
  FavoriteActions,
  FlirtActions,
  PrivateAccessActions
])

const ProfileShowOptions = React.createClass({

  propTypes: {
    /** profile to target for all menu actions */
    profile: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      page: 0
    }
  },

  render() {
    let props = this.props
    let profile = props.profile
    let favoriteButton, blockButton, flirtButton, privateAccessButton

    let moreButton = {
      label: 'More',
      action: () => this.setState({ page: 1 })
    }

    let giftButton = {
      label: 'Send Gift',
      action: () => changeRoute(`profiles/${profile.login}/new_message`)
    }

    let messageButton = {
      label: 'Send message',
      action: () => changeRoute(`profiles/${profile.login}/new_message`)
    }

    let reportButton = {
      label: 'Report Suspicious Profile',
      action: () => changeRoute(`profiles/${profile.login}/report`)
    }

    if (props.favorites.some(b => b.id == profile.id)) {
      favoriteButton = {
        label: 'Remove from favorites',
        action: () => props.removeFavorite(profile.id)
      }
    } else {
      favoriteButton = {
        label: 'Add to favorites',
        action: () => props.addFavorite(profile.id)
      }
    }

    if (props.blocks.some(b => b.id == profile.id)) {
      blockButton = {
        label: 'Unblock Profile',
        action: () => props.removeBlock(profile.id)
      }
    } else {
      blockButton = {
        label: 'Block Profile',
        action: () => props.addBlock(profile.id)
      }
    }

    if (props.flirts.some(b => b.login == profile.login)) {
      flirtButton = {
        label: "Flirted",
        action: () => {}
      }
    } else {
      flirtButton = {
        label: "Flirt",
        action: () => props.sendFlirt(profile.login)
      }
    }

    let access = props.privateAccess
    if (profile.private_photo_count > 0) {
      privateAccessButton = () => {
        if (access.granters.filter(g => g.login == profile.login).length) {
          return {
            label: 'Private Access Granted',
            action: () => {}
          }
        } else if (access.recentlyRequested.filter(login => login == profile.login).length) {
          return {
            label: 'Private Access Requested',
            action: () => {}
          }
        } else {
          return {
            label: 'Request Private Access',
            action: () => props.requestAccess(profile.login)
          }
        }
      }()
    }

    let buttons = [[
      moreButton,
      giftButton,
      favoriteButton,
      privateAccessButton,
      flirtButton,
      messageButton
    ], [
      blockButton,
      reportButton
    ]]

    return (
      <OptionsMenu
        buttons={buttons}
        page={this.state.page}
        show={this.props.show}
        toggle={this.props.toggle}
        cancelCallback={() => setTimeout(() => {this.setState({page: 0})},500)}>
      </OptionsMenu>
    )
  }
})

export default connect(stateToConnect, actionsToConnect)(ProfileShowOptions)
