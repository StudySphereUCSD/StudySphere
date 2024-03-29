const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors');
const db = require('./models');

app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// const socketIO = require('socket.io')(http, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });

//Add this before the app.get() block
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        // Broadcast the message to other users in the same group
        io.to(msg.GroupId).emit('new message', msg);
    });

    socket.on('join group', (groupId) => {
        socket.join(groupId);
        // Additional logic for joining a group
    });

    // Other event handlers...
});


const setupServer = async () => {
    // Set up routes
    const groupRouter = require('./routes/Groups');
    const chatRouter = require('./routes/Chats');
    const userRouter = require('./routes/Users');
    const groupUserRouter = require('./routes/GroupsUsers');
    app.use('/groups', groupRouter);
    app.use('/chats', chatRouter);
    app.use('/users', userRouter);
    app.use('/groupsUsers', groupUserRouter);

    app.get('/', (req, res) => {
        res.send("Main page");
    });

    // const Users = sequelize.import('./models/Users');
    // const Groups = sequelize.import('./models/Groups');
    // const UserGroup = sequelize.import('./models/UserGroup');

    db.Users.belongsToMany(db.Groups, { through: db.UserGroup });
    db.Groups.belongsToMany(db.Users, { through: db.UserGroup });

    // Synchronize Sequelize models with the database
    try {
        await db.sequelize.sync();
        // Start the server
        server.listen(3001, () => {
            console.log("Server running on port 3001...");
        });
    } catch (error) {
        console.error("Error synchronizing Sequelize models:", error);
    }
};

setupServer();
