import styled, { keyframes } from 'styled-components'
import { breakpoint } from 'styled-components-breakpoint'

export const Wrapper = styled.div`
  text-align: center;
  padding: 30px;
  background-color: #302938;
  border-radius: 3px;
  -webkit-box-shadow: 0px 30px 40px -25px rgba(0,0,0,0.5);
  -moz-box-shadow: 0px 30px 40px -25px rgba(0,0,0,0.5);
  box-shadow: 0px 30px 40px -25px rgba(0,0,0,0.5);
`

export const Header = styled.h3`
  font-weight: normal;
`

export const OAuthGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;

  ${breakpoint('sm')`
    width: 340px;
  `}
`

export const OAuthButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: .8em;
  background-color: #352e3d;
  border-radius: 3px;
  color: inherit;
  padding: 8px 16px;
  min-width: 120px;
  max-height: 50px;
  outline: none;
  cursor: pointer;
  
  &:hover {
    border: 1px solid #8e80f5;
  }

  > svg {
    margin: 0 5px;
  }

  ${breakpoint('sm')`
    font-size: .9em;
    padding: 15px 20px;
    min-width: 160px;
  `}

`

export const OrLabel = styled.div`
  margin: 20px 0; 
  font-size: .8em;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: inherit;
`

export const Input = styled.input`
  background-color: #352e3d;
  padding: 15px;
  color: inherit;
  border: 1px solid #403847;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  border-radius: 3px;
  margin: 5px 0 20px;
  font-size: 1em;

  &:focus {
    border: 1px solid #8e80f5;
  }
`

export const SubmitButton = styled.input`
  background-color: #8e80f5;
  padding: 15px;
  color: inherit;
  outline: none;
  border: none;
  width: 100%;
  box-sizing: border-box;
  border-radius: 3px;
  margin: 5px 0 15px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    filter: brightness(96%);
  }
`