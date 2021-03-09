import React from 'react'
import styled from 'styled-components'


const OptionsWrapper = styled.div`
	margin: 10px 0;
	overflow: hidden;
	background: #00000050;
	height: 40px;
	@media only screen and (min-width: 480px) {
		margin: 30px 0 0;
		height: unset;
		width: 50px;
	}
`


const OptionsMenu = props => {
	return (
		<OptionsWrapper>
			these are options
		</OptionsWrapper>
	)
}

export default OptionsMenu
