import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './VideoList.scss'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';
import Video from '../video/Video';
import SkeletonVideo from '../skeletons/SkeletonVideo';
import { Col, Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import CategoriesBar from '../categoriesBar/CategoriesBar';



const VideoList = () => {
   const { category } = useParams();
   const dispatch = useDispatch();
   const { videos, loading,activeCategory } = useSelector(state => state.homeVideos);

   useEffect(() => {
      if (category === 'All') {
         dispatch(getPopularVideos());
      } else {
         dispatch(getVideosByCategory(category));
      }
   }, [category, dispatch]);

   if (loading) {
      return <div>Loading...</div>;
   }

   const fetchData = () => {
      if (activeCategory === 'All' || !category || category === 'All') {
         dispatch(getPopularVideos());
      } else {
         dispatch(getVideosByCategory(activeCategory));
      }
   };


   return (


<Container>
            <CategoriesBar />
            <InfiniteScroll
               dataLength={videos.length}
               next={fetchData}
               hasMore={true}
               loader={<div className='spinner-border text-danger d-block mx-auto'></div>}
               className='row'>
               {!loading ? videos.map(video => (
                  <Col lg={3} md={4} key={video.id}>
                     <Video video={video} />
                  </Col>
               )) : [...Array(20)].map((_, index) => (
                  <Col lg={3} md={4} key={index}>
                     <SkeletonVideo />
                  </Col>
               ))}
            </InfiniteScroll>
         </Container>
   );
};

export default VideoList;
