import React from 'react'
import ProfileSide from '../../components/ProfileSide/ProfileSide';
import './Home.css';

function Home() {
    return (
        <div className='Home'>
            <ProfileSide />
            <div className="postSide">Posts</div>
            <div className="rightSide">Right Side</div>
        </div>
    )
}

export default Home