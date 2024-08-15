// import axios from 'axios'
import {
    HOME_VIDEOS_FAIL,
    HOME_VIDEOS_REQUEST,
    HOME_VIDEOS_SUCCESS,
    SELECTED_VIDEO_FAIL,
    SELECTED_VIDEO_REQUEST,
    SELECTED_VIDEO_SUCCESS,
    RELATED_VIDEO_FAIL,
    RELATED_VIDEO_REQUEST,
   RELATED_VIDEO_SUCCESS,
   SEARCHED_VIDEO_REQUEST,
   SEARCHED_VIDEO_SUCCESS,
   SEARCHED_VIDEO_FAIL,
   FETCH_SHORTS_REQUEST,
   FETCH_SHORTS_SUCCESS,
   FETCH_SHORTS_FAIL,
   ADD_TO_HISTORY,
} from "../actionType"

import axios from 'axios'
console.log(process.env.REACT_YT_API_KEY)
const request = axios.create({
   baseURL: 'https://youtube.googleapis.com/youtube/v3/',
   params: {
  
      key: 'AIzaSyAj7m4WfgrvnvwlJ8-U_yi1pkNJ64Jyf0w',

   },
})

export const getPopularVideos = (keyword) => async (dispatch,getState) => {
    try {
        dispatch({
            type:HOME_VIDEOS_REQUEST,
        })
        const {data}=await request("/videos", {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'IN',
                maxResults: 40,
                pageToken: getState().homeVideos.nextPageToken,

            },
        })
        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                video: data.items,
                nextPageToken: data.nextPageToken,
                category:'All'
            },
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload:error.message,
        })
    }
}

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
    try {
       dispatch({
          type: HOME_VIDEOS_REQUEST,
          payload: {
            category: keyword,
         },
       })
       const { data } = await request('/search', {
          params: {
             part: 'snippet',
             maxResults: 20,
             pageToken: getState().homeVideos.nextPageToken,
             q: keyword,
             type: 'video',
          },
       })
 
       dispatch({
          type: HOME_VIDEOS_SUCCESS,
          payload: {
             video: data.items,
             nextPageToken: data.nextPageToken,
             category: keyword,
          },
       })
    } catch (error) {
       console.log(error.message)
       dispatch({
          type: HOME_VIDEOS_FAIL,
          payload: error.message,
       })
    }
 }




// export const getVideoById = id => async dispatch => {
//     try {
//         dispatch({
//             type:SELECTED_VIDEO_REQUEST,
//         })
//         const { data } = await request('/videos', {
//          params: {
//             part: 'snippet,statistics',
//             id: id,
//          },
//         })
        
//         dispatch({
//             type: SELECTED_VIDEO_SUCCESS,
//             payload:data.items[0],
//         })
        
//         dispatch({
//             type: ADD_TO_HISTORY,
//             payload: data.items[0],
//         });
        
//         return { payload: data.items[0] };
        
//     } catch (error) {
//         console.log(error.message)
//         dispatch({
//             type: SELECTED_VIDEO_FAIL,
//          payload: error.message,
            
//         })
//         return { payload: null };
//     }
// }


export const getVideoById = id => async dispatch => {
    try {
        dispatch({
            type: SELECTED_VIDEO_REQUEST,
        });
        const { data } = await request('/videos', {
            params: {
                part: 'snippet,statistics',
                id: id,
            },
        });

        const videoDetails = data.items[0];

        dispatch({
            type: SELECTED_VIDEO_SUCCESS,
            payload: videoDetails,
        });

        dispatch({
            type: ADD_TO_HISTORY,
            payload: videoDetails,
        });

        return { payload: videoDetails };
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: SELECTED_VIDEO_FAIL,
            payload: error.message,
        });
        return { payload: null };
    }
}



// export const getRelatedVideos = id => async dispatch => {
//     try {
//         dispatch({
//             type:RELATED_VIDEO_REQUEST,
//         })
//         const { data } = await request('/search', {
//          params: {
//               part: 'snippet',
//              q : id,
//             //  relatedToVideoId: id,
//               maxResults: 15,
//               type:'video',
//          },
//         })
//        console.log('Related Videos API Response:', data)
//         dispatch({
//             type: RELATED_VIDEO_SUCCESS,
//             payload:data.items,
//         })
//        console.log('Dispatched RELATED_VIDEO_SUCCESS')
//     } catch (error) {
//        console.log(error.response?.data?.message || error.message)
//         dispatch({
//             type: RELATED_VIDEO_FAIL,
//          payload:error.response?.data?.message || error.message  
//         }) 
//     }
// }


export const getRelatedVideos = (id, title) => async dispatch => {
    try {
        dispatch({
            type: RELATED_VIDEO_REQUEST,
        });

        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                q: title,  // Use the video title for the search query
                maxResults: 15,
                type: 'video',
            },
        });

        console.log('Related Videos API Response:', data);
        dispatch({
            type: RELATED_VIDEO_SUCCESS,
            payload: data.items,
        });
        console.log('Dispatched RELATED_VIDEO_SUCCESS');
    } catch (error) {
        console.log(error.response?.data?.message || error.message);
        dispatch({
            type: RELATED_VIDEO_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};


export const getVideosBySearch = keyword => async dispatch => {
   try {
      dispatch({
         type: SEARCHED_VIDEO_REQUEST,
      })
      const { data } = await request('/search', {
         params: {
            part: 'snippet',

            maxResults: 20,
            q: keyword,
            type: 'video,channel',
         },
      })

      dispatch({
         type: SEARCHED_VIDEO_SUCCESS,
         payload: data.items,
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: SEARCHED_VIDEO_FAIL,
         payload: error.message,
      })
   }
}

export const fetchRandomShortVideos = (id) => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_SHORTS_REQUEST,
        })
        const { data } = await request("/search", {
            params: {
                part: 'snippet',
                maxResults: 15,
                q: id,
                type: 'video',
                videoDuration: 'short',
            },
        })
        dispatch({
            type: FETCH_SHORTS_SUCCESS,
            payload: data.items,
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: FETCH_SHORTS_FAIL,
            payload: error.message,
        })
    }
}


