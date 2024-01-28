import React from 'react'
import { NavBar } from "../components/NavBar";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import './CreateGroup.css'
import axios from 'axios';
import * as Yup from 'yup';

export const CreateGroup = () => {
    const navigate = useNavigate();
    const initialValues = {
        groupName: "",
        major : "",
        subject: "",
        gradeLevel: "",
        leader : ""
    }

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/groups', data).then((res) => {
            console.log(res.data);
            navigate(`/group/${res.data}`);
        })
    }

    const validationSchema = Yup.object().shape({
        groupName: Yup.string().required('You must input a group name!'),
        major : Yup.string(),
        subject: Yup.string(),
        gradeLevel: Yup.string(),
        leader : Yup.string()
    })

    return (
        <div>
            <div className='navBar'>
                <NavBar />
            </div>
            <h2 className = 'createGroupTitle'>Create Group</h2>
            <div className = 'createGroupContainer'>
                <Formik 
                    initialValues = {initialValues}
                    onSubmit = {onSubmit}
                    validationSchema = {validationSchema}>
                    <Form>
                        <div className="formField">
                        <label>Group Name: </label>
                        <ErrorMessage name='groupName' component='span'/>
                        <Field 
                            id = 'inputCreateGroup' 
                            name = 'groupName' 
                            placeholder = 'ex. CSE Group...'
                        />
                        <br/>
                        <label>Major: </label>
                        <Field 
                            id = 'inputCreateGroup' 
                            name = 'major' 
                            placeholder = 'ex. Computer Science...'
                        />
                        <br/>
                        <label>Subject: </label>
                        <Field 
                            id = 'inputCreateGroup' 
                            name = 'subject' 
                            placeholder = 'ex. CSE 100...'
                        />
                        <br/>
                        <label>Grade Level: </label>
                        <Field 
                            id = 'inputCreateGroup' 
                            name = 'gradeLevel' 
                            placeholder = 'ex. Sophomore...'
                        />
                        <br/>
                        <button type='submit'>Create</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}