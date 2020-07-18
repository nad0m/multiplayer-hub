import React, { useEffect } from 'react'
import use3tSockets from './hooks/use3tSockets'

const TicTacToe = () => {
  const {
    socket,
    // status,
    connected,
    // connecting,
    // disconnected,
    // onSelect
  } = use3tSockets()

  useEffect(() => {
    console.log('component level socket', socket)
  }, [socket])

  return (
    <div>
      {connected
        ? 'This should render the tic tac toe game'
        : 'connecting to server...'}
    </div>
  )
}

export default TicTacToe
