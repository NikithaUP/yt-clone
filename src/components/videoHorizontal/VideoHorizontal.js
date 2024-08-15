import React, { useEffect, useState } from 'react';
import './_videoHorizontal.scss';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AiFillEye } from 'react-icons/ai';
import { Col, Row } from 'react-bootstrap';
import request from '../../api';
import { useNavigate } from 'react-router-dom';

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            title,
            publishedAt,
            thumbnails: { medium },
        },
        contentDetails,
        statistics
    } = video;

    const isVideo = !(id.kind === 'youtube#channel' || subScreen);

    const [views, setViews] = useState(statistics?.viewCount || null);
    const [duration, setDuration] = useState(contentDetails?.duration || null);
    const [channelIcon, setChannelIcon] = useState(null);

    useEffect(() => {
        if (!contentDetails || !statistics || !contentDetails.duration) {
            const get_video_details = async () => {
                const { data: { items } } = await request('/videos', {
                    params: {
                        part: 'contentDetails,statistics',
                        id: id.videoId || id,
                    },
                });

                setDuration(items[0].contentDetails.duration);
                setViews(items[0].statistics.viewCount);
            };
            get_video_details();
        } else {
            setDuration(contentDetails.duration);
            setViews(statistics.viewCount);
        }
    }, [id, contentDetails, statistics]);

    useEffect(() => {
        const get_channel_icon = async () => {
            const { data: { items } } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId,
                },
            });
            setChannelIcon(items[0].snippet.thumbnails.default);
        };
        get_channel_icon();
    }, [channelId]);
    
    const seconds = moment.duration(duration).asSeconds();
    const _duration = moment.utc(seconds * 1000).format('mm:ss');

    const navigate = useNavigate();
    const handleClick = () => {
        isVideo ?
            navigate(`/watch/${id.videoId || id}`)
            : navigate(`/channel/${id.channelId}`);
    };

    const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel';

    return (
        <Row className='py-2 m-1 videoHorizontal align-items-center' onClick={handleClick}>
            <Col xs={6} md={searchScreen||subScreen?2:6} className='videoHorizontal__left'>
                <LazyLoadImage
                    src={medium.url}
                    effect='blur'
                    className={`videoHorizontal__thumbnail ${thumbnail}`}
                    wrapperClassName='videoHorizontal__thumbnail-wrapper'
                />
                {isVideo && (
                    <span className='videoHorizontal__duration'>{_duration}</span>
                )}
            </Col>
            <Col xs={6} md={ searchScreen||subScreen?8:6} className='videoHorizontal__right p-0'>
                <p className='mb-1 videoHorizontal__title'>
                    {title}
                </p>
                {isVideo && (
                    <div className='videoHorizontal__details'>
                        <AiFillEye />{numeral(views).format("0.a")} Views •
                        {moment(publishedAt).fromNow()}
                    </div>
                )}
                <div className='my-1 videoHorizontal__channel d-flex align-items-center'>
                    {isVideo && (
                        <LazyLoadImage
                            src={channelIcon?.url}
                            effect='blur'
                        />
                    )}
                    <p className='mb-0'>{channelTitle}</p>
                </div>
            </Col>
        </Row>
    );
};

export default VideoHorizontal;
