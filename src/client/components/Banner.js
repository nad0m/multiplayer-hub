import React from 'react'
import styled from 'styled-components'

import { breakpoint } from 'styled-components-breakpoint'
import { Game } from '@styled-icons/crypto/Game'

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  clip-path: circle(78% at 16% 28%);
  background-image: linear-gradient(to top right, #008051, #00ffa2);
  display: none;
  color: white;
  flex-direction: column;

  ${breakpoint('xl')`
    display: flex;
  `}
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 250px 250px;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.span`
  margin: 0 10px;
  font-size: 1.5em;
  font-weight: bold;
`

const Subtitle = styled.span`
  margin: 50px 0px;
  font-size: 2em;
  font-weight: bold;
  width: 300px;
`

const Banner = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <TitleWrapper>
          <Game size="36" />
          <Title>Gaming Space</Title>
        </TitleWrapper>
        <Subtitle>Welcome to the multiplayer hub!</Subtitle>
      </ContentWrapper>
    </Wrapper>
  )
}

export default Banner
