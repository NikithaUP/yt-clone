

import React, { useEffect, useState } from 'react';
import './_videoMetaData.scss';
import numeral from 'numeral';
import moment from 'moment';
import ShowMoreText from 'react-show-more-text';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { checkSubscriptionStatus, getChannelDetails } from '../../redux/actions/channel.action';
import { addToLikedVideos, removeFromLikedVideos } from '../../redux/actions/likeVideo.action';

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
    const { channelId, channelTitle, description, title, publishedAt } = snippet;
    const { viewCount, likeCount: initialLikeCount, dislikeCount: initialDislikeCount } = statistics;
    const dispatch = useDispatch();

    const storedLikeCount = localStorage.getItem(`likeCount-${videoId}`);
    const storedDislikeCount = localStorage.getItem(`dislikeCount-${videoId}`);
    const isLiked = localStorage.getItem(`liked-${videoId}`);
    const isDisliked = localStorage.getItem(`disliked-${videoId}`);

    const [likeCount, setLikeCount] = useState(
        storedLikeCount !== null ? parseInt(storedLikeCount) : Number(initialLikeCount) || 0
    );
    const [dislikeCount, setDislikeCount] = useState(
        storedDislikeCount !== null ? parseInt(storedDislikeCount) : Number(initialDislikeCount) || 0
    );

    const [likeDisabled, setLikeDisabled] = useState(isLiked === 'true');
    const [dislikeDisabled, setDislikeDisabled] = useState(isDisliked === 'true');

    useEffect(() => {
        dispatch(getChannelDetails(channelId));
        dispatch(checkSubscriptionStatus(channelId));
    }, [dispatch, channelId]);

    const {
        snippet: channelSnippet,
        statistics: channelStatistics,
    } = useSelector(state => state.channelDetails.channel);

    const subscriptionStatus = useSelector(
        state => state.channelDetails.subscriptionStatus
    );

    const handleLike = () => {
        if (!likeDisabled && !dislikeDisabled) {
            setLikeCount(prevCount => {
                const newCount = prevCount + 1;
                localStorage.setItem(`likeCount-${videoId}`, newCount);
                return newCount;
            });
            setLikeDisabled(true);
            localStorage.setItem(`liked-${videoId}`, true);

            const video = {
                id: videoId,
                snippet,
                statistics,
                contentDetails: { duration: statistics.duration }
            };
            dispatch(addToLikedVideos(video));
        } else if (!likeDisabled && dislikeDisabled) {
            // User had disliked and is now liking
            setLikeCount(prevCount => {
                const newCount = prevCount + 1;
                localStorage.setItem(`likeCount-${videoId}`, newCount);
                return newCount;
            });
            setDislikeCount(prevCount => {
                const newCount = Math.max(prevCount - 1, 0);
                localStorage.setItem(`dislikeCount-${videoId}`, newCount);
                return newCount;
            });
            setLikeDisabled(true);
            setDislikeDisabled(false);
            localStorage.setItem(`liked-${videoId}`, true);
            localStorage.removeItem(`disliked-${videoId}`);

            const video = {
                id: videoId,
                snippet,
                statistics,
                contentDetails: { duration: statistics.duration }
            };
            dispatch(addToLikedVideos(video));
        }
    };

    const handleDislike = () => {
        if (!dislikeDisabled) {
            setDislikeCount(prevCount => {
                const newCount = prevCount + 1;
                localStorage.setItem(`dislikeCount-${videoId}`, newCount);
                return newCount;
            });
            setDislikeDisabled(true);
            localStorage.setItem(`disliked-${videoId}`, true);

            if (likeDisabled) {
                setLikeCount(prevCount => {
                    const newCount = Math.max(prevCount - 1, 0);
                    localStorage.setItem(`likeCount-${videoId}`, newCount);
                    return newCount;
                });
                setLikeDisabled(false);
                localStorage.removeItem(`liked-${videoId}`);
                dispatch(removeFromLikedVideos(videoId));
            }
        }
    };

    return (
        <div className='py-2 videoMetaData'>
            <div className='videoMetaData__top'>
                <h5>{title}</h5>
                <div className='py-1 d-flex justify-content-between align-items-center'>
                    <span>
                        {numeral(viewCount).format('0.a')} Views •
                        {moment(publishedAt).fromNow()}
                    </span>
                    <div>
                        <button onClick={handleLike} disabled={likeDisabled} className={`like-dislike-btn spaced-btn`}>
                            <MdThumbUp size={26} className={likeDisabled ? 'like-active' : ''} />{"\t"}
                            {numeral(likeCount).format('0.a')}
                        </button>
                        <button onClick={handleDislike} disabled={dislikeDisabled} className={`like-dislike-btn spaced-btn`}>
                            <MdThumbDown size={26} className={dislikeDisabled ? 'dislike-active' : ''} />{"\t"}
                            {numeral(dislikeCount).format('0.a')}
                        </button>
                    </div>
                </div>
            </div>

            <div className='py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center'>
                <div className='d-flex'>
                    <img src={channelSnippet?.thumbnails?.default?.url}
                        alt='avatar'
                        className='mr-3 rounded-circle' />
                    <div className='d-flex flex-column'>
                        <span>{channelTitle}</span>
                        <span>{numeral(channelStatistics?.subscriberCount).format('0.a')} Subscriber</span>
                    </div>
                </div>
                <button className={`p-2 m-2 border-0 btn ${subscriptionStatus && 'btn-gray'}`}>
                    {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>
            <div className='videoMetaData__description'>
                <ShowMoreText lines={3}
                    more='SHOW MORE'
                    less='SHOW LESS'
                    anchorClass='showMoreText'
                    expanded={false}>
                    {description}
                </ShowMoreText>
            </div>
        </div>
    );
};

export default VideoMetaData;
