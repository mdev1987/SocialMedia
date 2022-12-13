import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './ProfileCard.css';
import { defaultCover, defaultProfile } from '../../consts/apiRoute';

function ProfileCard() {
  const { user } = useSelector(state => state.auth.authData)
  const { postData } = useSelector(state => state.post)
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile' ? true : false;
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={user.coverPicture ?
            user.coverPicture.replace('public/', '') :
            defaultCover}
          alt="cover" />
        <img src={user.profilePicture ?
          user.profilePicture.replace('public/', '') :
          defaultProfile}
          alt="profile" />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followings.length}</span>
            <span>Followings</span>
          </div>
          {isProfilePage && (
            <>
              <div className="vl"></div>
              <div>
                <div className="follow">
                  <span>
                    {postData.filter(post => post.userId === user._id).length}
                  </span>
                  <span>Posts</span>
                </div>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {isProfilePage ? <></> : (<span><Link to="/profile">My Profile</Link></span>)}
    </div>
  )
};

export default ProfileCard