import React from 'react'
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import { useState } from 'react';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { logOut } from '../../reducers/authReducer';

function InfoCard() {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const profileUserId = params.id;
  const { user : profileUser } = useSelector(state => state.auth.authData);  
  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/auth')
  }
  
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {profileUser._id === profileUserId &&
          <>
            <UilPen
              onClick={() => setModalOpened(true)}              
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={profileUser}
               />
          </>
        }
      </div>

      <div className='infoBody'>
        <div className='info'>
          <span><strong>Status: </strong></span>
          <span>{profileUser?.relationship ?? ''}</span>
        </div>

        <div className='info'>
          <span><strong>Lives in: </strong></span>
          <span>{profileUser?.livesin ?? ''}</span>
        </div>

        <div className='info'>
          <span><strong>Works at: </strong></span>
          <span>{profileUser?.worksAt ?? ''}</span>
        </div>
      </div>

      <button
        onClick={handleLogOut}
        className='button logout-button'
      >Logout</button>
    </div>
  )
}

export default InfoCard