import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import { Portal } from '../../utils/window/document';
import useModalTransition from '../../hooks/useModalTransition';


/* Modal Backdrop animations */
const fadeIn = keyframes`
	from { background-color: rgba(0,0,0,0); }
	to { background-color: rgba(0,0,0,0.5); }
`
const fadeOut = keyframes`
	from { background-color: rgba(0,0,0,0.5);	}
	to { background-color: rgba(0,0,0,0);	}
`
const genBackdropAmination = css`
	animation: ${({ animateShow = false }) => animateShow ? fadeIn : fadeOut} 500ms ease;
`

/* Modal Content animations */
const transIn = keyframes`
	0% { max-width: 0; max-height: 0; }
	15% { max-width: 0; max-height: 5px; }
	65% { max-width: 100%; max-height: 20px; }
	100% { max-width: 100%; max-height: 100%; }
`
const transOut = keyframes`
	0% { max-height: 100%; max-width: 100% }
	35% { max-width: 100%; max-height: 20px; }
	85% { max-width: 0; max-height: 5px; }
	100% { max-width: 0; max-height: 0; }
`
const genContentAmination = css`
	animation: ${({ animateShow = false }) => animateShow ? transIn : transOut};
	animation-duration: 600ms;
	animation-timing-function: ease;
`

const ModalDialogue = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0,0,0,0);
	justify-content: center;
	align-items: center;
	${genBackdropAmination}
	${({ animateShow = false }) => animateShow && 'background-color: rgba(0,0,0, 0.5);'}
	${({ animateShow = false, show = false }) => (animateShow && !show) && 'pointer-events: none;'}
	${({ animateShow = false, show = false }) => `display: ${animateShow || show ? 'flex' : 'none'};`}
`;

const ModalContentContainer = styled.div`
  border-radius: 4px;
	overflow: hidden;
	max-width: 0;
	max-height: 0;
	${({ animateShow = false }) => animateShow && `
		max-width: 100%;
		max-height: 100%;
	`}
	${genContentAmination}
`;

const ModalContent = styled.div`
  box-sizing: border-box;
  padding: 30px;
  min-height: 400px;
  min-width: 400px;
  height: 45vh;
  width: 55vw;
  max-width: 600px;
  background-color: #fff;
  box-shadow: 0px 1px 6px #000;
  @media only screen and (max-width: 450px) {
    margin-top: 10vh;
    max-width: 95vw;
    width: 95vw;
    min-width: unset;
  }
	> * {
		transition: opacity 250ms ease;
		transition-delay: 200ms;
		opacity: 0;
		${({ show = false }) => show ? 'opacity: 100' : '0'}
	}
`

/**
 * Reuseable Modal component. Appends a node in the dom
 * when it is imported and then renders from within
 * @param {{ id: [String], show: Boolean, autoClose: Boolean, onClose: Function, onOpen: Function, children: Function, ...rest: Object }}
 */
export const ModalRoot = ({
	id = 'ModalPortal',
	className = 'modal-parent',
	show = false,
	autoClose,
	onClose,
	onOpen,
	children,
	...props
}) => {

	const { _show, transitionClass } = useModalTransition({ show })
	const handleBgClick = () => {
		if (
			autoClose
			&& typeof onClose === 'function'
			&& show === _show
		) onClose();
	}
	const killEvent = e => e.stopPropagation();

	return (
		<Portal id={id} className={className}>
			<ModalDialogue className={transitionClass} animateShow={show} show={_show} onClick={handleBgClick} {...props}>
				<ModalContentContainer animateShow={show} onClick={killEvent}>
					<ModalContent show={_show}>
						{children}
					</ModalContent>
				</ModalContentContainer>
			</ModalDialogue>
		</Portal>
	)
}


export default ModalRoot;
