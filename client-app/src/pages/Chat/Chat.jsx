import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';
import { useSelector, useDispatch } from 'react-redux';
import Conversation from '../../components/Conversation/Conversation';
import LogoSearch from '../../components/LogoSearch/LogoSearch';
import { receiveMessage, userChats } from '../../reducers/chatReducer';
import './Chat.css';
import ChatBox from '../../components/ChatBox/ChatBox';
import { HOST } from '../../consts/apiRoute';

function Chat() {
    const chats = useSelector(state => state.chat.chatData);
    const { user } = useSelector(state => state.auth.authData);
    const dispatch = useDispatch();
    const socket = useRef();
    const [onlineUsers, setOnlineUsers] = useState([])
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null)
    useEffect(() => {
        socket.current = io(HOST)
        dispatch(userChats(user._id))
        socket.current.emit('new-user-add', {
            userId: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        })

        socket.current.on('get-users', users => {            
            setOnlineUsers(users)
        })

        socket.current.on('receive-message', (messageData) => {
            dispatch(receiveMessage(messageData))
        })        
    }, [])

    useEffect(() => {
        sendMessage && socket.current.emit('send-message', sendMessage)
    }, [sendMessage])

    const isOnline = (chat) => {
        const user = chat.user[0];        
        const online = onlineUsers.find(usr => usr.userId === user._id);
        return online ? true : false;
    }    

    return (
        <div className="Chat">
            <div className='Left-side-chat'>
                <LogoSearch />
                <div className='Chat-container'>
                    <h2>Chats</h2>
                    <div className='Chat-list'>
                        {chats && chats.map(chat => (
                            <div onClick={() => setCurrentChat(chat)} key={chat._id}>
                                <Conversation isOnline={isOnline(chat)} chat={chat} />
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
                    currentChat ? (<ChatBox
                        handleSendMessage={setSendMessage}
                        chat={currentChat}
                        currentUserId={user._id} />) :
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