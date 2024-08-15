import { getLikedVideosFromLocalStorage, removeLikedVideoFromLocalStorage, saveLikedVideoToLocalStorage } from "../../utils/storageUtils";
import { ADD_TO_LIKED_VIDEOS, LOAD_LIKED_VIDEOS, REMOVE_FROM_LIKED_VIDEOS } from "../actionType";

export const loadLikedVideos = () => dispatch => {
    const likedVideos = getLikedVideosFromLocalStorage();
    dispatch({
        type: LOAD_LIKED_VIDEOS,
        payload: likedVideos
    });
};

export const addToLikedVideos = (video) => dispatch => {
    saveLikedVideoToLocalStorage(video);
    dispatch({
        type: ADD_TO_LIKED_VIDEOS,
        payload: video
    });
};

export const removeFromLikedVideos = (videoId) => dispatch => {
    removeLikedVideoFromLocalStorage(videoId);
    dispatch({
        type: REMOVE_FROM_LIKED_VIDEOS,
        payload: videoId
    });
};