export const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_PROD_API_KEY,
  authDomain: process.env.FIREBASE_APP_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_M_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

export const REACT_ROOT = 'root'
export const WS_ROUTE = '/sockets'
export const WS_ENDPOINT = `ws://localhost:3000${WS_ROUTE}`
export const UNAUTHED_REDIRECT_PATH = ''
export const AUTHED_REDIRECT_PATH = '/dashboard'
export const AUTHED_PATHS = ['/dashboard', '/game']

export const GAME_NAMESPACES = {
	TIC_TAC_TOE: 'TicTacToe'
}

export const GAME_TYPES = {
  GAME_TIC_TAC_TOE: 'TIC_TAC_TOE',
}

export const SOCKET_HANDLERS = {
  HANDLER_TIC_TAC_TOE: '/tictactoe',
}

export const SOCKET_STATES = {
  DEFAULT: 'default',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
}

export const GAME_STATES = {
  // before initalized
  DEFAULT: 'default',
  // initalized and awaiting players
  IN_LOBBY: 'in-lobby',
  // loading/awaiting for players to connect
  STARTING: 'starting',
  // game in progress
  IN_PROGRESS: 'in-progress',
  // game ended
  COMPLETE: 'complete',
  // something went wrong...
  ERROR: 'error'
}

export const COMMON_GAME_EVENTS = {
  INITIALIZE: 'initialize',
  START_GAME: 'start-game',
  EDIT_GAME: 'edit-game',
  END_GAME: 'end-game',
  COMPLETE_GAME: 'complete-game',
  RESET_GAME: 'reset-game',
  JOIN_GAME: 'join-game',
  LEAVE_GAME: 'leave-game',
  PLAYERS_UPDATE: 'players-update',
	GAME_STATUS_UPDATE:	'game-status-update',
  // to be used once we have chat
  POST_MESSAGE: 'post-message'
}
