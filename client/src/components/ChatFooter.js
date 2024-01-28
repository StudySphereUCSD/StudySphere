import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ChatFooter = ({ socket, selectedGroupId }) => {
    const [message, setMessage] = useState('');
    const [me, setMe] = useState(null);
    const [userData, setUserData] = useState({ name: '', email: '', picture: '' });
    const location = useLocation();

    useEffect(() => {
        // Check local storage first
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const user = JSON.parse(storedUserData);
            setUserData(user);
            setMe(user.name)
        } else if (location.state) {
            // If not in local storage, use location state and update local storage
            const { name, email, picture } = location.state;
            setUserData({ name, email, picture });
            localStorage.setItem('userData', JSON.stringify({ name, email, picture }));
            setMe(name)
        }
    }, [location.state]);

    // const handleSendMessage = (e) => {
    //     e.preventDefault();
    //     if (message.trim() !== '' && selectedGroupId) {
    //         axios.post('http://localhost:3001/chats', {
    //             name: me,
    //             text: message,
    //             GroupId: selectedGroupId
    //         })
    //             .then(response => {
    //                 console.log('Message sent:', response.data);
    //                 setMessage('');
    //             })
    //             .catch(error => {
    //                 console.error('Error sending message:', error);
    //             });
    //     }
    // };
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== '' && selectedGroupId) {
            const chatMessage = {
                name: me,
                text: message,
                GroupId: selectedGroupId
            };

            socket.emit('chat message', chatMessage); // Emitting message via socket
            setMessage('');
        }
    };

    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
};

export default ChatFooter;
