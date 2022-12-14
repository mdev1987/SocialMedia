import React, { useEffect, useState } from 'react';
import './FollowersCard.css'
import { Followers } from '../../data/FollowersData';
import User from '../User/User';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../reducers/userReducer';

function FollowersCard() {
    const { usersData } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth.authData);
    useEffect(() => {
        dispatch(getUsers());
    }, [])
    return (
        <div className="FollowerCard">
            <h3>People you may know</h3>
            {
                usersData.filter(person => person._id !== user._id)
                    .map((person, index) => (
                        <User person={person} key={index} />
                    ))
            }
        </div>
    )
}

export default FollowersCard