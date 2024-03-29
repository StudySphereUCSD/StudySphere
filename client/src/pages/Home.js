import Logo from '../Logo1.svg';
import Logo2 from '../Logo2.svg';
import React from 'react'
import './Home.css';
import { NavBar } from "../components/NavBar";
import { Footer } from '../components/Footer';


export const Home = () => {
    return (
        <div>
            <div className='navbar'>
                <a href='/'><img className='logo' src={Logo} alt="" /></a>

                <a className='login' href="login">Log in</a>
            </div>

            <div className='main'>
                <div className='mainText'>
                    <h1>Welcome to <br /> STUDYSPHERE</h1>
                </div>
                <img className='logo2' src={Logo2} alt="" />

                <div className='subText'>
                    <h2>Unlock the door to limitless learning with STUDYSPHERE:</h2>
                    <h3>Your virtual Study Community</h3>
                </div>

            </div>



            {/* <Footer /> */}
        </div>

    );
}