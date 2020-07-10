import useBaseSocket from '../useBaseSocket'

const use3tSockets = (options = {}) => {
  // we can use this function to add all of our game event handlers
  const addEventHandlers = socket => {
    socket.on('lobbies-update', data => {
      console.log('on lobbies update:', { data })
      socket.emit('game-update', { gameStatus: !data.gameStatus })
    })
  }
  /**
   * We register the client to the backend here, this is just an example but realistically
   * we'll be sending the game type and the user id, etc so the lobby can look them up and
   * add them to the game session
   */
  const onConnect = socket => data => {
    console.log('we successfully connected!', socket, { data })
    socket.emit('join', '🎶 Hello from the client siiiiiideee!!! 🎶')
    addEventHandlers(socket)
  }

  const socket = useBaseSocket({
    ...options,
    onConnect,
  })

  const onSelect = position => {
    socket.emit('game-update', position)
  }

  return {
    socket,
    onSelect,
  }
}

export default use3tSockets
