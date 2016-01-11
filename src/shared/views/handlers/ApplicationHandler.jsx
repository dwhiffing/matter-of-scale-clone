import React from 'react'
import ResizeMixin from 'shared/views/mixins/ResizeMixin'

import InterfaceActions from 'shared/actions/InterfaceActions'
import InboxActions from 'inbox/actions/InboxActions'
import SessionActions from 'shared/actions/SessionActions'
import PackageActions from 'packages/actions/PackageActions'

import Header from 'shared/views/interface/Header'
import NavigationBar from 'shared/views/interface/NavigationBar'
import FlashMessage from 'shared/views/interface/FlashMessage'
import LoadingScreen from 'shared/views/interface/LoadingScreen'
import Modal from 'shared/views/interface/Modal'

import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'

const stateToConnect = mapState(['currentProfile', 'userInterface', 'inbox', 'packages'])
const actionsToConnect = mapActions([InterfaceActions, InboxActions, PackageActions])

/**
 * The toplevel Application handler/view.
 * @class Application
 **/
const FosterApplication = React.createClass({

  mixins: [ResizeMixin],

  componentWillMount() {
    SessionActions.bootSessionFromCookie()
  },

  render() {
    let { currentProfile, userInterface, toggleModalMenu, displayFlashMessage } = this.props

    // name of current site based on hostname in uri ("cougarlife", "establishedmen", .etc)
    const currentSite = window.location.hostname.split('.').slice(1,2)

    if (!currentProfile) {
      return (
        <main className={`${currentSite} row`}>
          <Header />
          <LoadingScreen />
        </main>
      )
    } else {

      let navbar, navbarClass = ""
      if (userInterface.navigationBarShown) {
        navbarClass = "padded-bottom"
        navbar = <NavigationBar currentProfile={currentProfile} unreadCount={this.props.inbox.unreadCount} />
      }

      let route
      if (this.props.children) {
        route = React.cloneElement(this.props.children, {currentProfile, userInterface, toggleModalMenu, displayFlashMessage })
      }

      return (
        <main className={`cougarlife ${navbarClass}`}>

          <FlashMessage />

          <Modal display={this.props.userInterface.modal} closeModal={this.props.closeModal}>
            {this.props.userInterface.modal}
          </Modal>

          {route}

          {navbar}

        </main>
      )
    }
  }
})

export default connect(stateToConnect, actionsToConnect)(FosterApplication)
