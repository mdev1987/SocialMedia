import React from 'react'
import { DefaultProfile, HOST } from '../../consts/apiRoute';

function Conversation({ chat, isOnline }) {
  const user = chat.user[0];  
  return (
    <>
      <div className='follower conversation'>
        <div>
          {isOnline && <div className='online-dot'></div>}
          <img className="followerImg" src={
            user.profilePicture ?
              `${HOST}/${user.profilePicture.replace('public/', '')}` :
              DefaultProfile} />
          <div className='name' style={{ fontSize: '0.8rem' }}>
            <span>{user.firstname} {user.lastname}</span>
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>

    </>
  )
}

export default Conversation