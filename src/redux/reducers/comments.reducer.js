// import {
//    COMMENT_LIST_FAIL,
//    COMMENT_LIST_REQUEST,
//    COMMENT_LIST_SUCCESS,
//    ADD_COMMENT
// } from '../actionType'

// export const commentListReducer = (
//    state = {
//       loading: true,
//       comments: [],
//    },
//    action
// ) => {
//    const { payload, type } = action

//    switch (type) {
//       case COMMENT_LIST_REQUEST:
//          return {
//             ...state,
//             loading: true,
//          }
//       case COMMENT_LIST_SUCCESS:
//          return {
//             ...state,
//             comments: payload,
//             loading: false,
//          }
//       case ADD_COMMENT:
//          return {
//             ...state,
//             comments: [payload, ...state.comments],
//          }
//       case COMMENT_LIST_FAIL:
//          return {
//             ...state,
//             loading: false,
//             error: payload,
//          }
//       default:
//          return state
//    }
// }


import {
   COMMENT_LIST_FAIL,
   COMMENT_LIST_REQUEST,
   COMMENT_LIST_SUCCESS,
   ADD_COMMENT
} from '../actionType'

export const commentListReducer = (
   state = {
      loading: true,
      comments: [],
   },
   action
) => {
   const { payload, type } = action

   switch (type) {
      case COMMENT_LIST_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case COMMENT_LIST_SUCCESS:
         return {
            ...state,
            comments: payload,
            loading: false,
         }
      case ADD_COMMENT:
         const updatedComments = [payload, ...state.comments];
         localStorage.setItem('comments-${payload.snippet.topLevelComment.snippet.videoId}', JSON.stringify(updatedComments));
         return {
            ...state,
            comments: updatedComments,
         }
      case COMMENT_LIST_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }
      default:
         return state
   }
}