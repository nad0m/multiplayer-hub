import React, { useContext } from 'react'
import styled from 'styled-components'
import UserBadge from './UserBadge'
import { GameScore } from '../Icons'
import AuthProvider, { AuthContext } from '../Providers/AuthProvider'
import { AppWrapper } from '../Layout'


const UserNavWrapper = styled.div`
	position: relative;
	width: 100%;
	&::before {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: -50px;
  	background: linear-gradient(180deg, #00000090, transparent);
		content: '';
	}
`

const UserNavContentWrapper = styled(AppWrapper)`
	position: relative;
	display: flex;
	flex-direction: row;
	> div {
		margin-top: 10px;
		margin-bottom: 10px;
		display: inline-block;
		vertical-align: middle;
	}
	@media only screen and (min-width: 480px) {
		padding-top: 50px;
	}
`

const UserDetailWrapper = styled.div`
	flex: 1 1;
	margin-left: 10px;
	color: #ffffff;
	user-select: none;
	@media only screen and (min-width: 480px) {
		margin-left: 20px;
	}
`

const UserName = styled.p`
	font-weight: 600;
	margin: 4px 0 0 0;
`

const Score = styled.div`
	margin-top: 4px;
	> p,
	> figure {
		margin: 0 10px 0 0;
		display: inline-block;
	}
`

const AuthBtn = styled.button`
	flex: 0;
	color: #ffffff;
	border: none;
	padding: 0 10px;
	background-color: #00000000;
	font-weight: 600;
	@media only screen and (min-width: 480px) {
		padding: 0 30px;
	}
`

const UserDetail = ({ userName = 'Valdez8Corn96', score = 351 }) => (
	<UserDetailWrapper>
		<UserName>{userName}</UserName>
		<Score><GameScore /><p>{score}</p></Score>
	</UserDetailWrapper>
)

const LogOutBtn = ({ loading = false, isLoggedIn = false, onLogout }) => {
	if (loading) return 'loading'
	return isLoggedIn && (
		<AuthBtn onClick={onLogout}>Logout</AuthBtn>
	)
}

const Main = () => {
	const { user = {}, loading = false, isLoggedIn = false, logout } = useContext(AuthContext)
	return (
		<UserNavWrapper>
			<UserNavContentWrapper>
				<UserBadge defaultStr={user.email[0]} />
				<UserDetail userName={user.email} />
				<LogOutBtn loading={loading} isLoggedIn={isLoggedIn} onLogout={logout} />
			</UserNavContentWrapper>
		</UserNavWrapper>
	)
}

const UserNav = () => {
	return (
		<AuthProvider>
			<Main />
		</AuthProvider>
	)
}

export default UserNav
