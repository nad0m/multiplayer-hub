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
  status: SOCKET_STATES.DEFAULT,
  blocks: new Array(9).fill(undefined),
}

/**
 * Handles custom game state. This should theoretically work similar
 * to a state + reducer tuple, but it would be repetitive to assign curried functions
 * to the `socket.on` handlers.
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

  console.log('hook update', state)

  // we will bind all event handlers here
  const initHandlers = makeAddEventHandlers(handlers)

  return {
    state,
    setState,
    initHandlers,
  }
}

export default use3tState
