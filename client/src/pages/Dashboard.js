import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import './Dashboard.css'
import { SlPencil } from "react-icons/sl";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import {
    VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme
} from 'victory';
import { SlPlus } from "react-icons/sl";
import { Timer } from '../components/Timer';
import { TimerSetting } from '../components/TimerSetting';
import SettingsContext from '../components/SettingsContext';
import { useNavigate } from 'react-router-dom';


export const Dashboard = () => {
    const [groups, setGroups] = useState([]);
    const location = useLocation();
    let navigate = useNavigate();
    const { name, email, picture } = location.state || {};
    const userId = 1;
    useEffect(() => {
        axios.get(`http://localhost:3001/groups/byUser/${userId}`).then((res) => {
            setGroups(res.data);
        })
    }, []);
    const [showSettings, setShowSettings] = useState(false);
    const [studyMinuites, setStudyMinuites] = useState(45);
    const [breakMinuites, setBreakMinuites] = useState(15);


    const data = [
        { weekday: 1, hours: 6 },
        { weekday: 2, hours: 2 },
        { weekday: 3, hours: 5 },
        { weekday: 4, hours: 3 },
        { weekday: 5, hours: 7 },
        { weekday: 6, hours: 4 },
        { weekday: 7, hours: 1 },

    ];

    return (
        <div>
            <div className='navBar'>
                <NavBar />

            </div>
            <div className='profile'>
                <h1>Hello {name} 👋</h1>
                <div className='profileItem'>
                    <div className='profilePic'>
                        <img src={picture} alt="user image" />
                    </div>
                    <div className='profileText'>
                        <h3>
                            Name:<br />
                            {name}<br />
                            <br />
                            Email:<br />
                            {email}<br />
                        </h3>
                    </div>
                </div>
                <div className='button-box'>
                    <button className='edit-button'><SlPencil /> &nbsp;EDIT</button>
                </div>



            </div>
            <div className='myGroup'>
                <h2>My Groups</h2>
                <button className='addGroup'><SlPlus /></button>
                {groups.map((group, key) => {
                    return (
                        <div 
                        className='groupContainerBox' 
                        key={group.id}
                        onClick={()=>{
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