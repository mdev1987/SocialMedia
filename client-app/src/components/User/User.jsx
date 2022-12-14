import React from 'react'
import { DefaultProfile, HOST } from '../../consts/apiRoute';
import { useSelector, useDispatch } from 'react-redux'
import { followUnfollowUser } from '../../reducers/authReducer'
import { useEffect } from 'react';
import { useState } from 'react';

function User({ person }) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth.authData);
    const handleFollow = () => {
        dispatch(followUnfollowUser({ userId: user._id, personId: person._id }));
    }
    const [isFollowing, setIsFollowing] = useState(false);
    useEffect(() => {
        if (user.followings.includes(person._id)) {
            setIsFollowing(true)
        } else {
            setIsFollowing(false);
        }
    }, [user.followings])

    return (
        <div className="follower">
            <div>
                <img src={
                    person.profilePicture ?
                        `${HOST}/${person.profilePicture.replace('public', '')}` :
                        DefaultProfile
                } alt={person.username}
                    className='followerImg' />
                <div className='name'>
                    <span>{person.username}</span>
                    <span>{person.firstname} {person.lastname}</span>
                </div>
            </div>
            <button onClick={handleFollow}
                className={isFollowing ? 'button fc-button unfollow-button' : 'button fc-button'}>
                {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    )
}

export default User