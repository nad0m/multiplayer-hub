import BaseSocket from './BaseSocket'
import { getHandlerPrefix } from './utils'

/**
 * A BaseSocket abstraction used for implementing connections to game lobbies
 */
class LobbySocket extends BaseSocket {
  /**
   *
   * @param {Object} options extends BaseSocket options
   * @param {String} gameType
   */
  constructor(options) {
    super(options)

    // assigned game type
    this.gameType = options.gameType
    // our event type prefix (how we identify route our socket events)
    this.handlerPrefix = getHandlerPrefix(options.gameType)
    // we override the existing emit method for our emit with handler method
    this.emit = this.emitWithHandler.bind(this)
  }

  emitWithHandler(eventType, ...args) {
    const handlerEvent = `${this.handlerPrefix}${eventType}`
    return super._socket?.emit?.(handlerEvent, ...args)
  }
}

export default LobbySocket
