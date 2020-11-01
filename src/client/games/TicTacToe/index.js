import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import use3tSockets from './hooks/use3tSockets'
import useAuth from '../../hooks/useAuth'

const BlockGrid = styled.ul`
  display: grid;
  padding: 0;
  margin: 0;
  height: 30vh;
  width: 30vh;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  border: 4px solid #000;
`
const Block = styled.li`
  position: relative;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #000;
  cursor: pointer;
  background-color: lightgoldenrodyellow;
  color: #000;
  font-size: 6vh;
  user-select: none;

  &:hover {
    filter: brightness(0.95);
  }

  &:active,
  &:focus,
  &:focus:active {
    filter: brightness(0.9);
  }

  ${({ value }) =>
    !!value &&
    `
		filter: none;
		cursor: initial;
		pointer-events: none;
	`}

  /* positioned absolute so it doesn't affect the grid auto setting */
	> span {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`

const defaultBlocks = new Array(9).fill(undefined)

const GameMap = ({ blocks = defaultBlocks, onSelect }) => (
  <BlockGrid>
    {blocks.map((value, index) => (
      <Block
        key={`block=${index}`}
        value={value}
        onClick={() => onSelect({ index })}
      >
        <span>{value}</span>
      </Block>
    ))}
  </BlockGrid>
)
GameMap.propTypes = {
  blocks: PropTypes.array,
  onSelect: PropTypes.func,
}

const TicTacToe = () => {
	const { user } = useAuth()
  const {
    state: {
			gameStatus,
			blocks,
			playerTokens
		} = {},
    // socket,
    // socketStatus,
    connected,
    // connecting,
    // disconnected,
		onSelect,
		onJoinGame,
	} = use3tSockets({ user })

	useEffect(() => {
		if (connected) {
			console.log('joining game')
			onJoinGame(user)
		}
	}, [connected])
  return (
    <div>
			{gameStatus}
      {!connected ? (
        'connecting to server...'
      ) : (
        <GameMap blocks={blocks} onSelect={onSelect} />
      )}
    </div>
  )
}

export default TicTacToe
