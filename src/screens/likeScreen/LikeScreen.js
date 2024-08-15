import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import './likeScreen.scss';
import { loadLikedVideos } from '../../redux/actions/likeVideo.action';

const LikeScreen = () => {
    const dispatch = useDispatch();
    const likedVideos = useSelector(state => state.likedVideos.likedVideos);

    useEffect(() => {
        dispatch(loadLikedVideos());
    }, [dispatch]);

    return (
        <div>
            <h2>Liked Videos</h2>
            <div>
                {likedVideos.length === 0 ? (
                    <p>No liked videos yet.</p>
                ) : (
                    likedVideos.map(video => (
                        <VideoHorizontal video={video} key={video.id.videoId || video.id} searchScreen/>
                    ))
                )}
            </div>
        </div>
    );
};

export default LikeScreen;