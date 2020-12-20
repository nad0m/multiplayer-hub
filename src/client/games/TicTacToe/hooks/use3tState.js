import useComplexState from '../../../hooks/useComplexState'
import { GAME_EVENTS } from '../events'
import { LOBBY_EVENTS, SOCKET_STATES, GAME_STATES } from '../../../../config/constants'
import { makeAddEventHandlers } from '../../../utils/sockets/utils'



const { GAME_STATUS_UPDATE, PLAYER_MOVE } = GAME_EVENTS
const { INITIALIZE, PLAYERS_UPDATE } = LOBBY_EVENTS
export const UPDATE_TYPE = {
	GAME_INIT: 'game-init',
	GAME_COMPLETE: 'game-complete',
	GAME_RESET: 'game-reset'
}

const { DEFAULT, CONNECTING, CONNECTED } = SOCKET_STATES

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
	firstPlayer: null,
	turnPlayer: null,
	winnerPlayer: null,
	resetPlayer: null,
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
		[GAME_STATUS_UPDATE]: (data = {}) => {
			const { updateType, player, playerTokens } = data
			if (updateType === UPDATE_TYPE.GAME_INIT) {
				setState({ gameStatus: GAME_STATES.IN_PROGRESS, firstPlayer: player, playerTokens })
				console.log('init game here')
			} else if (updateType === UPDATE_TYPE.GAME_COMPLETE) {
				setState({ gameStatus: GAME_STATES.COMPLETE, winnerPlayer: player })

			} else if (updateType === UPDATE_TYPE.GAME_RESET) {
				setState({ gameStatus: GAME_STATES.COMPLETE, resetPlayer: player })

			} else {
				console.log('UNDEFINED GAME UDPATE:', data)
			}
		},
		[PLAYERS_UPDATE]: (data = {}) => {
			console.log('player-update', data)
		},
    [PLAYER_MOVE]: (data = {}) => {
      const { index, value, player, turnPlayer, mapUpdate } = data
      if (mapUpdate) {
        setState({ blocks: [...mapUpdate], turnPlayer })
      }
      console.log(`upstream tile selected:`, data)
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
