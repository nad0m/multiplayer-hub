import styled from 'styled-components'

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 50%;
height: 100%;
font-family: Futura, Trebuchet MS, Arial, sans-serif;
color: #c0c8d1;
> span {
  margin: 20px 0;
  font-weight: bold;
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
  margin: 10px 0 40px;
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

export const RegisterLabel = styled.label`
margin: 40px 0;
color: gray;

> a {
  text-decoration: none;
  color: #00bd75;

  &:hover {
    color: #1ca854;
  }
}
`