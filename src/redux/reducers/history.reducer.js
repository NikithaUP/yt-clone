import { ADD_TO_HISTORY } from '../actionType';

const initialState = {
    history: JSON.parse(localStorage.getItem('history')) || [],
};

export const historyReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_TO_HISTORY:
            const exists = state.history.find(video => video.id === payload.id);
            if (exists) {
                return state;
            }
            const newHistory = [payload, ...state.history];
            localStorage.setItem('history', JSON.stringify(newHistory));
            return {
                ...state,
                history: newHistory,
            };
        default:
            return state;
    }
};
