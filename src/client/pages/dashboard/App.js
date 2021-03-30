import React, { useContext } from 'react'
import styled from 'styled-components'

import GlobalStyle from '../../components/Utility/GlobalStyle'
import AuthProvider from '../../components/Providers/AuthProvider'
import UserNav from '../../components/UserNav'
import { AppBase, AppWrapper } from '../../components/Layout'
import OptionsMenu from '../../components/UserNav/OptionsMenu'
import FavoriteGames from '../../components/FavoriteGames'


const DashboardWrapper = styled(AppWrapper)`
	display: flex;
	flex-direction: column;
	a {
		color: #fff;
	}
	@media only screen and (min-width: 480px) {
		flex-direction: row;
	}
`

const ContentWrapper = styled.div`
	flex: 1 1;
	@media only screen and (min-width: 480px) {
		padding: 5vw 0 0 5vw;
	}
	@media only screen and (min-width: 1650px) {
		padding: 100px 0 0 100px;
	}
`

const Main = () => {
	return (
		<>
			<AppBase>
				<UserNav />
				<DashboardWrapper>
					<OptionsMenu />
					<ContentWrapper>
						<FavoriteGames />
						<a href="/game">Join Tic Tac Toe Game</a>
					</ContentWrapper>
				</DashboardWrapper>
			</AppBase>
		</>
	)
}

const App = () => {
	return (
		<AuthProvider>
			<GlobalStyle />
			<Main />
		</AuthProvider>
	)
}

export const pageConfig = {
	app: App,
	title: 'Gaming Space Dashboard',
	entry: 'dashboard',
	description: 'Gaming Space dashboard description',
}

export default App
