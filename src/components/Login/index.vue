<template>
  <b-container>
    <b-form @submit="auth">
      <b-row align-h="center" class="mb-2">
        <b-col cols="4" align="left">
          <label class="pb-2">
            Login:
            <b-form-input type="text" :value="name" :state="login" @input.native="hInput($event, 'name', 'login')" />
            <b-form-invalid-feedback> Поле обязательно для заполнения</b-form-invalid-feedback>
          </label>
        </b-col>
      </b-row>
      <b-row align-h="center" class="mb-2">
        <b-col cols="4" align="left">
          <label class="pb-2">
            Password:
            <b-form-input type="password" :value="pass" :state="password" @input.native="hInput($event, 'pass', 'password')" />
            <b-form-invalid-feedback> Поле обязательно для заполнения</b-form-invalid-feedback>
          </label>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="4" align="center">
          <b-button type="submit" variant="primary" class="w-100"> Login </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data: () => ({
    name: '',
    login: null,
    pass: '',
    password: null
  }),
  methods: {
    ...mapActions([
      'loginAuth'
    ]),
    hInput (e, inputVal, state) {
      this[inputVal] = e.target.value
      this[state] = null
    },
    async auth (e) {
      e.preventDefault()
      const { data, status } = await this.loginAuth({ login: this.name, password: this.pass })
      const { errors } = data
      if (data.data) {
        const token = data.data.access_token
        const expiredAt = data.data.expires_at
        localStorage.setItem('jwt', token)
        localStorage.setItem('expiredAt', expiredAt)
      } else if (errors) {
        console.warn('...Catched, server status', status)
        errors.forEach(item => {
          this[item.source] = false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
