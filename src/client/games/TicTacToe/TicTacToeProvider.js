import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import useAuth from '../../hooks/useAuth'
import useSocket from '../../hooks/useSocket'
import { useSocketBoundState } from '../../utils/game'
import { LobbySocket } from '../../utils/sockets'
import eventReducer, { initialState } from './eventReducer'
import {
	GAME_TYPES,
	COMMON_GAME_EVENTS,
	SOCKET_STATES
} from '../../../config/constants'


export const TicTacToeContext = createContext()

export const GAME_EVENTS = {
	PLAYER_MOVE: 'player-move',
	GAME_STATUS_UPDATE: 'game-status-update',
}
const { DEFAULT, CONNECTING, CONNECTED } = SOCKET_STATES

const queryOptions = {
	gameType: GAME_TYPES.GAME_TIC_TAC_TOE
}

const TicTacToeProvider = ({ children }) => {
	const { user, player } = useAuth()
	const metaOptions = {
		user,
		lobbyHash: 'local-game', // to be set dynamically in the future
		gameType: GAME_TYPES.GAME_TIC_TAC_TOE
	}
	const socket = useSocket(LobbySocket, metaOptions, queryOptions)
	const [state, dispatch] = useSocketBoundState(
		initialState,
		eventReducer,
		socket
	)

	// list outgoing events here. NEVER mutate local state
	const initGame = () => {
		socket.emitGameEvent(COMMON_GAME_EVENTS.INITIALIZE)
	}
	const onSelect = position => {
		socket.emitGameEvent(GAME_EVENTS.PLAYER_MOVE, position)
	}
	const joinGame = () => {
		socket.emitGameEvent(COMMON_GAME_EVENTS.JOIN_GAME, { player })
	}
	const resetGame = () => {
		socket.emitGameEvent(COMMON_GAME_EVENTS.RESET_GAME, { player })
	}

	return (
		<TicTacToeContext.Provider
			value={{
				socket,
				state,
				connected: state.socketStatus === CONNECTED,
				connecting: state.socketStatus === CONNECTING,
				disconnected: state.socketStatus === DEFAULT,
				socketStatus: state.socketStatus,
				initGame,
				onSelect,
				joinGame,
				resetGame,
			}}
		>
			{children}
		</TicTacToeContext.Provider>
	)
}

export default TicTacToeProvider
