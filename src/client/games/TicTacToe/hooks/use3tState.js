import useComplexState from '../../../hooks/useComplexState'

export const SOCKET_STATES = {
  DEFAULT: 'default',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
}

const INITIAL_STATE = {
  status: SOCKET_STATES.DEFAULT,
}

const use3tState = () => {
  const { state, setState } = useComplexState(INITIAL_STATE)
  const initHandlers = socket => {
    console.log('initializing socket handlers:', { socket })
    socket.on('move-update', data => {
      console.log('move-update:', data)
    })
  }

  return {
    state,
    setState,
    initHandlers,
  }
}

export default use3tState
