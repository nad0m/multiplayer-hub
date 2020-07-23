import { useEffect, useState } from 'react'

import LobbySocket from '../../../utils/sockets/LobbySocket'
import { GAME_TYPES } from '../../../../config/constants'
import useSocket from '../../../hooks/useSocket'

const use3tSockets = (options = {}) => {
  const [status, setStatus] = useState('default')
  const onConnect = () => {
    console.log('%cconnected from use3t', 'color: lightgreen')
    setStatus('connected')
  }

  const socketOptions = {
    ...options,
    gameType: GAME_TYPES.GAME_TIC_TAC_TOE,
    onConnect,
  }
  const queryOptions = {
    gameType: GAME_TYPES.GAME_TIC_TAC_TOE,
  }
  const socket = useSocket(LobbySocket, socketOptions, queryOptions)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window?.WebSocket &&
      status === 'default' &&
      socket
    ) {
      socket.connect()
      setStatus('connecting')
    }
  }, [socket])

  const onSelect = position => {
    if (socket?.emit) socket.emit('game-update', position)
  }

  return {
    socket,
    connected: status === 'connected',
    connecting: status === 'connecting',
    disconnected: status === 'default',
    status,
    onSelect,
  }
}

export default use3tSockets
