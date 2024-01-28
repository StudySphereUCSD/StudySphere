import React, { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import './Dashboard.css';
import { SlPencil } from "react-icons/sl";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { Timer } from '../components/Timer';
import { TimerSetting } from '../components/TimerSetting';
import SettingsContext from '../components/SettingsContext';

export const Dashboard = () => {
    const [groups, setGroups] = useState([]);
    const [userData, setUserData] = useState({ name: '', email: '', picture: '' });
    const [userId, setUserId] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [studyMinuites, setStudyMinuites] = useState(45);
    const [breakMinuites, setBreakMinuites] = useState(15);

    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check local storage first
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const user = JSON.parse(storedUserData);
            setUserData(user);
            fetchUserId(user.email);
        } else if (location.state) {
            // If not in local storage, use location state and update local storage
            const { name, email, picture } = location.state;
            setUserData({ name, email, picture });
            localStorage.setItem('userData', JSON.stringify({ name, email, picture }));
            fetchUserId(email);
        }
    }, [location.state]);

    const fetchUserId = (email) => {
        if (email) {
            axios.get(`http://localhost:3001/users/byEmail/${email}`)
                .then((res) => {
                    setUserId(res.data.userId);
                })
                .catch(error => console.error('Error fetching userId:', error));
        }
    };

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3001/groupsUsers/byUser/${userId}`)
                .then((res) => {
                    setGroups(res.data);
                })
                .catch(error => console.error('Error fetching groups:', error));
        }
    }, [userId]);

    const data = [
        { weekday: 1, hours: 6 },
        { weekday: 2, hours: 2 },
        { weekday: 3, hours: 5 },
        { weekday: 4, hours: 3 },
        { weekday: 5, hours: 7 },
        { weekday: 6, hours: 4 },
        { weekday: 7, hours: 1 }
        // ... other data
    ];

    return (
        <div>
            <div className='navBar'>
                <NavBar />
            </div>
            <div className='profile'>
                <h1>Hello {userData.name} 👋</h1>
                <div className='profileItem'>
                    <div className='profilePic'>
                        <img src={userData.picture} alt="user" />
                    </div>
                    <div className='profileText'>
                        <h3>
                            Name:<br />
                            {userData.name}<br />
                            <br />
                            Email:<br />
                            {userData.email}<br />
                        </h3>
                    </div>
                </div>
                <div className='button-box'>
                    <button className='edit-button'><SlPencil /> &nbsp;EDIT</button>
                </div>



            </div>
            <div className='myGroup'>
                <h2>My Groups</h2>
                {groups.map((group, key) => {
                    return (
                        <div
                            className='groupContainerBox'
                            key={group.id}
                            onClick={() => {
                                navigate(`/group/${group.id}`)
                            }}
                        >
                            <h3 className='groupbox' >{group.groupName}</h3>
                        </div>
                    );
                })}
            </div>
            <div className='stat'>
                <h2>Study Statistics</h2>
                <VictoryChart
                    width={380} // Set the desired width
                    height={200}
                    // adding the material theme provided with Victory
                    theme={VictoryTheme.material}
                    domainPadding={0}
                    padding={{ top: 30, bottom: 60, left: 45, right: 50 }}
                >
                    <VictoryAxis
                        tickValues={[1, 2, 3, 4, 5, 6, 7]}
                        tickFormat={["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]}
                        style={{
                            tickLabels: { fontSize: 7 }, // Adjust tick label font size
                            axisLabel: { fontSize: 12 }   // Adjust axis label font size if you have one
                        }}
                    />
                    <VictoryAxis
                        // padding={{ top: 20, bottom: 60 }}
                        padding={{ top: 10, bottom: 60 }}
                        offsetX={20}
                        style={{
                            tickLabels: { fontSize: 7 }, // Adjust tick label font size
                            axisLabel: { fontSize: 12 }   // Adjust axis label font size if you have one
                        }}


                        dependentAxis
                        tickFormat={(x) => (`${x}H`)}
                    />
                    <VictoryBar
                        height={400}
                        barWidth={35}
                        barRatio={1}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}

                        data={data}
                        x="weekday"
                        y="hours"
                        style={{ data: { fill: "#c43a31", stroke: "black", strokeWidth: 1.5 } }}
                    />
                </VictoryChart>
            </div>

            <div className='timer' >
                <div className='timer-containers'>
                    <h2>Study Timer</h2>

                    <SettingsContext.Provider value={{
                        showSettings,
                        setShowSettings,
                        studyMinuites,
                        breakMinuites,
                        setStudyMinuites,
                        setBreakMinuites
                    }}>

                        {showSettings ? <TimerSetting /> : <Timer />}
                    </SettingsContext.Provider>
                </div>
                <div className='line' />

            </div>


        </div>

    );
}