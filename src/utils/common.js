import { Dimensions, Platform } from 'react-native'
import { store } from './store'

const ios = Platform.OS === 'ios'

const common = {
  API: {
    URL: 'https://api.nytimes.com/svc',
    API_KEY: '95ac032aee02495e89b21009b3ce3f15'
  },

  ENDPOINT: {
    TOP_STORIES: '/topstories/v2/home.json'
  },

  fetcher(url, options, success, error) {
    const API = common.API
    const get = options.method === 'GET'
    if (get) {
      options.body = 'api-key=' + common.API.API_KEY
    }

    const opts = Object.assign({ credentials: 'same-origin' }, !get ? {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    } : {}, options)

    console.log('opts', opts)

    fetch(API.URL + url, opts)
      .then((response) => response.json())
        .then((json) => {
          const { status } = json
          console.log('status', status)
          if (status.code === 200) {
            if(typeof (success) === 'function') {
              success(json)
            }
          } else {
            if (typeof (error) === 'function') {
              error(json)
            }
            console.log('ERROR', url, options, json)
          }
        })
  },

  isObjectExist(obj) {
    return obj && Object.getOwnPropertyNames(obj).length > 0
  },

  isIphoneX() {
    let d = Dimensions.get('window')
    const { height, width } = d

    return (ios && (height === 812 || width === 812))
  },

  debounce(fn, delay, ...arg) {
    let timer = null
    return function () {
      const context = this
      const args = arg

      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay || 800)
    }
  }
}

module.exports = common
