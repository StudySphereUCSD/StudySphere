import React from 'react';
import { NavBar } from '../components/NavBar';
import axios from 'axios';
import './FindGroup.css'
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


export const FindGroup = () => {
    const [groupList, setGroupList] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/groups').then((res)=>{
            setGroupList(res.data);
        });
    }, []);

    return (
        <div>
            <NavBar />
            <h1>FindGroup</h1>
            <div className="groupContainerWrapper">
            {groupList.map((group, key) => {
                return (
                    <div 
                    className='groupContainer' 
                    key={group.id}
                    onClick={()=>{
                        navigate(`/group/${group.id}`)
                    }}
                    >
                        <h3 className = 'groupName'>{group.groupName}</h3>
                        <div className='infoContainer'>
                            <p className = 'info'>Major: {group.major}</p>
                            <p className = 'info'>Subject: {group.subject}</p>
                            <p className = 'info'>Grade Level: {group.gradeLevel}</p>
                            {/* <p className = 'info'>Leader: {group.leader}</p> */}
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
}