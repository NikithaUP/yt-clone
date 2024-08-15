
import React from 'react';
import "./_sidebar.scss";
import {
   MdSubscriptions,
   MdExitToApp,
   MdThumbUp,
   MdHistory,
   MdLibraryBooks,
   MdHome,
   MdOutlineVideoLibrary
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { log_out } from '../../redux/actions/auth.action';
import { NavLink, useNavigate } from 'react-router-dom';
import {  SiYoutubegaming } from "react-icons/si";
import { MdOutlineLocalMovies } from "react-icons/md";
import { CgPlayList } from "react-icons/cg";
import {  AiOutlineBulb } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { HiOutlineFire } from "react-icons/hi";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";
import { GiDress } from "react-icons/gi";
import { HiSignal } from "react-icons/hi2";

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const accessToken  = useSelector(state => state.auth)

   // const history = useSelector(state => state.history.history);

   const logOutHandler = () => {
      dispatch(log_out());
      navigate('/home');
   };

   return (
      <div className='sidebar-container'>
         <nav className={sidebar ? "sidebar open" : "sidebar"}>
         <li onClick={handleToggleSidebar}>
            <NavLink to="/"> 
               <MdHome size={23} />
               <span>Home</span>
            </NavLink>
         </li>

         <li onClick={handleToggleSidebar}>
            <NavLink to="/shorts"> 
               <MdOutlineVideoLibrary size={23} />
               <span>Shorts</span>
            </NavLink>
         </li>

         <li onClick={handleToggleSidebar}>
            <MdSubscriptions size={23} />
            <span>Subscriptions</span>
         </li>
         <hr />
         <li>
            <MdLibraryBooks size={23} />
            <span>Library</span>
         </li>

         <li onClick={handleToggleSidebar}>
            <NavLink to="/feed/history">
               <MdHistory size={23} />
               <span>History</span>
            </NavLink>
         </li>

        <li onClick={handleToggleSidebar}>
            <NavLink to="/feed/Playlists">
               <CgPlayList size={23} />
               <span>Playlist</span>
            </NavLink>
         </li>


         <li onClick={handleToggleSidebar}>
            <NavLink to="/feed/likeVideos">
               <MdThumbUp size={23} />
               <span>Liked Video</span>
            </NavLink>
         </li>
         {/* <li onClick={handleToggleSidebar}>
            <MdThumbUp size={23} />
            <span>Liked Video</span>
         </li> */}


         
         <hr />

         <li onClick={handleToggleSidebar}>
            <HiOutlineFire size={23} />
            <span>Trending</span>
         </li>
         
         <li onClick={handleToggleSidebar}>
            <IoMusicalNoteOutline size={23} />
            <span>Music</span>
         </li>

         <li onClick={handleToggleSidebar}>
            <MdOutlineLocalMovies size={23} />
            <span>Movies</span>
         </li>


         <li onClick={handleToggleSidebar}>
            <HiSignal size={23} />
            <span>Live</span>
         </li>

         <li onClick={handleToggleSidebar}>
            <SiYoutubegaming size={23} />
            <span>Gaming</span>
         </li>


         <li onClick={handleToggleSidebar}>
            <BsNewspaper size={23} />
            <span>News</span>
         </li>


         <li onClick={handleToggleSidebar}>
            <CiTrophy size={23} />
            <span>Sports</span>
         </li>

         <li onClick={handleToggleSidebar}>
            <AiOutlineBulb size={23} />
            <span>Learning</span>
         </li>

         <li onClick={handleToggleSidebar}>
            <GiDress size={23}/>
            <span>Fashion & beauty</span>
         </li>



         {accessToken && (
            <li onClick={logOutHandler}>
               <MdExitToApp size={23} />
               <span>Log Out</span>
            </li>
         )}
         <hr />
      </nav>
      </div>
   );
};

export default Sidebar;
