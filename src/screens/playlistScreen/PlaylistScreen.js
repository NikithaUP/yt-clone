import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import './playlistScreen.scss';
// import { HiDotsCircleHorizontal } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";

const PlaylistScreen = () => {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const history = useSelector(state => state.history.history);
    const likedVideos = useSelector(state => state.likedVideos.likedVideos);

    const handleFolderClick = (folder) => {
        setSelectedFolder(folder === selectedFolder ? null : folder);
    };

    const renderFolder = (folderName, videos) => {
        const firstVideo = videos[0];
        return (
            <div>
                <div className="folder" onClick={() => handleFolderClick(folderName)}>
                <div className="folder-content">
                    {firstVideo ? (
                        <img src={firstVideo.snippet.thumbnails.medium.url} alt={firstVideo.snippet.title} />
                    ) : (
                        // <p>No videos</p>
                        <BsThreeDots size={90} className='playicon'/>
                    )}
                    <div className="video-count">{videos.length} videos</div>
                </div>
            </div>
                <h4>{folderName === 'history' ? 'Watch History' : 'Liked Videos'}</h4>

            </div>
        );
    };

    return (
        <div className="playlistScreen">
            <h1>Playlist</h1>

            <div className='playlistscreen_list'>
                {renderFolder('history', history)}
                {selectedFolder === 'history' && (
                    <div className="playlist-section">
                        {history.length === 0 ? (
                            <p>No videos in history</p>
                        ) : (
                            history.map(video => (
                                <VideoHorizontal video={video} key={video.id.videoId || video.id} searchScreen />
                            ))
                        )}
                    </div>
                )}

                {renderFolder('likedVideos', likedVideos)}
                {selectedFolder === 'likedVideos' && (
                    <div className="playlist-section">
                        {likedVideos.length === 0 ? (
                            <p>No liked videos yet.</p>
                        ) : (
                            likedVideos.map(video => (
                                <VideoHorizontal video={video} key={video.id.videoId || video.id} searchScreen />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistScreen;
