const express = require('express');
const router = express.Router();
const { Chats } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', async (req, res) => {
    const chatList = await Chats.findAll();
    res.json(chatList);
});

// router.post('/', validateToken, async (req, res) => {
//     const chat = req.body;
//     await Chats.create(chat);
//     res.json(chat);
// });

router.post('/', async (req, res) => {
    const chat = req.body;
    await Chats.create(chat);
    res.json(chat);
});

router.get('/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    try {
        const chatList = await Chats.findAll({
            where: { GroupId: groupId }
            // If you need to include more details (like user info), you can use 'include'
        });
        res.json(chatList);
    } catch (error) {
        // It's good practice to handle errors
        res.status(500).send(error.message);
    }
});

module.exports = router;