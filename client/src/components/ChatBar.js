import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ChatRoom.css';
import { SlEnvolope } from "react-icons/sl";

const ChatBar = ({ socket, setSelectedGroupId }) => {
    const [groups, setGroups] = useState([]);


    const userId = 1;
    useEffect(() => {
        axios.get(`http://localhost:3001/groups/byUser/${userId}`).then((res) => {
            setGroups(res.data);
        })
    }, [socket]);

    const handleGroupClick = (groupId) => {
        setSelectedGroupId(groupId);
        socket.emit('join group', groupId); // Emitting an event when a group is selected
    };


    return (
        <div className="chat__sidebar">
            <h2><SlEnvolope />&nbsp;Your Groups</h2>

            <div>
                <h4 className="chat__header"></h4>
                <div className="chat__users">
                    {groups.map(group => (
                        <p key={group.id} onClick={() => handleGroupClick(group.id)}>
                            {group.groupName} ({group.subject})
                        </p>
                    ))}
                </div>
            </div>

            <div className='group-name'>
                {groups.map(group => (
                    <h2>{group.groupName}</h2>
                ))}
                {/* <h2>da</h2> */}
            </div>
        </div>

    );
};

export default ChatBar;