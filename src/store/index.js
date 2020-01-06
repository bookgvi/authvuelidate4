import Vue from 'vue'
import Vuex from 'vuex'
import { state } from '@/store/state'
import { getters } from '@/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters
})
