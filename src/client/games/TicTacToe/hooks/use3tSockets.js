import { useEffect } from 'react'

import LobbySocket from '../../../utils/sockets/LobbySocket'
import { GAME_TYPES } from '../../../../config/constants'
import useSocket from '../../../hooks/useSocket'
import use3tState, { SOCKET_STATES } from './use3tState'
import { GAME_EVENTS } from '../events'

const { DEFAULT, CONNECTING, CONNECTED } = SOCKET_STATES

const { TILE_SELECTED } = GAME_EVENTS

const use3tSockets = (options = {}) => {
  const { state, setState, initHandlers } = use3tState()

  const onConnect = () => {
    console.log('%cconnected from use3t', 'color: lightgreen')
    setState({ status: CONNECTED })
  }

  const socketOptions = {
    ...options,
    gameType: GAME_TYPES.GAME_TIC_TAC_TOE,
    userId: 'player1',
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
      state.status === DEFAULT &&
      socket
    ) {
      socket.connect()
      initHandlers(socket)
      setState({ status: CONNECTING })
    }
  }, [socket])

  // declare all useable game event methods here
  const onSelect = position => {
    console.log('emiting', position)
    socket.emitGameEvent(TILE_SELECTED, position)
  }

  return {
    socket,
    state,
    connected: state.status === CONNECTED,
    connecting: state.status === CONNECTING,
    disconnected: state.status === DEFAULT,
    status: state.status,
    onSelect,
  }
}

export default use3tSockets
