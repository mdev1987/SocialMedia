import React, { useState } from 'react'
import './Post.css';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { HOST } from '../../consts/apiRoute';
import { useSelector, useDispatch } from 'react-redux';
import { likePost } from '../../reducers/postReducer';

function Post({ data }) {
    const { _id: id, username } = useSelector(state => state.auth.authData.user);
    const dispatch = useDispatch();
    const handleLike = (event) => {
        dispatch(likePost({ postId: data._id, userId: id }))
            .then(() => {
                setLiked((prev) => !prev);
                liked ? setLikes(prev => prev - 1) : setLikes(prev => prev + 1)
            })
    }
    const [liked, setLiked] = useState(data.likes.includes(id));
    const [likes, setLikes] = useState(data.likes.length);
    return (
        <div className="Post">
            <img src={`${HOST}/${data.image.replace('public/', '')}`} alt="post image" />

            <div className='postReact'>
                <img onClick={handleLike} src={liked > 0 ? Heart : NotLike} alt="like" />
                <img src={Comment} alt="comment" />
                <img src={Share} alt="share" />
            </div>
            <span>{likes} likes</span>
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