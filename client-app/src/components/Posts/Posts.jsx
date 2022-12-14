import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Posts.css';
import Post from '../Post/Post';
import { useEffect } from 'react';
import { getUserPosts } from '../../reducers/postReducer';

function Posts() {
    const { postData, loading } = useSelector(state => state.post);
    const { _id: id } = useSelector(state => state.auth.authData.user)    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserPosts(id))
    }, [])
    return (
        <div className="Posts">
            {loading ? (<p style={{ alignSelf: "center" }}>Fetchig Posts...</p>) : postData.map((post, id) => (
                <Post data={post} key={id} />
            ))}
        </div>
    )
}

export default Posts