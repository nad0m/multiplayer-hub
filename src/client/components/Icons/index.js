import styled from 'styled-components'


export const GameScore = styled.figure`
	height: 20px;
	width: 20px;
	margin: 0;
	border-radius: 12px;
	background-color: #ffffff;
	color: #000000;
	&::after {
		content: 'GS';
		display: inline-block;
		height: 20px;
		width: 20px;
		font-size: 13px;
		text-align: center;
		line-height: 20px;
	}
`
