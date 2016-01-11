import React from 'react'
import cx from 'classnames'
import { changeRoute } from 'shared/utils/History'
import Icon from 'shared/views/interface/Icon'

const NavigationBar = React.createClass({

  getItems() {
    const profile = this.props.currentProfile
    const hideUpgrade = profile.gender === 'female' || profile.subscriber
    const hideBrowse = profile.gender !== 'female'

    return [
      {
        text: "Home", iconName: "home", clickHandler: this.clickHome
      }, {
        text: "Search", iconName: "search", clickHandler: this.clickSearch
      }, {
        text: "Inbox", iconName: "message", clickHandler: this.clickInbox
      }, {
        text: "Browse", iconName: "browse", clickHandler: this.clickBrowse, isHidden: hideBrowse
      }, {
        text: "Upgrade", iconName: "upgrade", clickHandler: this.clickUpgrade, isHidden: hideUpgrade
      }, {
        text: "More", iconName: "list", clickHandler: this.clickMoreButton
      }
    ].filter(i => !i.isHidden)
  },

  clickHome(e) {
    changeRoute("/home")
  },

  clickSearch(e) {
    changeRoute("/search")
  },

  clickInbox(e) {
    changeRoute("messages/inbox")
  },

  clickUpgrade(e) {
    changeRoute(`profiles/${this.props.currentProfile.login}/subscriptions/new`)
  },

  clickBrowse(e) {
    changeRoute("/browse")
  },

  clickMoreButton(e) {
    changeRoute("/more")
  },

  render() {

    return (
      <nav className="fixed to-bottom no-highlight">
        {this.getItems().map(data => {
          if (data.isHidden) return null

          let isSelected = new RegExp(data.text, 'i').test(location.hash)
          let unreadCountBadge

          if (data.text == 'Inbox' && this.props.unreadCount > 0) {
            unreadCountBadge = (
              <div className="circle absolute color-white bg-secondary"
                style={{width: 16, height: 16, top: -4, right: -10, font: '500 11px/16px Helvetica Neue'}}>
                {this.props.unreadCount}
              </div>
            )
          }

          return (
            <span
              key={data.text}
              onClick={data.clickHandler}
              className={cx('relative', {'color-primary': isSelected})}>

              <Icon name={data.iconName} className='h2 relative'>
                {unreadCountBadge}
              </Icon>

              <br/>

              <h4 className='caps weight-5'>
                {data.text}
              </h4>
            </span>
          )
        })}
      </nav>
    )
  }
})

export default NavigationBar
