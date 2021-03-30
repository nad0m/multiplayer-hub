import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'

import ModalRoot from './ModalRoot'
import { GAME_NAMESPACES } from '../../../config/constants'


const ModalWrapper = styled.div`
	height: 300px;
	width: 600px;
	max-width: 100%;
	background-color: lightgreen;
`

const JoinGameModal = props => {
	const routeMatch = useRouteMatch('/dashboard/:namespace')
	const show = routeMatch?.params?.namespace === GAME_NAMESPACES.TIC_TAC_TOE

	return (
		<Link to='/dashboard'>
			<ModalRoot show={show} autoClose>
				<ModalWrapper>
					Hello there
				</ModalWrapper>
			</ModalRoot>
		</Link>
	)
}

export default JoinGameModal
