import React from 'react'
import styled from 'styled-components'
import FlipLoader from './FlipLoader'


const LoaderContainer = styled.div`
	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #332d3b;
  color: #eaeaea;
`

const LoadingPage = () => (
	<LoaderContainer>
		<FlipLoader />
	</LoaderContainer>
)

export default LoadingPage
