import React from 'react'
import Icon from 'shared/views/interface/Icon'
import Utils from 'profiles/utils/ProfileUtils'
import ActivityLineItem from 'search/views/components/ActivityLineItem'
import { changeRoute } from 'shared/utils/History'
import { WideHeading, Header, LoadingScreen } from 'shared/views/interface'

import DashboardActions from 'search/actions/DashboardActions'
import FilterActions from 'search/actions/FilterActions'
import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'

import 'search/views/styles/dashboard.scss'

const stateToConnect = mapState(['dashboard'])
const actionsToConnect = mapActions([DashboardActions, FilterActions])

const DashboardHandler = React.createClass({

  componentWillMount() {
    let {recent, online, visitors, activity} = this.props.dashboard
    if (recent === null || online === null) {
      this.props.fetchDashboardResults()
    }
    if (visitors === null) {
      this.props.fetchDashboardVisitors()
    }
    if (activity === null) {
      this.props.fetchDashboardActivity()
    }
  },

  headerAccessory() {
    const profile = this.props.currentProfile
    if (profile.gender === 'male' && !profile.subscriber) {
      return (
        <span onClick={() => {
          changeRoute(`profiles/${this.props.currentProfile.login}/subscriptions/new`)
        }}>
          Upgrade
        </span>
      )
    }
  },

  render() {
    let {login, gender, subscriber} = this.props.currentProfile
    let results = this.props.dashboard
    let activity = this.props.dashboard.activity
    let resultJSX = {}, classNames = {}

    const activityMap = (activity, index) => {
      return <ActivityLineItem key={`activity-${index}`} activity={activity} current={login} />
    }

    const resultMap = (data, i) => {
      let click = () => changeRoute(`/profiles/${data.login}`)
      return (
        <div key={`r-${i}`} className='col-4' onClick={click}>
          <img src={data.url} />
        </div>
      )
    }

    const DashSection = ({type, heading, onClick, linkTo, mapFunction, className}) => {
      if (results[type] === null) {
        return (
          <div>
            <WideHeading>
              {heading}
            </WideHeading>
            <LoadingScreen className="my3" noHeader fillParent small />
          </div>
        )
      } else if (results[type] && results[type].length) {
        return (
          <div>
            <WideHeading onClick={onClick} linkTo={linkTo}>
              {heading}
            </WideHeading>
            <div className={className || "photo row middle gray-60"}>
              {results[type].map(mapFunction || resultMap)}
            </div>
          </div>
        )
      } else {
        return <div/>
      }
    }
    return (
      <div>
        <Header rightAccessory={this.headerAccessory()} />

        <section className="bg-white dashboard-handler">
          {/profile_default/.test(this.props.currentProfile.extension.profile_photo_url) &&
            <button className="rect" onClick={() => changeRoute('/profiles/edit/photos')}>
              Add Photo
            </button>
          }
          <DashSection type='visitors' heading='Viewed me' linkTo={`profiles/${this.props.currentProfile.login}/visitors`}/>

          <DashSection type='recent' heading={`New ${Utils.genderTerm()}`}
            linkTo='/search'
            onClick={() => {
              this.props.changeFilter({sortBy: 'created_at'})
            }}/>

          <DashSection type='online' heading='Recently Online'
            linkTo='/search'
            onClick={() => {
              this.props.changeFilter({sortBy: 'last_active_at'})
            }}/>

          <DashSection type='activity' heading='Recent Activity' mapFunction={activityMap} className=" "/>

        </section>
      </div>
    )
  }
})

export default connect(stateToConnect, actionsToConnect)(DashboardHandler)
