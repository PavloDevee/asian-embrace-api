require('module-alias/register');
const mongoose = require('mongoose');
const express = require('express');
const { globSync } = require('glob');
const path = require('path');
const https = require('https');
const socketIo = require('socket.io');
const http = require('http');
const fs = require('fs');
const chatController = require('../src/controllers/chatController');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 20) {
  console.log('Please upgrade your node.js version at least 20 or greater. 👌\n ');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', (error) => {
  console.log(
    `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
  );
  console.error(`2. 🚫 Error → : ${error.message}`);
});

const modelsFiles = globSync('./src/models/**/*.js');

for (const filePath of modelsFiles) {
  require(path.resolve(filePath));
}

// Start our app!
const router = require('./app');
const app = express();
app.use('/', router);
app.set('port', process.env.PORT || 8888);

let server;

if (process.env.IS_SSL == "true") {
  const privKeyPath = "/home/ssl/privkey.pem";
  const certPath = "/home/ssl/fullchain.pem";
  if (fs.existsSync(privKeyPath) && fs.existsSync(certPath)) {
    const privateKey = fs.readFileSync(privKeyPath, "utf8");
    const certificate = fs.readFileSync(certPath, "utf8");
    const options = {
      key: privateKey,
      cert: certificate,
    };
    server = https.createServer(options, app);
  } else {
    console.warn("SSL files not found, falling back to HTTP server.");
    server = http.createServer(app);
  }
} else {
  server = http.createServer(app);
}

const SOCKET_URL = process.env.SOCKET_URL;

const io = socketIo(server, {
  cors: {
    origin: SOCKET_URL,
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['my-custom-header'],
  },
});

let users = {}; // Store connected users with their socket IDs

// Socket.io connection handling
io.on('connection', (socket) => {

  socket.on('online', async (req) => {
    // const reqNew = JSON.parse(req);
    req.socket_id = socket.id;
    req.is_online = 1;
    users[req.sender_id] = socket.id;
    const result = await chatController.onlineOrOffline(req);
    io.to(socket.id).emit('onlineResponse', result)
  });

  // Handle call event
  socket.on("callUser", ({ from, to, mettingId, meetingType }) => {
    console.log("usersusersusersusers", mettingId);
    
    if (users[to]) {
      io.to(users[to]).emit("incomingCall", { from, mettingId, meetingType });
      console.log(`Call sent from ${from} to ${to}`);
    } else {
      io.to(socket.id).emit("callFailed", { message: "User is offline" });
    }
  });

  // Handle call rejection
  socket.on("rejectCall", ({ from, to }) => {
    if (users[from]) {
      io.to(users[from]).emit("callRejected", { message: `${to} rejected your call` });
    }
  });

  // Handle call acceptance
  socket.on("acceptCall", ({ from, to }) => {
    if (users[from]) {
      io.to(users[from]).emit("callAccepted", { message: `${to} accepted your call` });
    }
  });

  // Handle meeting end event
  socket.on("endMeeting", ({ from, to, meetingId }) => {
    // console.log(`📴 Meeting ${meetingId} ended by ${from}`);

    if (users[to]) {
      io.to(users[to]).emit("meetingEnded", { from, meetingId });
    }
    io.to(users[from]).emit("meetingEnded", { from, meetingId });
  });

  socket.on('disconnect', async () => {
    let disconnectedUserId = null;
    // Find the user associated with this socket.id to remove from the in-memory store
    for (const userId in users) {
      if (users[userId] === socket.id) {
        disconnectedUserId = userId;
        delete users[userId];
        console.log(`User ${userId} with socket ${socket.id} removed from in-memory store.`);
        break;
      }
    }

    const req = {
      socket_id: socket.id,
      is_online: 0,
      // If disconnectedUserId was found, we could pass it to chatController
      // if it needs the sender_id for more specific offline logic, but
      // onlineOrOffline seems to correctly use socket_id to find the user.
      // sender_id: disconnectedUserId 
    }
    // Update user status in the database
    await chatController.onlineOrOffline(req);
    console.log(`Socket ${socket.id} disconnected. User (if mapped) marked offline.`);
    
    // Emitting to socket.id after disconnect is generally not useful.
    // If you need to notify other users about this user going offline,
    // you would typically broadcast or emit to specific rooms/users.
    // For example, if disconnectedUserId is known:
    // if (disconnectedUserId) {
    //   socket.broadcast.emit('userOffline', { userId: disconnectedUserId });
    // }
  });
});

server.listen(app.get('port'), () => {
  console.log(`Express running${process.env.IS_SSL == "true" ? ' securely' : ''} → On PORT : ${server.address().port}`);
});


