import React from 'react';
import { NavBar } from '../components/NavBar';
// import socket from '../socket';
// import socket from '../utils/socket';
import io from 'socket.io-client';
import './Chat.css';
import ChatBar from '../components/ChatBar';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
import { useState } from 'react';


const socket = io.connect("http://localhost:3001");


export const Chat = () => {
    //room States
    const [selectedGroupId, setSelectedGroupId] = useState(null);





    return (
        <div>
            <NavBar />
            <div className="chat">
                <ChatBar socket={socket} setSelectedGroupId={setSelectedGroupId} />
                <div className="chat__main">
                    <ChatBody socket={socket} selectedGroupId={selectedGroupId} />
                    <ChatFooter socket={socket} selectedGroupId={selectedGroupId} />
                </div>
            </div>


        </div>
    );
}


