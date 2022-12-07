import React, { useState, useRef } from 'react'
import './PostShare.css';
import ProfileImage from '../../img/profileImg.jpg';
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons';

function PostShare() {
    const [image, setImage] = useState(null);
    const imageRef = useRef(null);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setImage(URL.createObjectURL(img))
        }
    }
    return (
        <div className="PostShare">
            <img src={ProfileImage} alt="Profile" />
            <div>
                <input type="text" placeholder="What's hapeening" />
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
                    <button className='button ps-button'>
                        Share
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
                        <img src={image} alt="Post Image" />
                    </div>
                }
            </div>
        </div>
    )
}

export default PostShare