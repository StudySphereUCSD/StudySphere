import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ChatRoom.css';

const ChatBar = ({ socket, setSelectedGroupId }) => {
    const [groups, setGroups] = useState([]);


    const userId = 1;
    useEffect(() => {
        axios.get(`http://localhost:3001/groups/byUser/${userId}`).then((res) => {
            setGroups(res.data);
        })
    }, [socket]);

    const handleGroupClick = (groupId) => {
        setSelectedGroupId(groupId); // This updates the selected group in the parent component

    };


    return (
        <div className="chat__sidebar">
            <h2>Open Chat</h2>

            <div>
                <h4 className="chat__header">YOUR GROUPS</h4>
                <div className="chat__users">
                    {groups.map(group => (
                        <p key={group.id} onClick={() => handleGroupClick(group.id)}>
                            {group.groupName} ({group.subject})
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatBar;