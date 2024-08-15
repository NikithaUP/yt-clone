
import { createStore, applyMiddleware,combineReducers } from 'redux'


import { composeWithDevTools } from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'
import { authReducer } from './reducers/auth.reducer'
import {  homeVideosReducer, relatedVideoReducer, searchedVideosReducer, shortsVideosReducer,} from './reducers/videos.reducer'
import {selectedVideoReducer} from './reducers/videos.reducer'
import { channelDetailsReducer } from './reducers/channel.reducer'
import { commentListReducer } from './reducers/comments.reducer'
import { historyReducer } from './reducers/history.reducer'
import likedVideosReducer from './reducers/likedVideos.reducers'


const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideosReducer,
    selectedVideo: selectedVideoReducer,
    channelDetails: channelDetailsReducer,
    commentList: commentListReducer,
    relatedVideos: relatedVideoReducer,
    searchedVideos: searchedVideosReducer,
    shortsVideos: shortsVideosReducer,
    history: historyReducer,
    likedVideos: likedVideosReducer,
    // categoryVideos:categoryVideosReducer,
})

const store = createStore(
    rootReducer,{}, composeWithDevTools(applyMiddleware(thunk)))


export default store
