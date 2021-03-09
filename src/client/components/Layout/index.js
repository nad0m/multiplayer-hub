import React from 'react'
import styled from 'styled-components'


export const AppBase = styled.div`
  display: flex;
  flex-direction: column;
	align-items: center;
  height: 100vh;
  background-color: #332d3b;
	color: #eaeaea;
`

export const AppWrapper = styled.div`
	position: relative;
	width: 100%;
	max-width: 1650px;
	margin: 0 auto;
	padding: 0 10px;
	@media only screen and (min-width: 480px) {
		padding: 0 50px;
	}
`

export const AppContainer = ({ children, ...props }) => (
	<AppBase {...props}>
		<AppWrapper>
			{children}
		</AppWrapper>
	</AppBase>
)
