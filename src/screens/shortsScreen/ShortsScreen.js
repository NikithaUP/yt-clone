import React, { useEffect, useRef, useState } from 'react';
import './shortsScreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomShortVideos } from '../../redux/actions/videos.action';

const ShortsScreen = () => {
    const dispatch = useDispatch();
    const { shorts, loading, error } = useSelector((state) => state.shortsVideos);
    const iframeRefs = useRef([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(null);

    useEffect(() => {
        dispatch(fetchRandomShortVideos());
    }, [dispatch]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                const videoIndex = parseInt(entry.target.getAttribute('data-index'), 10);
                if (entry.isIntersecting) {
                    setCurrentVideoIndex(videoIndex);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        iframeRefs.current.forEach((iframe) => {
            if (iframe) observer.observe(iframe);
        });

        return () => {
            observer.disconnect();
        };
    }, [shorts]);

    useEffect(() => {
        if (currentVideoIndex !== null && shorts[currentVideoIndex]) {
            const videoId = shorts[currentVideoIndex].id.videoId;
            window.history.replaceState(null, '', `/shorts/${videoId}`);

            iframeRefs.current.forEach((iframe, index) => {
                if (iframe) {
                    const src = `https://www.youtube.com/embed/${shorts[index].id.videoId}?autoplay=${index === currentVideoIndex ? 1 : 0}&mute=0&controls=0&loop=0`;
                    if (iframe.src !== src) {
                        iframe.src = src;
                    }
                }
            });
        }
    }, [currentVideoIndex, shorts]);

    return (
        <div className='short__contain'>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div>
                {shorts && (
                    <div>
                        {shorts.map((short, index) => (
                            <div key={short.id.videoId} className='video-container'>
                                <iframe
                                    ref={el => iframeRefs.current[index] = el}
                                    data-index={index}
                                    width="200%"
                                    height="100%"
                                    style={{ marginBottom: '20px' }}
                                    src={`https://www.youtube.com/embed/${short.id.videoId}?autoplay=0&mute=0&controls=0&loop=0`}
                                    frameBorder="0"
                                    loading="lazy"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={short.snippet.title}
                                ></iframe>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShortsScreen;

