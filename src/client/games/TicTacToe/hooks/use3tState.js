import useComplexState from '../../../hooks/useComplexState'
import { COMMON_GAME_EVENTS, GAME_STATES, SOCKET_STATES } from '../../../../config/constants'
import { makeAddEventHandlers } from '../../../utils/sockets/utils'


export const GAME_EVENTS = {
	PLAYER_MOVE: 'player-move',
	GAME_STATUS_UPDATE:	'game-status-update',
}
export const UPDATE_TYPE = {
	GAME_INIT: 'game-init',
	GAME_COMPLETE: 'game-complete',
	GAME_RESET: 'game-reset'
}

const { DEFAULT, CONNECTING, CONNECTED } = SOCKET_STATES
const { GAME_STATUS_UPDATE, PLAYER_MOVE } = GAME_EVENTS
const { INITIALIZE, COMPLETE_GAME, RESET_GAME, PLAYERS_UPDATE } = COMMON_GAME_EVENTS

/**
 * the game will expect blocks 0-8 (9 blocks) to be 'x', 'o' or non existent:
 * ```
 * [
 *   2: 'x',
 *   6: 'o',
 *   ...etc
 * ]
 * ```
 */
const INITIAL_STATE = {
	blocks: new Array(9).fill(undefined),
	socketStatus: DEFAULT,
	gameStatus: GAME_STATES.DEFAULT,
	winnerData: null,
	turnPlayerId: null,
	winnerId: null,
	resetPlayerId: null,
	playerTokens: {}
}

/**
 * Handles custom game state. This should theoretically work similar
 * to a state + reducer tuple, but it would be repetitive/verbose to
 * assign curried functions to the `socket.on` handlers.
 */
const use3tState = () => {
	const { state, setState } = useComplexState(INITIAL_STATE)

	const handlers = {
		[INITIALIZE]: (data = {}) => {
			const { playerTokens, mapUpdate, resetPlayerId = null } = data
			setState({
				gameStatus: GAME_STATES.IN_PROGRESS,
				blocks: [...mapUpdate],
				playerTokens,
				resetPlayerId,
				winnerId: null,
				winnerData: null
			})
			console.log('init game here', data)
		},
		[COMPLETE_GAME]: (data = {}) => {
			const { winnerId, winnerData } = data
			setState({
				gameStatus: GAME_STATES.COMPLETE,
				winnerData,
				winnerId
			})
		},
		[GAME_STATUS_UPDATE]: (data = {}) => {
			const { mapUpdate, nextPlayerId, winnerId } = data
			setState({
				gameStatus: winnerId ? GAME_STATES.COMPLETE : GAME_STATES.IN_PROGRESS,
				blocks: [...mapUpdate],
				turnPlayerId: nextPlayerId,
				winnerId
			})
		},
		[PLAYERS_UPDATE]: (data = {}) => {
			console.log('player-update', data)
		},
		[PLAYER_MOVE]: (data = {}) => {
			const { nextPlayerId, mapUpdate } = data
			if (mapUpdate) {
				setState({
					gameStatus: GAME_STATES.IN_PROGRESS,
					blocks: [...mapUpdate],
					turnPlayerId: nextPlayerId
				})
			}
		}
	}

	// we will bind all event handlers here (subscriptions)
	const onConnect = () => setState({ socketStatus: CONNECTED })
	const initHandlers = makeAddEventHandlers(handlers)
	const initAndBindToSocket = socket => {
		if (
			typeof window !== 'undefined' &&
			window?.WebSocket &&
			state.socketStatus === DEFAULT &&
			!!socket
		) {
			socket.connect()
			initHandlers(socket)
			socket.emitGameEvent(INITIALIZE)
			setState({ socketStatus: CONNECTING })
		}
	}

	return {
		state,
		onConnect,
		initHandlers,
		initAndBindToSocket,
	}
}

export default use3tState
