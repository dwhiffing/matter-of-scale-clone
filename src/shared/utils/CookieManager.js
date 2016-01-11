import { API_COOKIE } from 'shared/utils/APIUtils'

export default {
  
  get(name){
    const matched = document.cookie.match(RegExp(`${name}=.[^;]*`))
    return matched ? matched[0].split('=')[1] : null
  },

  set(name, val){
    document.cookie = `${name}=${val};`
  },
  
  del(name){
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  },

  getJuntoCookie() {
    return this.get(API_COOKIE())
  }

}