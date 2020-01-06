export function isExpired () {
  let isExpired = true
  const expiredAt = localStorage.getItem('expiredAt')
  if (expiredAt) {
    const currentDateParse = Date.parse(new Date())
    const expiredAtParse = Date.parse(expiredAt)
    isExpired = currentDateParse > expiredAtParse
  }
  return isExpired
}

export function isAuth (to, from, next) {
  const token = localStorage.getItem('jwt')
  const isExpiredStatus = isExpired()
  if (token && !isExpiredStatus) {
    next('/')
  } else {
    next()
  }
}
