import React from 'react';
import Logo from '../Logo1.svg';
import './NavBar.css';
import { SlHome } from "react-icons/sl";
import { SlCompass } from "react-icons/sl";
import { SlBubbles } from "react-icons/sl";
import { googleLogout} from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const navigate = useNavigate();
    const logOut = () => {
        googleLogout();
        navigate('/');
        //setProfile(null);
    };
    const create = () => {
        navigate('/creategroup');
        //setProfile(null);
    };
    return (
        <div className='navbar'>
            <img className='logo' src={Logo} alt="" />

            <div className='buttons'>
                <button className='logout-button' onClick={logOut}>Log Out</button>
                <button className='create-button' onClick={create}>Create New Group</button>

                <a href="/dashboard"><SlHome /></a>
                <a href="/findgroup"><SlCompass /></a>
                <a href="/chat"><SlBubbles /></a>
            </div>
        </div>

    );
}