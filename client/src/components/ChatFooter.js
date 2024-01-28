import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState('');
    const [me, setMe] = useState(null);

    // Fetch user data with UserId 1 from your API and set "me"
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

    const handleSendMessage = (e) => {
        e.preventDefault();

        setMessage('');
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