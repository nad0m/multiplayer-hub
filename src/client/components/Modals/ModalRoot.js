import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Portal } from '../../utils/window/document';

const TRANSITION_TIME_MS = 2000

const {
	ON_SHOW_CLASS,
	ON_HIDE_CLASS
} = {
	ON_SHOW_CLASS: 'modal-common-on-show',
	ON_HIDE_CLASS: 'modal-common-on-hide'
}

const useModalTransition = ({ show: propShow = false }) => {
	console.log({ propShow })
	const showRef = useRef(false)
	const [_show, _setShow] = useState(false)
	const [transitionClass, setTransitionClass] = useState(ON_HIDE_CLASS)
	useEffect(() => {
		if (propShow !== showRef.current) {
			showRef.current = propShow
			setTransitionClass(propShow === true ? ON_SHOW_CLASS : ON_HIDE_CLASS)
			setTimeout(() => {
				_setShow(propShow)
				console.log('on delayed close')
			}, TRANSITION_TIME_MS)
		}
	}, [propShow])
	return {
		_show,
		transitionClass
	}
}

const ModalDialogue = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0,0,0,.5);
	${({ show = false }) => `display: ${show ? 'block' : 'none'};`}
`;

const ModalContentContainer = styled.div`
  box-sizing: border-box;
  margin: 20vh auto;
  padding: 30px;
  min-height: 400px;
  min-width: 400px;
  height: 45vh;
  width: 55vw;
  max-width: 600px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 1px 6px #000;
  @media only screen and (max-width: 450px) {
    margin-top: 10vh;
    max-width: 95vw;
    width: 95vw;
    min-width: unset;
  }
`;

/**
 * Reuseable Modal component. Appends a node in the dom
 * when it is imported and then renders from within
 * @param {{ id: [String], show: Boolean, autoClose: Boolean, onClose: Function, onOpen: Function, children: Function, ...rest: Object }}
 */
export const ModalRoot = ({ id = 'ModalPortal', className = 'modal-parent', show = false, autoClose, onClose, onOpen, children, ...props }) => {
	const { _show, transitionClass } = useModalTransition({ show })
	const handleBgClick = () => {
		if (autoClose && typeof onClose === 'function') onClose();
	}
	const killEvent = e => e.stopPropagation();
	console.log({ show, _show })
	return (
		<Portal id={id} className={className}>
			<ModalDialogue className={transitionClass} show={_show} onClick={handleBgClick} {...props}>
				<ModalContentContainer onClick={killEvent}>
					{children}
				</ModalContentContainer>
			</ModalDialogue>
		</Portal>
	)
}


export default ModalRoot;
