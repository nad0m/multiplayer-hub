import React, { useEffect } from 'react'
import use3tSockets from './hooks/use3tSockets'

const TicTacToe = () => {
  const {
    socket,
    // status,
    connected,
    // connecting,
    // disconnected,
    onSelect,
  } = use3tSockets()

  useEffect(() => {
    if (socket) console.log('TicTacToe socket: ', socket)
  }, [socket])

  return (
    <div>
      {connected
        ? 'This should render the tic tac toe game'
        : 'connecting to server...'}
      <button onClick={() => onSelect({ x: 5, y: 1 })}>Send an event</button>
    </div>
  )
}

export default TicTacToe
