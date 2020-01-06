export function isExpired () {
  let isExpired = true
  const parseExpiredAt = Date.parse(localStorage.getItem('expiredAt'))
  if (parseExpiredAt) {
    const parseCurrentDate = Date.parse(new Date())
    isExpired = parseCurrentDate > parseExpiredAt
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
