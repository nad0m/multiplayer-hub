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
	${({ disabled }) => disabled && `
		* {
			pointer-events: none;
		}
	`}
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

const GameMap = ({ blocks = defaultBlocks, userId = null, disabled = false, onSelect }) => (
  <BlockGrid disabled={disabled}>
    {blocks.map((value, index) => (
      <Block
        key={`block-${index}`}
        value={value}
        onClick={() => onSelect({ userId, index })}
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
			playerTokens,
			turnPlayerId = null,
			resetPlayerId = null,
			winnerId = null,
			winnerData = null
		} = {},
    connected,
    // connecting,
    // disconnected,
		onSelect,
		joinGame,
		resetGame,
	} = use3tSockets({
		user,
		lobbyHash: 'local-game'
	})

	useEffect(() => {
		if (connected) joinGame()
	}, [connected])

	const mapDisabled = (!!turnPlayerId && user?.uid !== turnPlayerId) || !!winnerId

  return (
    <div>
			game status: {gameStatus}
			<br></br>
			map disabled: {`${mapDisabled}`}
			<br></br>
			<button onClick={resetGame}>Reset Game</button>
			{winnerId && <div>{JSON.stringify(winnerData)}</div>}
      {!connected ? (
        'connecting to server...'
      ) : (
				<GameMap
					userId={user?.id}
					blocks={blocks}
					onSelect={onSelect}
					disabled={mapDisabled}
				/>
      )}
    </div>
  )
}

export default TicTacToe
