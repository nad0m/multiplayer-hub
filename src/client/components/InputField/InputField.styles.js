import styled from 'styled-components'

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  height: 30px;
  padding: 5px 20px;
  border-radius: 20px;
  background-color: #f3f6fb;
  -webkit-box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 1);
  box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 1);
`

export const Input = styled.input`
  width: 100%;
  margin: 0 0 0 10px;
  font-weight: bold;
  background-color: inherit;
  border: none;
  outline: none;

  &::placeholder {
    color: #c5c8cf;
  }
`
