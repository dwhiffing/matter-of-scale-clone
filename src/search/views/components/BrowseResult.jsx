import React from 'react'
import { changeRoute } from 'shared/utils/History'
import cx from 'classnames'
import ProfileFooter from 'profiles/views/components/ProfileFooter'
import FavoriteButton from 'profiles/views/components/FavoriteButton'
import ScrollSwipe from 'shared/views/components/ScrollSwipe'
import CroppedPhoto from 'profiles/views/components/CroppedPhoto'

const BrowseResult = React.createClass({

  propTypes: {
    profile: React.PropTypes.object,
    priority: React.PropTypes.bool
  },

  triggerActionAfterSwipe(action) {
    if (action !== 1) {
      this.props.nextResult(action, true)
    }
  },

  render() {
    let {isCurrent, profile, rotation, action} = this.props
    rotation = isCurrent ? 0 : rotation

    return (
      <ScrollSwipe
        index={isCurrent ? this.props.action : 1}
        onTap={() => {changeRoute(`/profiles/${profile.login}`)}}
        updateIndex={this.triggerActionAfterSwipe}
        shouldUpdate={!this.props.isDummy}
        className={cx("p3 no-wrap absolute-fill", {'disable-click': !isCurrent, 'fast-render': !isCurrent})}
        style={{zIndex: this.props.zIndex}}>

        <div className={cx(`browse-result rotate-${rotation} bg-gray-40`, {priority: profile.priority})}>

          <FavoriteButton profile={profile.id} />

          <CroppedPhoto fillWrapper src={profile.large_photo_url} style={{maxHeight: '100%', maxWidth: '100%'}} isDummy={this.props.isDummy} />

          <ProfileFooter priority={profile.priority} profile={profile} />

        </div>

      </ScrollSwipe>
    )
  }
})

export default BrowseResult
