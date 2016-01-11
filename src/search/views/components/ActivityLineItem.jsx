import React from 'react'
import Icon from 'shared/views/interface/Icon'
import { changeRoute } from 'shared/utils/History'

const activityTypes = {
  request_for_private_photo_access: {
    icon: 'lock-open-alt', text: 'Requested access to your private gallery', link: `/profiles/#{login}`
  }, ra_granted_access: {
    icon: 'lock-open-alt', text: 'Was granted access to your private gallery', link: `photo_permissions`
  }, ra_received_access: {
    icon: 'lock-open-alt', text: 'Has granted you access to their private gallery', link: `/profiles/#{login}`
  }, profile_favorited: {
    icon: 'unfavorite', text: 'Added you to favorites', link: `/profiles/#{login}`
  }, profile_add_favorite: {
    icon: 'unfavorite', text: 'was added to your favorites list', link: `profiles/#{current}/favorites`
  }, flirt_received: {
    icon: 'flirt', text: 'Flirted with you', link: `/profiles/#{login}`
  }, priority_message_received: {
    icon: 'message', text: 'Sent you a priority message', link: `messages/#{message}`
  }, message_received: {
    icon: 'message', text: 'Sent you a message', link: `messages/#{message}`
  }, gift_received: {
    icon: 'gift', text: 'Sent you a gift', link: `messages/#{message}`
  }, photo_comment_received: {
    icon: 'message', text: 'sent you a photo comment', link: `messages/#{message}`
  }
}

const ActivityLineItem = React.createClass({

  render() {
    let activity = this.props.activity
    let data = activityTypes[activity.action]
    let date = new Date(activity.at)

    let activityContextualLink = data.link
      .replace('#{login}', activity.login)
      .replace('#{current}', this.props.current)
      .replace('#{message}', activity.message_id)

    if (!data) return

    return (
      <div
        className="row middle"
        style={{
          borderBottom: '1px solid #ddd',
          paddingTop: '0.6rem',
          paddingBottom: '0.8rem',
        }}>

        <div className="col-2 center" onClick={() => changeRoute(`/profiles/${activity.login}`)}>
          <img src={activity.photo} className="circle bg-black" style={{display: 'inline-block', width:40, height:40}} />
        </div>

        <div className="col-8 gray-50" onClick={() => changeRoute(activityContextualLink)}>
          <div className="gray-50" style={{fontSize: 14.5, fontWeight: 400, marginBottom: -4}}>
            {activity.login}
          </div>

          <Icon name={data.icon} style={{fontSize: 14}}/>&nbsp;
          <span className="gray-60 weight-3" style={{fontSize: '0.9rem', lineHeight: 0.7}}>{data.text}</span>
        </div>
        <h6 className="col-2 gray-70 center top">
          {date.getMonthNameShort()} {date.getDay() + 1}
        </h6>

      </div>
    )
  }
})

export default ActivityLineItem
