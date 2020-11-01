import useComplexState from '../../../hooks/useComplexState'
import { GAME_EVENTS } from '../events'
import { makeAddEventHandlers } from '../../../utils/sockets/utils'

const { TILE_SELECTED } = GAME_EVENTS

export const SOCKET_STATES = {
  DEFAULT: 'default',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
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
  status: DEFAULT,
  blocks: new Array(9).fill(undefined),
}

/**
 * Handles custom game state. This should theoretically work similar
 * to a state + reducer tuple, but it would be repetitive/verbose to
 * assign curried functions to the `socket.on` handlers.
 */
const use3tState = () => {
  const { state, setState } = useComplexState(INITIAL_STATE)

  const handlers = {
    [TILE_SELECTED]: (data = {}) => {
      const { index, value } = data
      if (value) {
        setState(staleState => {
          const updatedBlocks = [...staleState.blocks]
          updatedBlocks[index] = value
          return { blocks: updatedBlocks }
        })
      }
      console.log(`upstream tile selected:`, data)
    },
  }

  // we will bind all event handlers here (subscriptions)
  const onConnect = () => setState({ status: CONNECTED })
  const initHandlers = makeAddEventHandlers(handlers)
  const initAndBindToSocket = socket => {
    if (
      typeof window !== 'undefined' &&
      window?.WebSocket &&
      state.status === DEFAULT &&
      !!socket
    ) {
      socket.connect()
      initHandlers(socket)
      setState({ status: CONNECTING })
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
