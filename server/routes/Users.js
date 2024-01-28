const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const userList = await Users.findAll();
    res.json(userList);
});

router.post('/', async (req, res) => {
    const { name, email } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await Users.findOne({
            where: {
                email: email
            }
        });

        if (existingUser) {
            // Email already exists, send a response indicating that the user already exists
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Email does not exist, create a new user
        await Users.create({
            name: name,
            email: email
        });

        // Send a success response
        res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
        // Handle any errors that occur during the database operation
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    res.json(user);
});

router.post('/login', async (req, res) => {
    const {password, email} = req.body;
    const user = await Users.findOne({
        where: {email: email}
    });
    if (!user) res.json({error: "Wrong username or password"});
    bcrypt.compare(password, user.password).then((match)=>{
        if(!match) res.json({error: "Wrong username or password"});

        const accessToken = sign({email: user.email, id: user.id },"secret");
        res.json(accessToken);
    });
});

router.get('/byGroup/:id', async (req, res) => {
    const groupId = req.params.id;
    const users = await Users.findAll({
        where: {
            GroupId: groupId
        }
    });
    res.json(users);
})

module.exports = router;