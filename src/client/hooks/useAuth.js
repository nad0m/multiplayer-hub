import { useContext } from 'react'
import { AuthContext } from '../components/Providers/AuthProvider'

/**
 * returns the auth context
 */
const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth