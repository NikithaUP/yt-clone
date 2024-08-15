// import React, { useState } from 'react'
// import "./_categoriesBar.scss"
// import { useDispatch } from 'react-redux'
// import { getVideosByCategory,getPopularVideos } from '../../redux/actions/videos.action'


// const keywords = [
//    'All',
//    'React js',
//    'Angular js',
//    'React Native',
//    'use of API',
//    'Redux',
//    'Music',
//    'Java ',
//    'HTML',
//    'CSS',
//    'Coding',
//    'Cricket',
//    'Javascript',
//    'Python',
//    'Firebase',
//    'Data Structures',
//    'Data Analytics',
//    'movies',
//    'Gaming',
//    'college',
//    'university',
//    'school',
//    'education',
//    'politics',
//    'news',
// ]


// const CategoriesBar = () => {

//   const [activeElement,setActiveElement]=useState('All')


//   const dispatch = useDispatch()
  
//   const handleClick = (value) => {
//     setActiveElement(value)
//     if (value === 'All') {
//          dispatch(getPopularVideos())
//       } else {
//          dispatch(getVideosByCategory(value))
//       }
//   };

  
//   return (
//     <div className="categoriesBar">
      
//       {
//         keywords.map((value, i) => (
//           <span onClick={() => handleClick(value)} key={i}
//             className={activeElement === value ? 'active' : ''}>
//             {value}
//           </span>
//         ))
//       }
//     </div>
//   )
// }

// export default CategoriesBar

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVideosByCategory, getPopularVideos } from '../../redux/actions/videos.action'
import "./_categoriesBar.scss"
import { useNavigate } from 'react-router-dom'

const keywords = [
   'All',
   'React js',
   'Angular js',
   'React Native',
   'use of API',
   'Redux',
   'Music',
   'Java ',
   'HTML',
   'CSS',
   'Coding',
   'Cricket',
   'Javascript',
   'Python',
   'Firebase',
   'Data Structures',
   'Data Analytics',
   'movies',
   'Gaming',
   'college',
   'university',
   'school',
   'education',
   'politics',
   'news',
]

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState('All')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (value) => {
    setActiveElement(value)
    if (value === 'All') {
      dispatch(getPopularVideos())
      navigate('/category/All')
    } else {
      dispatch(getVideosByCategory(value))
      navigate(`/category/${value}`)
    }
  };

  return (
    <div className="categoriesBar">
      {
        keywords.map((value, i) => (
          <span onClick={() => handleClick(value)} key={i}
            className={activeElement === value ? 'active' : ''}>
            {value}
          </span>
        ))
      }
    </div>
  )
}

export default CategoriesBar
