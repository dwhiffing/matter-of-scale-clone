import React from 'react'
import Icon from 'shared/views/interface/Icon'
import { changeRoute } from 'shared/utils/History'
import { WideHeading, Header } from 'shared/views/interface'
import { SettingRow } from 'shared/views/form'

/**
 * Generates a list of various routes the currentProfile can access
 *
 * @class ProfileSettingsHandler
 **/
const ProfileSettingsHandler = React.createClass({

  headerTitle() {
    return "More"
  },

  render() {
    let current = this.props.currentProfile
    const contacts = [
      {
        label: "Favorites",
        icon: "unfavorite",
        link: `profiles/${current.login}/favorites`
      }, {
        label: "Private Photo Access",
        icon: "lock",
        link: "photo_permissions",
      }, {
        label: "Blocked Profiles",
        icon: "block",
        link: `profiles/${current.login}/blocks`
      }
    ]
    const settings = [
      {
        label: "Payment History",
        icon: "credit-card",
        link: `profiles/${current.login}/subscriptions`
      }, {
        label: "Privacy",
        icon: "access",
        link: `profiles/${current.login}/edit`
      }
    ]
    const support = [
      {
        label: "Privacy Policy",
        icon: "doc-text",
        link: `privacy-policy.html`
      }, {
        label: "Terms and Conditions",
        icon: "doc-text",
        link: `terms-of-service.html`
      }, {
        label: "About",
        icon: "attention-circled",
        link: "/profiles/edit"
      }, {
        label: "Logout",
        icon: "off",
        link: "users/logout"
      }
    ]

    return (
      <div>
        <Header title={this.headerTitle()} />

        <section className='gray-50'>
          <div className='row between middle p3 pointer'
            onClick={() => changeRoute(`/profiles/edit`)}>

            <div className="col-3">
              <img className='circle' src={current.extension.profile_photo_url} />
            </div>

            <div className="col-7">
              <h2 className="gray-40 bold pb2">{current.login}</h2>
              <h4 className="gray-60 bold">VIEW PROFILE</h4>
            </div>

            <Icon name='right-open-fat' />

          </div>

          <WideHeading>
            CONTACTS
          </WideHeading>
          {contacts.map((data, i) => <SettingRow key={`sub-${i}`} {...data} />)}

          <WideHeading>
            SETTINGS
          </WideHeading>
          {settings.map((data, i) => <SettingRow key={`sub-${i}`} {...data} />)}

          <WideHeading>
            SUPPORT
          </WideHeading>
          {support.map((data, i) => <SettingRow key={`sub-${i}`} {...data} />)}

        </section>
      </div>
    )
  }

})

export default ProfileSettingsHandler
