import { useRef, useEffect } from 'react'
import { makeLobbySocket } from '../utils/sockets'

const useBaseSocket = options => {
  const socket = useRef(null)

  const initSocket = () => {
    socket.current = makeLobbySocket({ ...options })
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !socket.current && window.WebSocket) {
      initSocket()
    }
  })

  return socket.current
}

export default useBaseSocket
