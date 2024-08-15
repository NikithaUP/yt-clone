

import React from 'react';
import { useSelector } from 'react-redux';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import { Link } from 'react-router-dom';
import './historyScreen.scss';
import { GoClock } from "react-icons/go";
import { FaPause } from "react-icons/fa6";
import { ImBin } from "react-icons/im";

const HistoryScreen = () => {
    const { accessToken } = useSelector(state => state.auth);
    const history = useSelector(state => state.history.history);
    
    if (!accessToken) {
        return (
            <div className='l-mesg'>
                <div className="logged-out-message">
                <GoClock size={100} className='hicon'/>
                <h2>Keep track of what you watch</h2>
                <p>Watch history isn't viewable when signed out. <Link to="/">Learn more.</Link></p>
            </div>
            <div className="additional-info">
                    <div><ImBin /> Clear all watch history</div>
                    <div><FaPause /> Pause watch history</div>
                    <div><ImBin /> Clear all search history</div>
                    <div><FaPause /> Pause search history</div>
                </div>
            </div>
        );
    }

    return (
        <div className="hisScreen">
            <h2>Watch History</h2>
            {history.length === 0 ? (
                <p>No videos in history</p>
            ) : (
                history.map(video => (
                    <VideoHorizontal video={video} key={video.id.videoId} searchScreen />
                ))
            )}
        </div>
    );
};

export default HistoryScreen;

