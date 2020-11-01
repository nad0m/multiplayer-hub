import { useEffect } from 'react'

import LobbySocket from '../../../utils/sockets/LobbySocket'
import { GAME_TYPES } from '../../../../config/constants'
import useSocket from '../../../hooks/useSocket'
import use3tState, { SOCKET_STATES } from './use3tState'
import { GAME_EVENTS } from '../events'

const { DEFAULT, CONNECTING, CONNECTED } = SOCKET_STATES

const { TILE_SELECTED } = GAME_EVENTS

const baseOptions = {
  gameType: GAME_TYPES.GAME_TIC_TAC_TOE,
}

const use3tSockets = (options = {}) => {
  const { state, onConnect, initAndBindToSocket } = use3tState()

  const socketOptions = {
    ...baseOptions,
    ...options,
    userId: 'player1',
    onConnect,
  }
  const queryOptions = { ...baseOptions }

  const socket = useSocket(LobbySocket, socketOptions, queryOptions)

  useEffect(() => initAndBindToSocket(socket), [socket])

  /* list all game events here data flow should always
	   be upstream never modify local state directly */
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
