import React from 'react'
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import { useState } from 'react';
import ProfileModal from '../ProfileModal/ProfileModal';

function InfoCard() {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <UilPen onClick={() => setModalOpened(true)} />
        <ProfileModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened} />
      </div>

      <div className='infoBody'>
        <div className='info'>
          <span><strong>Status: </strong></span>
          <span>In Relationship</span>
        </div>

        <div className='info'>
          <span><strong>Lives in: </strong></span>
          <span>Multan</span>
        </div>

        <div className='info'>
          <span><strong>Works at: </strong></span>
          <span>Zainkeepcode inst</span>
        </div>
      </div>

      <button className='button logout-button'>Logout</button>
    </div>
  )
}

export default InfoCard