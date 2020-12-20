import { AUTHED_PATHS } from '../../../config/constants'

export const redirectLocal = path => {
  if (typeof window !== 'undefined') {
    window.location.pathname = path
  }
}

export const getWindowLocation = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname
  }
  return '/'
}

export const isWindowLocation = path => {
  return getWindowLocation() === path
}

export const isAuthedLocation = () => {
  const loc = getWindowLocation()
  for (let i = 0; i < AUTHED_PATHS.length; i++) {
    if (loc === AUTHED_PATHS[i]) return true
  }
  return false
}
