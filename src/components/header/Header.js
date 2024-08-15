// import React, { useState } from 'react'
// import "./_header.scss"

// import { FaBars } from "react-icons/fa"
// import { AiOutlineSearch } from 'react-icons/ai'
// import {MdNotifications,MdApps} from "react-icons/md"
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const Header = ({handleToggleSideBar}) => {

//   const [input, setInput] = useState('')
  
//   const navigate = useNavigate()
  
//   const handleSubmit = e => {
//     e.preventDefault()

//     navigate(`/search/${input}`)
//   }

//   const { photoURL } = useSelector(state => state.auth?.user)
  
  
//   return (
//     <div className="border border-dark header">
//         <FaBars className="header__menu" size={26} onClick={()=>handleToggleSideBar()}/>
//         <img src='http://pngimg.com/uploads/youtube/youtube_PNG2.png' alt='' className='header__logo'/>
      
        
//       <form onSubmit={handleSubmit}>
//         <input type='text' placeholder='Search' value={input} onChange={e => setInput(e.target.value)} />
//           <button type='submit'>
//             <AiOutlineSearch size={22}/>
//           </button>
//         </form>
//         <div className='header__icons'>
//           <MdNotifications size={28}/>
//           <MdApps size={28}/>
//         {/* <img src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" alt='avatar' /> */}
//         <img src={photoURL} alt='avatar' />
//         </div>
//     </div>
//   )
// }

// export default Header


// import React, { useState } from 'react';
// import "./_header.scss";
// import { FaBars } from "react-icons/fa";
// import { AiOutlineSearch } from 'react-icons/ai';
// import { MdNotifications, MdApps } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const Header = ({ handleToggleSideBar }) => {
//    const [input, setInput] = useState('');
//    const navigate = useNavigate();
//    const { user } = useSelector(state => state.auth);
//    const profileImage = user?.photoURL || 'https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png';

//    const handleSubmit = e => {
//       e.preventDefault();
//       navigate(`/search/${input}`);
//    };

//    return (
//       <div className="border border-dark header">
//          <FaBars className="header__menu" size={26} onClick={handleToggleSideBar} />
//          <img src='http://pngimg.com/uploads/youtube/youtube_PNG2.png' alt='' className='header__logo' />

//          <form onSubmit={handleSubmit}>
//             <input type='text' placeholder='Search' value={input} onChange={e => setInput(e.target.value)} />
//             <button type='submit'>
//                <AiOutlineSearch size={22} />
//             </button>
//          </form>
//          <div className='header__icons'>
//             <MdNotifications size={28} />
//             <MdApps size={28} />
//             <img src={profileImage} alt='avatar' />
//          </div>
//       </div>
//    );
// };

// export default Header;

import React, { useState } from 'react';
import "./_header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications, MdApps } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ handleToggleSideBar }) => {
   const [input, setInput] = useState('');
   const navigate = useNavigate();
   const { user } = useSelector(state => state.auth);
   const profileImage = user?.photoURL || 'https://i.pinimg.com/564x/97/7e/56/977e568da382e808209b9294e0c0c10a.jpg';

   const handleSubmit = e => {
      e.preventDefault();
      navigate(`/search/${input}`);
   };

   const handleProfileClick = () => {
      navigate('/auth');
   };

   return (
      <div className="border border-dark header">
         <FaBars className="header__menu" size={26} onClick={handleToggleSideBar} />
         {/* <img src='http://pngimg.com/uploads/youtube/youtube_PNG2.png' alt='' className='header__logo' /> */}
       <img src='https://www.logo-designer.co/storage/2017/08/2017-youtube-logo-design-2.png' alt='' className='header__logo' />
         


         <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Search' value={input} onChange={e => setInput(e.target.value)} />
            <button type='submit'>
               <AiOutlineSearch size={22} />
            </button>
         </form>
         <div className='header__icons'>
            <MdNotifications size={28} />
            <MdApps size={28} />
            <img src={profileImage} alt='avatar' onClick={handleProfileClick} className="header__profile-image" />
         </div>
      </div>
   );
};

export default Header;

