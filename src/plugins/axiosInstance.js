import axios from 'axios'
import Vue from 'vue'

const config = {
  baseURL: 'https://pre.ugoloc.ucann.ru'
}
const _instance = axios.create(config)

_instance.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt')
  if (token) {
    config.headers.common['Authorization'] = `Bearer ${token}`
  }
  return config
}, err => Promise.reject(err))
_instance.interceptors.response.use(response => response, err => {
  const response = err.response
  if (response) {
    switch (response.status) {
      case 401:
      case 403:
        localStorage.removeItem('jwt')
        localStorage.removeItem('expiredAt')
        break
    }
    return response
  }
  return Promise.reject(err)
})

Plugin.install = function (Vue) {
  Vue.$http = _instance
  Object.defineProperty(Vue.prototype, '$http', {
    get () { return _instance }
  })
}

Vue.use(Plugin)
export default Plugin
