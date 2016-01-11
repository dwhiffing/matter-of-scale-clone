import CurrentProfileActions from 'profiles/actions/CurrentProfileActions'
import FavoriteActions from 'profiles/actions/FavoriteActions'
import BlockActions from 'profiles/actions/BlockActions'
import PrivateAccessActions from 'profiles/actions/PrivateAccessActions'
import InboxActions from 'inbox/actions/InboxActions'
import PackageActions from 'packages/actions/PackageActions'
import store from 'shared/redux/store'
import request, {CURRENT_ENV} from 'shared/utils/APIUtils'
import CookieManager from 'shared/utils/CookieManager'
import { changeRoute } from 'shared/utils/History'

const SessionActions = {

  bootSessionFromCookie /* istanbul ignore next: this should be rewritten */ () {
    const bpi_user = CookieManager.getJuntoCookie()
    const isDev = CURRENT_ENV() === 'DEV'

    if (!bpi_user) {
      console.error("bpi_user cookie is invalid or missing -- redirecting to users/logout")
      if (!isDev) {
        changeRoute('users/logout')
      }
    } else {
      request.brunel.post(`/login`).send({bpi_user}).then(res => {
        const {login, access_token} = res.body
        if (access_token) {
          // TODO: should implement redux-simple-router and follow advice on fetching data there
          // https://github.com/rackt/redux-simple-router

          store.dispatch({type: 'SET_TOKEN', payload: access_token})

          store.dispatch(CurrentProfileActions.fetchCurrentProfile(login))
          store.dispatch(InboxActions.fetchUnreadCount())
          store.dispatch(CurrentProfileActions.fetchFreeMessages(login))

          store.dispatch(PackageActions.fetchPackages(login))
          store.dispatch(InboxActions.fetchGiftList())
        } else {
          console.error("no access token received -- redirecting to users/logout")
          if (!isDev) {
            changeRoute('users/logout')
          }
        }
      }).error(res=>{
        console.error("invalid user -- redirecting to users/logout")
        if (!isDev) {
          changeRoute('users/logout')
        }
      })
    }
  }
}

export default SessionActions
