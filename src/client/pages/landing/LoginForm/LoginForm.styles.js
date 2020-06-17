import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  color: #c0c8d1;
  > span {
    margin: 10px 0;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  > div {
    margin: 10px 0;
  }

  > label {
    width: 250px;
    margin: 10px 0 20px;
  }
`

export const CheckLabel = styled.label`
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-self: flex-start;
  > input {
    margin: 0px 5px 0 20px;
  }
`

export const SubmitButton = styled.input`
  padding: 12px 25px;
  color: #fff;
  font-weight: bold;
  border: 3px solid #fafafa;
  border-radius: 20px;
  width: 260px;
  outline: none;
  cursor: pointer;
  background-image: linear-gradient(to top right, #008051, #00ffa2);
  -webkit-box-shadow: 0px 10px 14px -5px rgba(72,176,107,1);
  -moz-box-shadow: 0px 10px 14px -5px rgba(72,176,107,1);
  box-shadow: 0px 10px 14px -5px rgba(72,176,107,1);

  &:hover {
    filter: grayscale(20%)
  }

  &:active {
    -webkit-box-shadow: 0px 0px 5px 0px rgba(72,176,107,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(72,176,107,1);
    box-shadow: 0px 0px 5px 0px rgba(72,176,107,1);
    transform: translateY(1px);
    filter: grayscale(0%)
  }
`

export const GoogleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 25px;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  width: 260px;
  outline: none;
  cursor: pointer;

  > svg {
    margin: 0 10px 0 0;
  }

  &:hover {
    filter: grayscale(20%)
  }

  &:active {
    -webkit-box-shadow: 0px 0px 5px 0px rgba(72,176,107,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(72,176,107,1);
    box-shadow: 0px 0px 5px 0px rgba(72,176,107,1);
    transform: translateY(1px);
    filter: grayscale(0%)
  }

  background-image: linear-gradient(to top right, #cf4332, #f51d02);
  -webkit-box-shadow: 0px 5px 14px -5px rgba(207,67,50,1);
  -moz-box-shadow: 0px 5px 14px -5px rgba(207,67,50,1);
  box-shadow: 0px 5px 14px -5px rgba(207,67,50,1);
  margin: 5px 0;
`

export const FacebookButton = styled(GoogleButton)`
  background-image: linear-gradient(to top right, #3c66c4, #0552ff);
  -webkit-box-shadow: 0px 5px 14px -5px rgba(63,110,217,1);
  -moz-box-shadow: 0px 5px 14px -5px rgba(63,110,217,1);
  box-shadow: 0px 5px 14px -5px rgba(63,110,217,1);
  margin: 5px 0;
`

export const RegisterLabel = styled.label`
  margin: 40px 0;
  color: gray;

  > a {
    text-decoration: none;
    color: #00bd75;
    font-weight: bold;

    &:hover {
      color: #1ca854;
    }
  }
`