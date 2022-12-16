import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';
import { useSelector, useDispatch } from 'react-redux';
import Conversation from '../../components/Conversation/Conversation';
import LogoSearch from '../../components/LogoSearch/LogoSearch';
import { userChats } from '../../reducers/chatReducer';
import './Chat.css';
import ChatBox from '../../components/ChatBox/ChatBox';
import { useState } from 'react';

function Chat() {
    const chats = useSelector(state => state.chat.chatData);
    const { user } = useSelector(state => state.auth.authData);
    const dispatch = useDispatch();
    const [currentChat, setCurrentChat] = useState(null);
    useEffect(() => {
        dispatch(userChats(user._id))
    }, [])
    return (
        <div className="Chat">
            <div className='Left-side-chat'>
                <LogoSearch />
                <div className='Chat-container'>
                    <h2>Chats</h2>
                    <div className='Chat-list'>
                        {chats && chats.map(chat => (
                            <div onClick={() => setCurrentChat(chat)} key={chat._id}>
                                <Conversation chat={chat} />
                                <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='Right-side-chat'>
                <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
                    <div className="navIcons">
                        <Link to="/home"><img src={Home} alt="home" /></Link>
                        <UilSetting />
                        <img src={Noti} alt="notification" />
                        <Link to="/chat">
                            <img src={Comment} alt="comment" />
                        </Link>
                    </div>
                </div>
                {
                    currentChat ? (<ChatBox chat={currentChat} currentUserId={user._id} />) :
                        (<div
                            style={{ margin: 'auto' }}>
                            <h2>Select a chat to start conversation</h2>
                        </div>)
                }
            </div>
        </div>
    )
}

export default Chat