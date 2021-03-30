import { useState, useRef, useEffect } from 'react';


export const MODAL_CONFIG = {
	TRANSITION_TIME_MS: 500,
	ON_SHOW_CLASS: 'modal-common-on-show',
	ON_HIDE_CLASS: 'modal-common-on-hide'
}

const {
	TRANSITION_TIME_MS,
	ON_SHOW_CLASS,
	ON_HIDE_CLASS
} = MODAL_CONFIG

export const useModalTransition = ({ show: propShow = false }) => {
	const showRef = useRef(false)
	const [_show, _setShow] = useState(false)
	const [transitionClass, setTransitionClass] = useState(ON_HIDE_CLASS)
	useEffect(() => {
		if (propShow !== showRef.current) {
			showRef.current = propShow
			setTransitionClass(propShow ? ON_SHOW_CLASS : ON_HIDE_CLASS)
			setTimeout(() => {
				_setShow(propShow)
			}, TRANSITION_TIME_MS)
		}
	}, [propShow])
	return {
		_show,
		transitionClass
	}
}

export default useModalTransition
