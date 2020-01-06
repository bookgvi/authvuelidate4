import axios from 'axios'
import Vue from 'vue'

const config = {}
const _instance = axios.create(config)

_instance.interceptors.request.use(config => config, err => Promise.reject(err))
_instance.interceptors.response.use(response => response, err => Promise.reject(err))

Plugin.install = function (Vue) {
  Vue.$http = _instance
  Object.defineProperty(Vue.prototype, '$http', {
    get () { return _instance }
  })
}

Vue.use(Plugin)
export default Plugin
