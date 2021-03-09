import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const DEFAULT_LAST_PLAYED = {
	name: 'Tic Tac Toe',
	namespace: 'TicTacToe',
	image: null
}

const FlexContainer = styled.div`
	display: flex;
	flex-direction: column;
	@media only screen and (min-width: 480px) {
		flex-direction: row;
	}
`

const LastPlayedWrapper = styled.div`
	position: relative;
	flex: 1 1;
	overflow: hidden;
	> a {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	&::after {
		display: block;
		content: '';
		padding-bottom: 60%;
	}
`

const LastPlayedTextBanner = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	background-color: #373e36;
	> p {
		margin: auto;
		font-size: 34px;
		color: #ffffff;
	}
`

const RecentlyPlayedWrapper = styled.div`
	flex: 1 1;
	background: lightblue;
	margin-top: 10px;
	@media only screen and (min-width: 480px) {
		flex: none;
		width: 20vw;
		max-width: 330px;
		margin-left: 3vw;
		margin-top: 0;
	}
	@media only screen and (min-width: 1650px) {
		margin-left: 50px;
	}
`

const LastPlayedBanner = ({ game = DEFAULT_LAST_PLAYED }) => {
	const { namespace, name, image } = game
	return (
		<LastPlayedWrapper>
			{/* add image logic here when ready */}
			<LastPlayedTextBanner>
				<p>{name}</p>
			</LastPlayedTextBanner>
			<Link to={`/dashboard/${namespace}`} />
		</LastPlayedWrapper>
	)
}

const RecentlyPlayedList = props => {
	return (
		<RecentlyPlayedWrapper>

		</RecentlyPlayedWrapper>
	)
}

const FavoriteGames = props => {
	return (
		<FlexContainer>
			<LastPlayedBanner />
			<RecentlyPlayedList />
		</FlexContainer>
	)
}

export default FavoriteGames
