import React, { useState, useEffect } from 'react';
import { NavBar } from "../components/NavBar";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import './CreateGroup.css'
import axios from 'axios';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';

export const CreateGroup = () => {
    const [userData, setUserData] = useState({ name: '', email: '', picture: '' });
    const [userId, setUserId] = useState(null);

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
    // const navigate = useNavigate();
    const initialValues = {
        groupName: "",
        major: "",
        subject: "",
        gradeLevel: "",
        leader: "",
        // leader : userId
    }

    // const onSubmit = (data) => {
    //     axios.post('http://localhost:3001/groups', data).then((res) => {
    //         console.log(res.data);
    //         navigate(`/group/${res.data}`);
    //     })
    // }
    const onSubmit = async (data) => {
        try {
            // Post to create group
            await axios.post('http://localhost:3001/groups', data);
            const groupIdResponse = await axios.get('http://localhost:3001/groups/newest');
            const groupId = groupIdResponse.data.id; // Assuming the response contains the ID of the newest group
            // const userId = "1";
            await axios.post(`http://localhost:3001/groupsUsers/user/${userId}/group/${groupId}`);

            // Navigate
            navigate(`/group/${groupId}`);
        } catch (error) {
            console.error('Error creating group:', error);
        }
    }

    const validationSchema = Yup.object().shape({
        groupName: Yup.string().required('You must input a group name!'),
        major: Yup.string(),
        subject: Yup.string(),
        gradeLevel: Yup.string(),
        leader: Yup.string()
    })

    return (
        <div>
            <div className='navBar'>
                <NavBar />
            </div>
            <h2 className='createGroupTitle'>Create Group</h2>
            <div className='createGroupContainer'>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}>
                    <Form>
                        <div className="formField">
                            <label>Group Name: </label>
                            <ErrorMessage name='groupName' component='span' />
                            <Field
                                id='inputCreateGroup'
                                name='groupName'
                                placeholder='ex. CSE Group...'
                            />
                            <br />
                            <label>Major: </label>
                            <Field
                                id='inputCreateGroup'
                                name='major'
                                placeholder='ex. Computer Science...'
                            />
                            <br />
                            <label>Subject: </label>
                            <Field
                                id='inputCreateGroup'
                                name='subject'
                                placeholder='ex. CSE 100...'
                            />
                            <br />
                            <label>Grade Level: </label>
                            <Field
                                id='inputCreateGroup'
                                name='gradeLevel'
                                placeholder='ex. Sophomore...'
                            />
                            <br />
                            <button className='create-button' type='submit'>Create</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}