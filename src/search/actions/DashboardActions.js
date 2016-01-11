import request from 'shared/utils/APIUtils'
import { actionCreator } from 'shared/redux/helpers'
import store from 'shared/redux/store'

const DashboardActions = {

  fetchDashboardResults(){
    return request.junto_api
      .get('/dashboard_results')
  },

  fetchDashboardVisitors(login){
    const current = login /* istanbul ignore next */ || store.getState().currentProfile.login
    return request.junto_api
      .get(`/profiles/${current}/visitors`)
  },

  fetchDashboardActivity(login){
    const current = login /* istanbul ignore next */ || store.getState().currentProfile.login
    return request.brunel
      .get(`/profiles/${current}/activity`)
  }

}

export default actionCreator(DashboardActions)
