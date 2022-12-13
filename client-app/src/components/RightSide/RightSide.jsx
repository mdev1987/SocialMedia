import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RightSide.css';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';

function RightSide() {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="/home"><img hin src={Home} alt="home" /></Link>
        <UilSetting />
        <img src={Noti} alt="notification" />
        <img src={Comment} alt="comment" />
      </div>
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened}
        setModalOpened={setModalOpened} />
    </div>
  )
}

export default RightSide