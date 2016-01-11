export default {
  isLocalStorageAvailable() {
    /* istanbul ignore next: hard to test this properly */
    try {
      let mod = '_localStorageCheck'
      localStorage.setItem(mod, 1)
      let result = (localStorage.getItem(mod) == 1)
      localStorage.removeItem(mod)
      return result
    } catch (e) {
      return false
    }
  },
  getSaved(key, _storage) {
    if (_storage /* istanbul ignore next */ || this.isLocalStorageAvailable() && _storage !== null) {
      _storage = _storage /* istanbul ignore next */ || localStorage
      if (_storage && _storage[key]) {
        return JSON.parse(_storage[key])
      } else {
        return null
      }
    } else if (typeof window !== 'undefined' && window[key]) {
      return window[key]
    } else {
      return null
    }
  },
  save(key, value, _storage) {
    if (_storage /* istanbul ignore next */ || this.isLocalStorageAvailable() && _storage !== null) {
      _storage = _storage /* istanbul ignore next */ || localStorage
      _storage[key] = JSON.stringify(value)
      /* istanbul ignore else: hard to test missing window */
    } else if (typeof window !== 'undefined') {
      window[key] = value
    } else {
      return null
    }
  }
}
