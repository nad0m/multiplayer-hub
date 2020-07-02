import { useState } from 'react';

const useComplexState = (initialState = {}, onUpdate) => {
	const [state, updateState] = useState({ ...initialState });
	const resetState = () => updateState({ ...initialState });
	const forceState = (forceValue) => updateState({ ...forceValue });

	const setState = (updates = {}) => {
		let updatedState = state;
		updateState((staleState) => {
			updatedState = { ...staleState, ...updates };
			return updatedState;
		});
		if (typeof onUpdate === 'function') onUpdate(updatedState);
		return updatedState;
	};

	return {
		state,
		setState,
		resetState,
		forceState,
	};
};

export default useComplexState;
