import React from 'react'
import './Posts.css';
import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post';

function Posts() {
    return (
        <div className="Posts">
            {PostsData.map((post, id) => (
                <Post data={post} key={id} />
            ))}
        </div>
    )
}

export default Posts