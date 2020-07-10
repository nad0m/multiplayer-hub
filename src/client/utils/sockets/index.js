import io from 'socket.io-client'

const { defaultOnConnect, defaultOnEvent, defaultOnDisconnect } = {
  defaultOnConnect: socket => data =>
    console.log('on connect', socket, { data }),
  defaultOnEvent: socket => data => console.log('on event', socket, { data }),
  defaultOnDisconnect: socket => data =>
    console.log('on disconnect', socket, { data }),
}

/**
 * Generates a basic websocket using socket.io
 * @param {Object} [options]
 * @param {Function} [options.onConnect]
 * @param {Function} [options.onEvent]
 * @param {Function} [options.onDisconnect]
 */
export const makeLobbySocket = ({
  onConnect = defaultOnConnect,
  onEvent = defaultOnEvent,
  onDisconnect = defaultOnDisconnect,
}) => {
  const socket = io.connect('http://localhost:8080', { path: '/sockets' })

  socket.on('connect', onConnect(socket))
  socket.on('event', onEvent(socket))
  socket.on('disconnect', onDisconnect(socket))

  return socket
}
