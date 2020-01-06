import Vue from 'vue'

export const actions = {
  async loginAuth ({ state }, payload) {
    try {
      const res = await Vue.$http.post(state.loginUrl, payload)
      return res
    } catch (err) {
      console.warn('При аутентификации произошла ошибка...')
      return err
    }
  }
}
