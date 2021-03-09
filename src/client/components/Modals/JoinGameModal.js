import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import ModalRoot from './ModalRoot'
import { windowLocationMatches } from '../../utils/window/location'


const ModalWrapper = styled.div`
	height: 300px;
	width: 600px;
	max-width: 100%;
	background-color: lightgreen;
`

const JoinGameModal = props => {
	const showGameModal = windowLocationMatches(/\/dashboard\/(.|\s)*\S(.|\s)*/)
	console.log({ showGameModal })

	return (
		<Link to='/dashboard'>
			<ModalRoot show={showGameModal} autoClose>
				<ModalWrapper>
					Hello there
				</ModalWrapper>
			</ModalRoot>
		</Link>
	)
}

export default JoinGameModal
