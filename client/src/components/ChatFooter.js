import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatFooter = ({ socket, selectedGroupId }) => {
    const [message, setMessage] = useState('');
    const [me, setMe] = useState(null);


    useEffect(() => {
        axios.get(`http://localhost:3001/users/1`)
            .then((res) => {
                const userData = res.data;
                setMe(userData.name); // Assuming your user object has a "name" property
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

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
