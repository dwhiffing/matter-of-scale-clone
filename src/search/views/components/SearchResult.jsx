import React from 'react'
import { changeRoute } from 'shared/utils/History'
import CroppedPhoto from 'profiles/views/components/CroppedPhoto'
import Icon from 'shared/views/interface/Icon'
import ResizeMixin from 'shared/views/mixins/ResizeMixin'
import cx from 'classnames'

const SearchResult = React.createClass({

  mixins: [ResizeMixin],

  render() {
    let {advert, priority, login, age, private_photo_count, public_photo_count} = this.props.result
    let profileLocation = this.props.result.location.split(',')[0]

    let clickAction = () => changeRoute(`/profiles/${login}`)

    let button = {
      text: 'Message',
      icon: 'message',
      action: e => {e.stopPropagation(); changeRoute(`/profiles/${login}?message=1`)}
    }

    if (advert) {
      button = {
        text: 'List me',
        icon: 'ok',
        action: e => {e.stopPropagation(); changeRoute(`priority_listings/new`)}
      }
    }

    let shouldHighlight = priority || advert

    return (
      <div className={cx('card col-6 gray-40', {priority, advert})}
        onClick={clickAction}>

        <div className="relative">

          <CroppedPhoto src={this.props.result.large_photo_url} cropRatio={.8} width='100%' />

          {public_photo_count > 0 &&
            <h4 className="count-circle absolute b-0 r-0">
              {public_photo_count}
              {private_photo_count > 0 &&
                <Icon name='lock' />
              }
            </h4>
          }

        </div>

        <div className={cx("footer row center no-wrap", {'bg-secondary': shouldHighlight})}>

          <span style={{maxWidth: '100%'}}>
            <div className="profile-login">
              {login}
            </div>
            <div className="profile-info ellipsis">
              {`${age}, ${profileLocation}`}
            </div>
          </span>

          <button className={cx('col-12 no-wrap', {white: shouldHighlight})} onClick={button.action}>
            <Icon name={button.icon}/> {button.text}
          </button>

        </div>
      </div>
    )
  }
})

export default SearchResult
