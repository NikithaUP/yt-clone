


import React, { useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
// import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import { useDispatch, useSelector } from 'react-redux';
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from '../../components/skeletons/SkeletonVideo';
import './homeScreen.scss';
import { useParams } from 'react-router-dom';
import CategoriesBar from '../../components/categoriesBar/CategoriesBar';

const HomeScreen = () => {
   const { category } = useParams();
   const dispatch = useDispatch();
   const { videos = [], activeCategory, loading } = useSelector(state => state.homeVideos);
   const { accessToken } = useSelector(state => state.auth);

   useEffect(() => {
      if (accessToken) {
         if (category && category !== 'All') {
            dispatch(getVideosByCategory(category));
         } else {
            dispatch(getPopularVideos());
         }
      }
   }, [dispatch, accessToken, category]);

   const fetchData = () => {
      if (activeCategory === 'All' || !category || category === 'All') {
         dispatch(getPopularVideos());
      } else {
         dispatch(getVideosByCategory(activeCategory));
      }
   };

   if (!accessToken) {
      return (
         <Container>
            <div className='homeScreen__message'>
               <h2>Try searching to get started</h2>
               <p>Start watching videos to help us build a feed of videos you'll love.</p>
            </div>
         </Container>
      );
   }

   return (
      <div className='home1'>
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
      </div>
   );
};

export default HomeScreen;
