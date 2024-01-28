import React from 'react'
import { NavBar } from "../components/NavBar";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Group.css'
import axios from 'axios';

export const Group = () => {
    let { id } = useParams();
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3001/users/byGroup/${id}`).then((response) => {
            setUserList(response.data);
        });
    }, []);
    return (
        <div>
            <div className='navBar'>
                <NavBar />
            </div>
            <h3 className = 'userListTitle'>User List: </h3>
            <div className = 'userListContainer'>
            {userList.map((user, key) => {
                return (
                    <div className='userContainer' >
                        <p className = 'userName'>{user.name}</p>
                    </div>
                );
            })}
            </div>
            <div className = 'chatContainer'>Chat Box</div>
        </div>
    );
}