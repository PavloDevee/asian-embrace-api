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
  let privateKey, certificate;
  privateKey = fs.readFileSync("/home/ssl/privkey.pem", "utf8");
  certificate = fs.readFileSync("/home/ssl/fullchain.pem", "utf8");

  const options = {
    key: privateKey,
    cert: certificate,
  };

  server = https.createServer(options, app);
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
    const req = {
      socket_id: socket.id,
      is_online: 0
    }
    const result = await chatController.onlineOrOffline(req);
    console.log('offline');
    io.to(socket.id).emit('onlineResponse', result)
  });
});

server.listen(app.get('port'), () => {
  console.log(`Express running${process.env.IS_SSL == "true" ? ' securely' : ''} → On PORT : ${server.address().port}`);
});


