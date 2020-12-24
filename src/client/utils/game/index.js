import { useReducer, useEffect } from 'react'

import {
	GAME_STATES,
	SOCKET_STATES
} from '../../../config/constants'

const { DEFAULT, CONNECTING, CONNECTED } = SOCKET_STATES

const baseGameState = {
	socketStatus: DEFAULT,
	gameStatus: GAME_STATES.DEFAULT
}

/**
 * Handles base level updates, like socket connection status updates
 * @param {Object} state  - state object to be manipulated
 * @param {Object} action - action object with `type` and `payload` attributes
 */
const baseGameReducer = (state, action) => {
	switch (action.type) {
		case CONNECTING:
			return Object.assign({}, state, { socketStatus: CONNECTING })
		case 'connect':
			return Object.assign({}, state, { socketStatus: CONNECTED })
		default:
			return state
	}
}

const mergeReducers = (...reducers) => (initialState, action) => {
	const reducedState = reducers.reduce((state, currentReducer) => {
		return currentReducer(state, action)
	}, initialState)
	return reducedState
}

const bindDispatch = (socket, dispatch) => {
	socket.onAny(function dispatchGameEvent(type, payload) {
		dispatch({ type, payload })
	})
}

const initAndBindToSocket = (socket, dispatch, state) => {
	if (
		typeof window !== 'undefined' &&
		window?.WebSocket &&
		state.socketStatus === DEFAULT &&
		!!socket
	) {
		socket.onConnect = () => {
			dispatch({ type: 'connect' })
		}
		socket.connect()
		bindDispatch(socket, dispatch)
		dispatch({ type: CONNECTING })
	}
}

export const useSocketBoundState = (initialGameState, customGameReducer, socket) => {
	const mergedReducer = mergeReducers(baseGameReducer, customGameReducer)
	const mergedInitialState = { ...baseGameState, ...initialGameState }
	const [state, dispatch] = useReducer(mergedReducer, mergedInitialState)
	useEffect(() => initAndBindToSocket(socket, dispatch, state), [socket])
	return [state, dispatch]
}
