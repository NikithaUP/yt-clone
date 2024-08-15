
// import { ADD_TO_LIKED_VIDEOS, LOAD_LIKED_VIDEOS } from "../actionType";

// const initialState = {
//     likedVideos: [],
// };

// const likedVideosReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_TO_LIKED_VIDEOS:
//             return {
//                 ...state,
//                 likedVideos: [action.payload,...state.likedVideos],
//             };
//         case LOAD_LIKED_VIDEOS:
//             return {
//                 ...state,
//                 likedVideos: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export default likedVideosReducer;





import { ADD_TO_LIKED_VIDEOS, LOAD_LIKED_VIDEOS, REMOVE_FROM_LIKED_VIDEOS } from "../actionType";

const initialState = {
    likedVideos: [],
};

const likedVideosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_LIKED_VIDEOS:
            return {
                ...state,
                likedVideos: [action.payload, ...state.likedVideos.filter(video => video.id !== action.payload.id)],
            };
        case LOAD_LIKED_VIDEOS:
            return {
                ...state,
                likedVideos: action.payload,
            };
        case REMOVE_FROM_LIKED_VIDEOS:
            return {
                ...state,
                likedVideos: state.likedVideos.filter(video => video.id !== action.payload),
            };
        default:
            return state;
    }
};

export default likedVideosReducer;

