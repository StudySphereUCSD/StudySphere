const express = require('express');
const router = express.Router();
const {Groups} = require('../models');

router.get('/', async (req, res) => {
    const groupList = await Groups.findAll();
    res.json(groupList);
});

router.post('/', async (req, res) => {
    const group = req.body;
    const newGroup = await Groups.create(group);
    res.json(newGroup.id);
});

router.get('/byID/:id', async (req, res) => {
    const group = await Groups.findByPk(req.params.id);
    res.json(group);
});

router.get('/newest', async (req, res) => {
    try {
        const newestGroup = await Groups.findOne({
            order: [['createdAt', 'DESC']], // Order by creation date in descending order
            limit: 1 // Limit the result to one group
        });
        
        res.json(newestGroup);
    } catch (error) {
        console.error('Error fetching newest group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/byID/:id', async (req, res) => {
    const groupId = req.params.id;
    Groups.destroy({
        where: {
            id: groupId
        }
    });
    res.json(`${groupId} deleted from the database`);
});

router.get('/byLeader/:name', async (req, res) => {
    const name = req.params.name;
    const groups = await Groups.findAll({
        where: {
            leader: name  // Assuming 'leader' is the field for the leader's name
        }
    });
    res.json(groups);
});

router.get('/byUser/:id', async (req, res) => {
    console.log("hi");
    const userId = req.params.id;
    const groups = await Groups.findAll({
        where: {
            UserId: userId
        }
    });
    res.json(groups);
})

module.exports = router;