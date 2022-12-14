import React from 'react'
import { DefaultProfile, HOST } from '../../consts/apiRoute'

function User({ person }) {
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
            <button className='button fc-button'>Follow</button>
        </div>
    )
}

export default User