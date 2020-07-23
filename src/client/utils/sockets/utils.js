import { SOCKET_HANDLERS, GAME_TYPES } from '../../../config/constants'

const { GAME_TIC_TAC_TOE } = GAME_TYPES

const { HANLER_TIC_TAC_TOE } = SOCKET_HANDLERS

export const getHandlerPrefix = gameType => {
  switch (gameType) {
    case GAME_TIC_TAC_TOE:
      return HANLER_TIC_TAC_TOE
    default:
      return '/'
  }
}
