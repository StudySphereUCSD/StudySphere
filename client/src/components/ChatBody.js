import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ChatBody = ({ socket, selectedGroupId ,selectedGroupName}) => {
    const [chats, setChats] = useState([]);
    const [me, setMe] = useState(null);

    useEffect(() => {
        const receiveMessage = (newMessage) => {
            setChats(currentChats => [...currentChats, newMessage]);
        };

        socket.on('new message', receiveMessage);

        return () => {
            socket.off('new message', receiveMessage);
        };
    }, [socket]);

    const [userData, setUserData] = useState({ name: '', email: '', picture: '' });
    const location = useLocation();

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const user = JSON.parse(storedUserData);
            setUserData(user);
            setMe(user.name);
        } else if (location.state) {
            const { name, email, picture } = location.state;
            setUserData({ name, email, picture });
            localStorage.setItem('userData', JSON.stringify({ name, email, picture }));
            setMe(name);
        }
    }, [location.state]);

    useEffect(() => {
        if (selectedGroupId) {
            axios.get(`http://localhost:3001/chats/${selectedGroupId}`)
                .then((res) => {
                    setChats(res.data);
                })
                .catch((error) => {
                    console.error('Error fetching chat messages:', error);
                });
        }
    }, [socket, selectedGroupId]);

    return (
        <>
            <header className="chat__mainHeader">
                <h2>{selectedGroupName} Chat</h2>
                {/* Additional header content if needed */}
            </header>

            <div className="message__container">
                {chats.map((chat) => {
                    const isMe = chat.name === me;
                    return (
                        <div className="message__chats" key={chat.id}>
                            {isMe ? (
                                <p className="sender__name">You</p>
                            ) : (
                                <p>{chat.name}</p>
                            )}
                            <div className={isMe ? 'message__sender' : 'message__recipient'}>
                                <p>{chat.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ChatBody;
