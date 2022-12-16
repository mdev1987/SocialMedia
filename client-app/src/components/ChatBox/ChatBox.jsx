import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji';
import { DefaultProfile, HOST } from '../../consts/apiRoute';
import { getMessages } from '../../reducers/chatReducer';
import './ChatBox.css';
import { useState } from 'react';
import { useRef } from 'react';

function ChatBox({ chat, currentUserId }) {
    const user = chat.user[0];
    const emojiRef = useRef(null)
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState('');
    const messages = useSelector(state => state.chat.messages);
    useEffect(() => {
        dispatch(getMessages(chat._id))
    }, [chat])

    const handleOnSend = (msg) => {
        emojiRef.current.value = '';
        emojiRef.current.focus();        
    }    

    return (

        <div className="ChatBox-container">

            <div className='chat-header'>
                <div className='follower'>
                    <div>
                        <img
                            className='followerImg'
                            src={
                                user.profilePicture ?
                                    `${HOST}/${user.profilePicture.replace('public/', '')}` :
                                    DefaultProfile
                            }
                            style={{ width: '50px', height: '50px' }}
                        />
                        <div className='name' style={{ fontSize: '0.8rem' }}>
                            <span>
                                {user.firstname} {user.lastname}
                            </span>
                        </div>
                    </div>
                </div>
                <hr style={{ width: '90%', border: '0.1px solid #ececec' }} />
            </div>

            <div className='chat-body'>
                {messages && messages.map(message => (
                    <div key={message._id} className={message.senderId === currentUserId ? "message own" : "message"}>
                        <span>{message.text}</span>
                        <span>{format(message.createdAt)}</span>
                    </div>
                ))}
            </div>

            <div className='chat-sender'>
                <div>+</div>
                <InputEmoji
                    ref={emojiRef}
                    value={newMessage}
                    // cleanOnEnter
                    onEnter={handleOnSend}
                    onChange={setNewMessage}
                />
                <div onClick={handleOnSend} className='button send-button'>
                    send
                </div>
            </div>

        </div>

    )
}

export default ChatBox