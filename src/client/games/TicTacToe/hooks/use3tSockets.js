import { useEffect } from 'react'

import LobbySocket from '../../../utils/sockets/LobbySocket'
import { LOBBY_EVENTS, GAME_TYPES, SOCKET_STATES } from '../../../../config/constants'
import useSocket from '../../../hooks/useSocket'
import use3tState from './use3tState'
import { GAME_EVENTS } from '../events'

const { DEFAULT, CONNECTING, CONNECTED } = SOCKET_STATES

const { JOIN_GAME, PLAYER_MOVE } = GAME_EVENTS

const baseOptions = {
  gameType: GAME_TYPES.GAME_TIC_TAC_TOE,
}

const use3tSockets = ({ user, ...options}) => {
  const { state, onConnect, initAndBindToSocket } = use3tState()

  const socketOptions = {
    ...baseOptions,
		...options,
		user,
    onConnect,
  }
  const queryOptions = { ...baseOptions }

  const socket = useSocket(LobbySocket, socketOptions, queryOptions)

  useEffect(() => initAndBindToSocket(socket), [socket])

  /* list all game events here data flow should always
	   be upstream never modify local state directly */
  const onSelect = position => {
    socket.emitGameEvent(PLAYER_MOVE, position)
	}

	const onJoinGame = user => {
		const { uid: userId, displayName, email } = user
		const player = { userId, displayName, email }
		socket.emitGameEvent(LOBBY_EVENTS.JOIN_GAME, { player })
	}

  return {
    socket,
    state,
    connected: state.socketStatus === CONNECTED,
    connecting: state.socketStatus === CONNECTING,
    disconnected: state.socketStatus === DEFAULT,
    socketStatus: state.socketStatus,
		onSelect,
		onJoinGame,
  }
}

export default use3tSockets
