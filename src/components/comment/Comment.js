import React from 'react'
import moment from 'moment'
import './_comment.scss'

const Comment = ({ comment }) => {

  const {
      authorDisplayName,
      authorProfileImageUrl,
      publishedAt,
      textDisplay,
   } = comment
  return (
    <div className='p-2 comment d-flex'>
      <img src={authorProfileImageUrl}
          alt='avatar'
              className='mr-3 rounded-circle' />
          <div className='comment__body'>
            <p className='comment__header mb-1'>
               {authorDisplayName} • {moment(publishedAt).fromNow()}
            </p>
        <p className='mb-0'>{textDisplay}</p>
         </div>
    </div>
  )
}

export default Comment
