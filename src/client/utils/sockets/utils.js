import { SOCKET_HANDLERS, GAME_TYPES } from '../../../config/constants'

const { GAME_TIC_TAC_TOE } = GAME_TYPES

const { HANDLER_TIC_TAC_TOE } = SOCKET_HANDLERS

export const getHandlerPrefix = gameType => {
  switch (gameType) {
    case GAME_TIC_TAC_TOE:
      return HANDLER_TIC_TAC_TOE
    default:
      return ''
  }
}

/**
 * @param {Object} handlers Should be an object of event: handler key pairs
 *
 * ex:
 * ```
 * const PLAYER_MOVED = 'player-moved'
 *
 * const handlers = {
 * 		PLAYER_MOVED: update => { ...handle update logic }
 * }
 * ```
 */
export const makeAddEventHandlers = handlers => socket => {
  if (!handlers || typeof handlers !== 'object') {
    return console.error('Event handlers must be valid event: function pairs')
  }
  Object.entries(handlers).forEach(([event, handler]) =>
    socket.on(event, handler)
  )
}
