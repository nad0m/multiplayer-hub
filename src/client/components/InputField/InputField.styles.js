import styled from 'styled-components'

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  height: 30px;
  padding: 5px 20px;
  border-radius: 20px;
  background-color: #f3f6fb;
  box-shadow: 0 1px 1px rgba(255, 255, 255, .9), 0 -1px 1px rgba(0, 0, 0, .1);
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