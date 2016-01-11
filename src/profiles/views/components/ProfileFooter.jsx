import React from 'react'
import Icon from 'shared/views/interface/Icon'
import cx from 'classnames'

const ProfileFooter = React.createClass({

  propTypes: {
    profile: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      textShadow: true
    }
  },

  render() {
    let featuredIcon, { profile, priority, textShadow } = this.props
    let {login, location, city, state} = profile
    let age = profile.preference ? profile.preference.age : profile.age
    location = location || `${city}, ${state}`

    const classes = 'row between middle absolute to-bottom bg-fade-up-light px3 py1'

    const publicCount = profile.public_photo_count
    const privateCount = profile.private_photo_count
    return (
      <div
        className={cx(classes, {
          'text-shadow': textShadow
        })}>
        <div>
          {priority &&
            <span className="priorityBadge weight-5">
              <Icon name='cl-logo' className="pr1"/>FEATURED
            </span>
          }

          <h2 className="sm-h2 py1 ellipsis">
            {login}
          </h2>

          <h3 className="sm-h3 py1 ellipsis weight-3">
            {`${age}/${location}`}
          </h3>
        </div>

        <h1 className="sm-h1">
          <span className="publicCount">
            {publicCount}
          </span>
          <Icon name="picture" style={{paddingLeft: 2, paddingRight: 15}} />
          <span className="privateCount">
            {privateCount}
          </span>
          <Icon name="lock" />
        </h1>
      </div>
    )
  }
})

export default ProfileFooter
