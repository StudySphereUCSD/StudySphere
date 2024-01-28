import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import io from 'socket.io-client';
import './Chat.css';
import ChatBar from '../components/ChatBar';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';

const socket = io.connect("http://localhost:3001");

export const Chat = () => {
    // Room States
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedGroupName, setSelectedGroupName] = useState(null);
    
    // // Function to update selectedGroupName state
    // const updateSelectedGroupName = (groupName) => {
    //     setSelectedGroupName(groupName);
    //     alert(groupName);
    // };

    return (
        <div className='scrollable-div'>
            <NavBar />
            <div className="chat">
                <ChatBar
                socket={socket}
                setSelectedGroupId={setSelectedGroupId}
                setSelectedGroupName={setSelectedGroupName}
                // Fix the prop name
            />
                <div className="chat__main">
                    <ChatBody
                        socket={socket}
                        selectedGroupId={selectedGroupId}
                        selectedGroupName={selectedGroupName}
                         // Pass the group name as a prop
                    />
                    <ChatFooter socket={socket} selectedGroupId={selectedGroupId} />
                </div>
            </div>
        </div>
    );
};
