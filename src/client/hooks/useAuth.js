import { useEffect } from 'react'
import firebaseAuth from '../utils/auth/firebaseAuth'
import { useIsClient } from './clientHooks'
import useComplexState from './useComplexState'
import { redirectLocal, isAuthedLocation } from '../utils/common/location'
import {
  UNAUTHED_REDIRECT_PATH,
  AUTHED_REDIRECT_PATH,
} from '../../config/constants'

const { INITIAL, LOADING, LOADED, SUCCESS, ERROR } = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const defaultState = {
  status: LOADING,
  message: 'Logged out.',
  user: null,
}

const useAuth = () => {
  const { state, setState } = useComplexState(defaultState)
  const isClient = useIsClient()
  const setLoginSuccess = user => {
    setState({
      user: {
        displayName: user?.displayName,
        email: user?.email,
        emailVerified: user?.emailVerified,
        isAnonymous: user?.isAnonymous,
        metadata: user?.metadata,
        phoneNumber: user?.phoneNumber,
        photoURL: user?.photoURL,
        providerId: user?.providerId,
        refreshToken: user?.refreshToken,
        tenantId: user?.tenantId,
        userId: user?.uid,
      },
      player: {
        userId: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
      }
    })
    setState({ status: SUCCESS })
  }

  const setLoginError = error => {
    setState({ status: ERROR, message: JSON.stringify(error) })
  }

  const register = async (
    { email, password },
    onSuccess = () => console.log('on register success default'),
    onError = () => null
  ) => {
    const { success, error, user } = await firebaseAuth.registerNewUser(
      email,
      password
    )
    if (success) {
      setLoginSuccess(user)
      onSuccess(user)
    } else {
      setLoginError(error)
      onError(error)
    }
    return success
  }

  const login = async (
    { email, password },
    onSuccess = () => console.log('on login success default'),
    onError = () => null
  ) => {
    setState({ status: LOADING })
    const { success, error, user } = await firebaseAuth.loginUser(
      email,
      password
    )
    if (success) {
      setLoginSuccess(user)
      onSuccess(user)
    } else {
      setLoginError(error)
      onError(error)
    }
    return success
  }

  const persistSession = user => {
    const isAuthedLoc = isAuthedLocation()
    if (user) {
      setState({ status: LOADING })
      /* if location is not a designated authed location, redirect
			we do this check to prevent future rerender-redirect cycles */
      if (!isAuthedLoc) {
        redirectLocal(AUTHED_REDIRECT_PATH)
      }
      setLoginSuccess(user)
    } else {
      if (isAuthedLoc) {
        redirectLocal(UNAUTHED_REDIRECT_PATH)
      }
      setState({ status: INITIAL })
    }
  }

  const logout = async () => {
    setState({ status: LOADING })
    await firebaseAuth.logoutUser()
    setState({ status: INITIAL, message: 'Logged out.', user: null })
  }

  useEffect(() => {
    // initializing our peristence settings now that we're on the browser env
    if (isClient) {
      firebaseAuth.configure(persistSession)
    }
  }, [isClient])

  return {
    initial: state.status === INITIAL,
    loading: state.status === LOADING,
    loaded: state.status === LOADED,
    success: state.status === SUCCESS,
    error: state.status === ERROR,
    isLoggedIn: !!state?.user,
    register,
    login,
    logout,
    ...state,
  }
}

export default useAuth
