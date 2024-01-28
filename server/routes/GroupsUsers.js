const express = require('express');
const router = express.Router();
const db = require('../models');

// Remove user from group
router.delete('/user/:userId/group/:groupId', async (req, res) => {
    const { userId, groupId } = req.params;
    try {
        await db.Groups_Users.destroy({ where: { UserId: userId, GroupId: groupId } });
        res.status(200).json({ message: 'User removed from group successfully.' });
    } catch (error) {
        console.error('Error removing user from group:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Remove group from user
router.delete('/group/:groupId/user/:userId', async (req, res) => {
    const { groupId, userId } = req.params;
    try {
        await db.Groups_Users.destroy({ where: { UserId: userId, GroupId: groupId } });
        res.status(200).json({ message: 'Group removed from user successfully.' });
    } catch (error) {
        console.error('Error removing group from user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add user to group
router.post('/user/:userId/group/:groupId', async (req, res) => {
    const { userId, groupId } = req.params;
    try {
        await db.Groups_Users.create({ UserId: userId, GroupId: groupId });
        res.status(201).json({ message: 'User added to group successfully.' });
    } catch (error) {
        console.error('Error adding user to group:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add group to user
router.post('/group/:groupId/user/:userId', async (req, res) => {
    const { groupId, userId } = req.params;
    try {
        await db.Groups_Users.create({ UserId: userId, GroupId: groupId });
        res.status(201).json({ message: 'Group added to user successfully.' });
    } catch (error) {
        console.error('Error adding group to user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;