import { useContext } from 'react'
import { AuthContext } from '../components/Providers/AuthProvider'

/**
 * returns the auth context
 */
const useAuthContext = () => {
  return useContext(AuthContext)
}

export default useAuthContext