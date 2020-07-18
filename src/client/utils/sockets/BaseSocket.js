import io from 'socket.io-client'

import { WS_ROUTE } from '../../../config/constants'

// default websocket handlers
const { defaultOnConnect, defaultOnEvent, defaultOnDisconnect } = {
  defaultOnConnect: data => console.log('on connect', { data }),
  defaultOnEvent: data => console.log('on event', { data }),
  defaultOnDisconnect: data => console.log('on disconnect', { data }),
}

/**
 * An abstraction of our socket io socket object that allows for further
 * abstractions such as Lobby Socket and Chat Sockets in the future
 */
class BaseSocket {
  /**
   * @param {Object}   options
   * @param {String} 	 options.hostname
   * @param {Function} [options.onEvent]
   * @param {Function} [options.onConnect]
   * @param {Function} [options.onDisconnect]
   */
  constructor(options = {}) {
    const {
      hostname = 'http://localhost:8080',
      onConnect = defaultOnConnect,
      onEvent = defaultOnEvent,
      onDisconnect = defaultOnDisconnect,
    } = options
    // we need to dynamically assign the ip address
    this.hostname = hostname
    // our socket utility attribute to be used internally
    this._socket = null

    // handlers
    this.emit = null
    this.send = null
    this.on = null

    this.onConnect = onConnect
    this.onEvent = onEvent
    this.onDisconnect = onDisconnect

    // updater methods
    this.connect = this.connect.bind(this)
  }

  connect() {
    const socket = io.connect(this.hostname, { path: WS_ROUTE })

    socket.on('connect', this.onConnect)
    socket.on('event', this.onEvent)
    socket.on('disconnect', this.onDisconnect)

    this._socket = socket
    this.emit = socket.emit
    this.send = socket.send
    this.on = socket.on
    this.connected = socket.connected
    this.disconnected = socket.disconnected

    return socket
  }
}

export default BaseSocket
