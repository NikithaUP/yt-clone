
// import React, { useEffect, useState } from 'react'
// import './_comments.scss'
// import Comment from '../comment/Comment'
// import { useDispatch, useSelector } from 'react-redux'
// import { addComment, getCommentsOfVideoById } from '../../redux/actions/comments.action'

// const Comments = ({ videoId, totalComments }) => {
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(getCommentsOfVideoById(videoId))
//   }, [videoId, dispatch])

//   const comments = useSelector(state => state.commentList.comments)
//   const { photoURL } = useSelector(state => state.auth?.user)

//   const _comments = comments ? comments.map(
//     comment => comment.snippet.topLevelComment.snippet
//   ) : []

//   const [text, setText] = useState('')

//   const handleComment = e => {
//     e.preventDefault()
//     if (text.length === 0) return
//     dispatch(addComment(videoId, text))
//     setText('')
//   }

//   return (
//     <div className='comments'>
//       <p>{totalComments} Comments</p>
//       <div className='comments__form d-flex w-100 my-2'>
//         <img src={photoURL}
//           alt='avatar'
//           className='mr-3 rounded-circle' />
//         <form
//           onSubmit={handleComment}
//           className='d-flex flex-grow-1'>
//           <input type="text"
//             className='flex-grow-1'
//             placeholder='Write a comment...'
//             value={text}
//             onChange={e => setText(e.target.value)} />
//           <button className='border-0 p-2'>Comment</button>
//         </form>
//       </div>
//       <div className='comments__list'>
//         {
//           _comments?.map((comment, i) => (
//             <Comment comment={comment} key={i} />
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Comments


import React, { useEffect, useState } from 'react'
import './_comments.scss'
import Comment from '../comment/Comment'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getCommentsOfVideoById } from '../../redux/actions/comments.action'

const Comments = ({ videoId, totalComments }) => {
  const dispatch = useDispatch()
  const [comments, setComments] = useState([])

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments-${videoId}'));
    if (storedComments) {
      setComments(storedComments);
    } else {
      dispatch(getCommentsOfVideoById(videoId));
    }
  }, [videoId, dispatch])

  const reduxComments = useSelector(state => state.commentList.comments)
  const { photoURL } = useSelector(state => state.auth?.user)

  const _comments = reduxComments ? reduxComments.map(
    comment => comment.snippet.topLevelComment.snippet
  ) : []

  useEffect(() => {
    if (_comments.length > 0) {
      setComments(_comments);
      localStorage.setItem('comments-${videoId}', JSON.stringify(_comments));
    }
  }, [_comments, videoId]);

  const [text, setText] = useState('')

  const handleComment = e => {
    e.preventDefault()
    if (text.length === 0) return
    dispatch(addComment(videoId, text))
    setText('')
  }

  return (
    <div className='comments'>
      <p>{totalComments} Comments</p>
      <div className='comments__form d-flex w-100 my-2'>
        <img src={photoURL}
          alt='avatar'
          className='mr-3 rounded-circle' />
        <form
          onSubmit={handleComment}
          className='d-flex flex-grow-1'>
          <input type="text"
            className='flex-grow-1'
            placeholder='Write a comment...'
            value={text}
            onChange={e => setText(e.target.value)} />
          <button className='border-0 p-2'>Comment</button>
        </form>
      </div>
      <div className='comments__list'>
        {
          comments?.map((comment, i) => (
            <Comment comment={comment} key={i} />
          ))
        }
      </div>
    </div>
  )
}

export default Comments