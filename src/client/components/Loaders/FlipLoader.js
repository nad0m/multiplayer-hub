import styled, { keyframes } from 'styled-components'

const flip = keyframes`
  0%   { transform: translate(0, 0)       rotateX(0)       rotateY(0);      }
  25%  { transform: translate(100%, 0)    rotateX(0)       rotateY(180deg); }
  50%  { transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg); }
  75%  { transform: translate(0, 100%)    rotateX(-180deg) rotateY(360deg); }
  100% { transform: translate(0, 0)       rotateX(0)       rotateY(360deg); }
`

const glow = keyframes`
	to { background: white; box-shadow: 0 0 15px white; }
`

export const FlipLoader = styled.div`
  width: 64px;
  height: 64px;
  &::before {
    content: '';
    display: block;
    width: 50%;
    height: 50%;
    background: rgba(150, 150, 150, 0.5);
    animation: ${flip} 1s 0s infinite ease normal,
      ${glow} 1s 0s infinite linear normal;
  }
`

export default FlipLoader
