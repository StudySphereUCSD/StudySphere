import React, { useState, useEffect } from 'react';
import { NavBar } from "../components/NavBar";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import './CreateGroup.css'
import axios from 'axios';
import * as Yup from 'yup';
// import { useLocation } from 'react-router-dom';

export const CreateGroup = () => {
    // const location = useLocation();
    // const {email} = location.state || {};
    // const [userId, setUserId] = useState(null);

    // useEffect(() => {
    //     if (email) {
    //         // Assuming you have an endpoint on your server to fetch userId by email
    //         axios.get(`http://localhost:3001/users/byEmail/${email}`)
    //             .then((res) => {
    //                 setUserId(res.data.userId); // Use res.data.userId instead of res.data.id
    //             })
    //             .catch(error => console.error('Error fetching userId:', error));
    //     }
    // }, [email]);
    // // const userId = "1";
    const navigate = useNavigate();
    const initialValues = {
        groupName: "",
        major: "",
        subject: "",
        gradeLevel: "",
        leader: "",
        // leader : userId
    }

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/groups', data).then((res) => {
            console.log(res.data);
            navigate(`/group/${res.data}`);
        })
    }
    // const onSubmit = async (data) => {
    //     try {
    //         // Post to create group
    //         await axios.post('http://localhost:3001/groups', data);
    //         const groupIdResponse = await axios.get('http://localhost:3001/groups/newest');
    //         const groupId = groupIdResponse.data.id; // Assuming the response contains the ID of the newest group
    //         const userId = "1";
    //         await axios.post(`http://localhost:3001/groups/byUser/${userId}`);

    //         // Navigate
    //         navigate(`/group/${groupId}`);
    //     } catch (error) {
    //         console.error('Error creating group:', error);
    //     }
    // }

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