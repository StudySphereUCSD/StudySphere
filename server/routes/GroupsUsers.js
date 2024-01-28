const express = require('express');
const router = express.Router();
const db = require('../models');
const {Groups_Users} = require('../models');

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

router.get('/byUser/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Find all GroupIds associated with the given userId
        const groupIds = await Groups_Users.findAll({
            where: { UserId: userId },
            attributes: ['GroupId'] // Select only GroupId column
        });

        if (groupIds.length === 0) {
            return res.status(404).json({ error: 'No groups found for the user' });
        }

        // Extract GroupIds from the result
        const groupIdsArray = groupIds.map(group => group.GroupId);

        // Find all groups associated with the extracted GroupIds
        const groups = await db.Groups.findAll({
            where: { id: groupIdsArray } // Find groups with ids in the extracted array
        });

        res.status(200).json(groups);
    } catch (error) {
        console.error('Error finding groups for user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/byGroup/:groupId', async (req, res) => {
    const { groupId } = req.params;
    try {
        const userIds = await Groups_Users.findAll({
            where: { GroupId: groupId },
            attributes: ['UserId'] 
        });
        if (userIds.length === 0) {
            return res.status(404).json({ error: 'No users found for the group' });
        }
        const userIdsArray = userIds.map(user => user.UserId);
        const users = await db.Users.findAll({
            where: { id: userIdsArray }
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error finding users for group:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;