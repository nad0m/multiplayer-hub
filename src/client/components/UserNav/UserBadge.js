import React from 'react'
import styled from 'styled-components'


const PLACE_HOLDER = 'https://hips.hearstapps.com/countryliving.cdnds.net/17/47/1511194376-cavachon-puppy-christmas.jpg'

const BadgeWrapper = styled.div`
	height: 50px;
	width: 50px;
	border-radius: 30px;
	overflow: hidden;
`

const DefaultBadge = styled.p`
	display: inline-block;
	margin: 0;
	height: 50px;
	width: 50px;
	background-color: #ffffff;
	color: #000000;
	text-transform: capitalize;
	text-align: center;
	line-height: 50px;
	font-size: 30px;
	user-select: none;
`

const BadgeImg = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`

const UserBadge = ({ className = '', defaultStr = '', src = '', imgProps = {}, ...rest }) => {
	return (
		<BadgeWrapper className={className} {...rest}>
			{!!src ?
				<BadgeImg src={src || PLACE_HOLDER} {...imgProps} />
				:
				<DefaultBadge>{defaultStr}</DefaultBadge>
			}
		</BadgeWrapper>
	)
}


export default UserBadge
