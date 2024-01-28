import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ChatBody = ({ socket, selectedGroupId }) => {
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

    // Fetch user data with UserId 1 from your API and set "me"
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

    // useEffect(() => {
    //     axios.get(`http://localhost:3001/users/1`)
    //         .then((res) => {
    //             const userData = res.data;
    //             setMe(userData.name); // Assuming your user object has a "name" property
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching user data:', error);
    //         });
    // }, []);

    // Fetch chat messages based on the selected GroupId
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
                {/* Header content */}
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
