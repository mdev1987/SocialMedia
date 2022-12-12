import React from 'react'
import './Post.css';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { HOST } from '../../consts/apiRoute';
import { useSelector } from 'react-redux';

function Post({ data }) {
    const { username } = useSelector(state => state.auth.authData.payload);    
    return (
        <div className="Post">
            <img src={`${HOST}/${data.image.replace('public/', '')}`} alt="post image" />

            <div className='postReact'>
                <img src={data.likes.length > 0 ? Heart : NotLike} alt="like" />
                <img src={Comment} alt="comment" />
                <img src={Share} alt="share" />
            </div>
            <span>{data.likes.length} likes</span>
            <div className="detail">
                <span>
                    <strong>{username}: </strong>
                    <span>{data.desc}</span>
                </span>
            </div>
        </div>
    )
}

export default Post