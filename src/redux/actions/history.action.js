import { ADD_TO_HISTORY } from '../actionType';

export const addToHistory = (video) => ({
    type: ADD_TO_HISTORY,
    payload: video,
});
