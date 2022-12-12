import React from 'react';
import './FollowersCard.css'
import { Followers } from '../../data/FollowersData';

function FollowersCard() {
    return (
        <div className="FollowerCard">
            <h3>Who is following you?</h3>
            {
                Followers.map((follower, index) => (
                    <div key={index} className="follower">
                        <div>
                            <img src={follower.img} alt="Follower"
                                className='followerImg' />
                            <div className='name'>
                                <span>{follower.name}</span>
                                <span>{follower.username}</span>
                            </div>
                        </div>
                        <button className='button fc-button'>Follow</button>
                    </div>
                ))
            }
        </div>
    )
}

export default FollowersCard