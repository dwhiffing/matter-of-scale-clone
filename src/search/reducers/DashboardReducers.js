import { reducerCreator } from 'shared/redux/helpers'

export const initialState = {
  recent: null,
  online: null,
  visitors: null,
  activity: null
}

export const loginAndPhoto = (p) => {
  return {
    login: p.login,
    url: /\/(photo|images).+/.exec(p.medium_photo_url)[0]
  }
}

const DashboardReducers = {

  fetchDashboardResults(state, action) {
    const recent = action.payload.new || []
    const online = action.payload.online || []

    return Object.assign({}, state, {
      recent: recent.slice(0,6).map(loginAndPhoto),
      online: online.slice(0,6).map(loginAndPhoto)
    })
  },

  fetchDashboardVisitors(state, action) {
    const visitors = action.payload.profiles || []

    return Object.assign({}, state, {
      visitors: visitors.slice(0,6).map(loginAndPhoto)
    })
  },

  fetchDashboardActivity(state, action) {
    const activity = action.payload.activity || []

    return Object.assign({}, state, {
      activity: activity
    })
  }

}

export default reducerCreator(DashboardReducers, initialState)
