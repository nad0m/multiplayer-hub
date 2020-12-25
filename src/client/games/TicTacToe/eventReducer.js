import { COMMON_GAME_EVENTS, GAME_STATES, SOCKET_STATES } from "../../../config/constants"


export const GAME_EVENTS = {
  PLAYER_MOVE: 'player-move',
  GAME_STATUS_UPDATE: 'game-status-update',
}
const { DEFAULT } = SOCKET_STATES
const { GAME_STATUS_UPDATE, PLAYER_MOVE } = GAME_EVENTS
const { INITIALIZE, COMPLETE_GAME } = COMMON_GAME_EVENTS

/** use initial state as a schema as well */
export const initialState = {
  blocks: new Array(9).fill(undefined),
  socketStatus: DEFAULT,
  gameStatus: GAME_STATES.DEFAULT,
  winnerData: null,
  turnPlayerId: null,
  winnerId: null,
  resetPlayerId: null,
  playerTokens: {}
}

function eventReducer(state = initialState, action) {
  const {
    playerTokens,
    mapUpdate,
    nextPlayerId,
    winnerId,
    winnerData,
    resetPlayerId = null } = (action?.payload || {})
  switch (action.type) {
    case INITIALIZE:
      return Object.assign({}, state, {
        gameStatus: GAME_STATES.IN_PROGRESS,
        blocks: [...mapUpdate],
        playerTokens,
        resetPlayerId,
        winnerId: null,
        winnerData: null
      })
    case COMPLETE_GAME:
      return Object.assign({}, state, {
        gameStatus: GAME_STATES.COMPLETE,
        winnerData,
        winnerId
      })
    case GAME_STATUS_UPDATE:
      return Object.assign({}, state, {
        gameStatus: winnerId ? GAME_STATES.COMPLETE : GAME_STATES.IN_PROGRESS,
        blocks: [...mapUpdate],
        turnPlayerId: nextPlayerId,
        winnerId
      })
    case PLAYER_MOVE:
      if (mapUpdate) {
        return Object.assign({}, state, {
          gameStatus: GAME_STATES.IN_PROGRESS,
          blocks: [...mapUpdate],
          turnPlayerId: nextPlayerId
        })
      }
    default:
      return state
  }
}

export default eventReducer
