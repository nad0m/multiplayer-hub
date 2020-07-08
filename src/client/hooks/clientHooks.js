import { useRef, useEffect } from 'react'

export const useDidMount = () => {
  const didMount = useRef(false)

  useEffect(() => {
    didMount.current = true
  }, [])
  return didMount.current
}

export const useIsClient = () => {
  return typeof window !== 'undefined'
}
