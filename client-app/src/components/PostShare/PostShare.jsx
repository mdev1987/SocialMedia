import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import './PostShare.css';
import { DefaultProfile, HOST } from '../../consts/apiRoute';
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons';
import { sharePost } from '../../reducers/postReducer';


function PostShare() {
    const [image, setImage] = useState(null);
    const imageRef = useRef(null);
    const dispatch = useDispatch()
    const { _id: id, profilePicture } = useSelector(state => state.auth.authData.user)
    const { uploading } = useSelector(state => state.post);
    const desc = useRef(null);
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setImage(img)
        }
    }

    const handlePostShare = (event) => {
        if (image) {
            const data = new FormData();
            const fileName = `${Date.now()} ${image.name}`;
            data.append('name', fileName)
            data.append('file', image);
            data.append('userId', id);
            data.append('desc', desc.current.value);
            try {
                dispatch(sharePost(data)).then(data => {
                    resetForm();
                })
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const resetForm = () => {
        setImage(null);
        desc.current.value = '';
    }

    return (
        <div className="PostShare">
            <img src={profilePicture ? `${HOST}/${profilePicture.replace('public/', '')}` : DefaultProfile} alt="Profile" />
            <div>
                <input ref={desc} required type="text" placeholder="What's hapeening" />
                <div className="postOptions">
                    <div className="option" onClick={() => imageRef.current.click()}>
                        <UilScenery /> Photo
                    </div>
                    <div className="option">
                        <UilPlayCircle /> Video
                    </div>
                    <div className="option">
                        <UilLocationPoint /> Location
                    </div>
                    <div className="option">
                        <UilSchedule /> Schedule
                    </div>
                    <button
                        disabled={uploading ? true : false}
                        onClick={handlePostShare} className='button ps-button'>
                        {uploading ? 'Uploading...' : 'Share'}
                    </button>
                    <div style={{ display: 'none' }}>
                        <input type="file" name="myImage"
                            onChange={onImageChange}
                            ref={imageRef} />
                    </div>
                </div>
                {image &&
                    <div className='previewImage'>
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="Post Image" />
                    </div>
                }
            </div>
        </div>
    )
}

export default PostShare