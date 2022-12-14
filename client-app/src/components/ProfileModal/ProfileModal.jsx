import React from 'react'
import './ProfileModal.css';
import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { DefaultCover, DefaultProfile, HOST } from '../../consts/apiRoute';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateProfile } from '../../reducers/authReducer';

function ProfileModal({ modalOpened, setModalOpened, data }) {
    const theme = useMantineTheme();
    const [profileInfo, setProfileInfo] = useState(data);
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPicture, setCoverPicture] = useState(null);
    const params = useParams();
    const coverRef = useRef(null);
    const profileRef = useRef(null);
    const dispatch = useDispatch();
    const handleOnChange = (event) => {
        setProfileInfo({
            ...profileInfo,
            [event.target.name]: event.target.value
        })
    }
    const handleImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            if (event.target.name === 'profilePicture') {
                setProfilePicture(event.target.files[0])
            } else if (event.target.name === 'coverPicture') {
                setCoverPicture(event.target.files[0])
            }
        }
    }
    const resetForm = () => {
        setProfileInfo(data);
        setProfilePicture(null);
        setCoverPicture(null);
    }

    const handleSubmitData = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('firstname', profileInfo.firstname)
        formData.append('lastname', profileInfo.lastname);
        formData.append('worksAt', profileInfo.worksAt);
        formData.append('livesin', profileInfo.livesin);
        formData.append('country', profileInfo.country);
        formData.append('relationship', profileInfo.relationship);
        formData.append('currentUserId', profileInfo._id);
        formData.append('currentUserAdminStatus', profileInfo.isAdmin);
        profilePicture && formData.append('profilePicture', profilePicture, `${Date.now()} ${profilePicture.name}`);
        coverPicture && formData.append('coverPicture', coverPicture, `${Date.now()} ${coverPicture.name}`);
        dispatch(updateProfile({ userId: params.id, formData })).then(() => {
            setModalOpened(false);
            setProfilePicture(null);
            setCoverPicture(null);
        })
    }

    return (
        <Modal
            opened={modalOpened}
            onClose={() => {
                setModalOpened(false)
                resetForm()
            }}
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            size={'55%'}
            overlayBlur={3}>
            <form className='infoForm' onSubmit={handleSubmitData}>
                <h3>Your Info</h3>
                <div>
                    <input
                        type="text"
                        className='infoInput'
                        name="firstname"
                        placeholder='First Name'
                        value={profileInfo.firstname}
                        onChange={handleOnChange}
                    />

                    <input
                        type="text"
                        className='infoInput'
                        name="lastname"
                        placeholder='Last Name'
                        value={profileInfo.lastname}
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className='infoInput'
                        name="worksAt"
                        placeholder='Works at'
                        value={profileInfo.worksAt}
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className='infoInput'
                        name="livesin"
                        placeholder='Lievs In'
                        value={profileInfo.livesin}
                        onChange={handleOnChange}
                    />

                    <input
                        type="text"
                        className='infoInput'
                        name="country"
                        placeholder='Country'
                        value={profileInfo.country}
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className='infoInput'
                        name="relationship"
                        placeholder='Relationship Status'
                        value={profileInfo.relationship}
                        onChange={handleOnChange}
                    />
                </div>

                <div className='img'>
                    <img src={profilePicture ?
                        URL.createObjectURL(profilePicture) :
                        profileInfo.profilePicture ?
                            `${HOST}/${profileInfo.profilePicture.replace('public/', '')}` :
                            DefaultProfile} />
                    <input style={{ display: 'none' }}
                        ref={profileRef} type="file"
                        name="profilePicture"
                        onChange={handleImageChange} />
                    <button onClick={(event) => { event.preventDefault(); profileRef.current.click() }}
                        className='button infoButton'>Profile</button>
                    <img src={coverPicture ?
                        URL.createObjectURL(coverPicture) :
                        profileInfo.coverPicture ?
                            `${HOST}/${profileInfo.coverPicture.replace('public/', '')}` :
                            DefaultCover} />
                    <input style={{ display: 'none' }}
                        ref={coverRef}
                        type="file" name="coverPicture"
                        onChange={handleImageChange} />
                    <button onClick={(event) => { event.preventDefault(); coverRef.current.click() }}
                        className='button infoButton'>Cover</button>
                </div>

                <button className='button infoButton'>Update</button>
            </form>
        </Modal>
    )
}

export default ProfileModal