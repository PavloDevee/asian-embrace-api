require("module-alias/register");
const mongoose = require("mongoose");
const express = require("express");
const { globSync } = require("glob");
const path = require("path");
const https = require("https");
const socketIo = require("socket.io");
const http = require("http");
const fs = require("fs");
const chatController = require("../src/controllers/chatController");

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 20) {
  console.log(
    "Please upgrade your node.js version at least 20 or greater. 👌\n "
  );
  process.exit();
}

// import environmental variables from our variables.env file
require("dotenv").config({ path: ".env" });
require("dotenv").config({ path: ".env.local" });

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("error", (error) => {
  console.log(
    `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
  );
  console.error(`2. 🚫 Error → : ${error.message}`);
});

const modelsFiles = globSync("./src/models/**/*.js");

for (const filePath of modelsFiles) {
  require(path.resolve(filePath));
}

// Start our app!
const router = require("./app");
const app = express();
app.use("/", router);
app.set("port", process.env.PORT || 8888);

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
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["my-custom-header"],
  },
});

// ✅ Existing users for online status
let users = {}; // Store connected users with their socket IDs

// 🎥 New data structures for video calls
const connectedUsers = new Map(); // Store users for video calls
const activeCalls = new Map(); // Store active video calls

// Socket.io connection handling
io.on("connection", (socket) => {
  // ✅ EXISTING FUNCTIONALITY - Online status management
  socket.on("online", async (req) => {
    req.socket_id = socket.id;
    req.is_online = 1;
    users[req.sender_id] = socket.id;
    const result = await chatController.onlineOrOffline(req);
    io.to(socket.id).emit("onlineResponse", result);
  });

  // 🎥 NEW FUNCTIONALITY - Video calls management

  // User registration for video calls
  socket.on("register-user", (userData) => {
    console.log("🎥 User registered for video calls:", userData);

    // Remove any existing connections for this user
    for (const [socketId, user] of connectedUsers.entries()) {
      if (user.key === userData.key && socketId !== socket.id) {
        console.log(
          `Removing old video call connection for ${userData.name}: ${socketId}`
        );
        connectedUsers.delete(socketId);
      }
    }

    connectedUsers.set(socket.id, {
      ...userData,
      socketId: socket.id,
      status: "online",
    });

    // Join user to their own room
    socket.join(userData.key);

    // Broadcast updated user list to all clients
    io.emit("users-updated", Array.from(connectedUsers.values()));
  });

  // Initiate video call
  socket.on("initiate-call", (callData) => {
    console.log("📞 Call initiated:", callData);

    const { to, from, targetUser, meetingId, type } = callData;

    // Store active call
    activeCalls.set(meetingId, {
      ...callData,
      status: "calling",
      timestamp: Date.now(),
    });

    // Send call invitation to target user
    socket.to(to).emit("incoming-call", {
      from,
      targetUser,
      meetingId,
      type,
      timestamp: Date.now(),
    });

    console.log(
      `📞 Call from ${from.name} to ${to} with meeting ID: ${meetingId}`
    );
  });

  // Accept video call
  socket.on("accept-call", (callData) => {
    console.log("✅ Call accepted:", callData);

    const { meetingId, from } = callData;

    // Update call status
    if (activeCalls.has(meetingId)) {
      activeCalls.set(meetingId, {
        ...activeCalls.get(meetingId),
        status: "accepted",
      });
    }

    // Find the caller's socket ID
    let callerSocketId = null;
    for (const [socketId, user] of connectedUsers.entries()) {
      if (user.key === from._id || user.key === from.key) {
        callerSocketId = socketId;
        break;
      }
    }

    if (callerSocketId) {
      // Notify caller that call was accepted
      io.to(callerSocketId).emit("call-accepted", {
        meetingId,
        timestamp: Date.now(),
      });
      console.log(
        `✅ Notified caller ${from.name || from._id} that call was accepted`
      );
    } else {
      console.warn(
        `❌ Could not find caller socket ID for ${from.name || from._id}`
      );
    }
  });

  // Reject video call
  socket.on("reject-call", (callData) => {
    console.log("❌ Call rejected:", callData);

    const { meetingId, from } = callData;

    // Update call status
    if (activeCalls.has(meetingId)) {
      activeCalls.set(meetingId, {
        ...activeCalls.get(meetingId),
        status: "rejected",
      });
    }

    // Find the caller's socket ID
    let callerSocketId = null;
    for (const [socketId, user] of connectedUsers.entries()) {
      if (user.key === from._id || user.key === from.key) {
        callerSocketId = socketId;
        break;
      }
    }

    if (callerSocketId) {
      // Notify caller that call was rejected
      io.to(callerSocketId).emit("call-rejected", {
        meetingId,
        timestamp: Date.now(),
      });
      console.log(
        `❌ Notified caller ${from.name || from._id} that call was rejected`
      );
    } else {
      console.warn(
        `❌ Could not find caller socket ID for ${from.name || from._id}`
      );
    }
  });

  // End video call
  socket.on("end-call", (callData) => {
    console.log("📞 Call ended:", callData);

    const { meetingId, to, from } = callData;

    // Get call info before deletion
    const call = activeCalls.get(meetingId);

    // Remove active call
    activeCalls.delete(meetingId);

    // Notify other participant(s)
    if (to) {
      socket.to(to).emit("call-ended", {
        meetingId,
        from,
        timestamp: Date.now(),
      });
    }

    // Also notify the caller (from) to ensure both participants get the event
    if (from && from.key) {
      socket.to(from.key).emit("call-ended", {
        meetingId,
        from,
        timestamp: Date.now(),
      });
    }

    // If we have call info, notify all participants in the call
    if (call) {
      // Broadcast to all participants to ensure cleanup
      io.to(call.from.key).emit("call-ended", {
        meetingId,
        from,
        timestamp: Date.now(),
      });

      if (call.to && call.to !== call.from.key) {
        io.to(call.to).emit("call-ended", {
          meetingId,
          from,
          timestamp: Date.now(),
        });
      }
    }
  });

  // Cancel video call (before it's answered)
  socket.on("cancel-call", (callData) => {
    console.log("🚫 Call cancelled:", callData);

    const { meetingId, to } = callData;

    // Remove active call
    activeCalls.delete(meetingId);

    // Notify receiver that call was cancelled
    socket.to(to).emit("call-cancelled", {
      meetingId,
      timestamp: Date.now(),
    });
  });

  // Get online users for video calls
  socket.on("get-online-users", () => {
    socket.emit("users-updated", Array.from(connectedUsers.values()));
  });

  // 📹 Video state synchronization

  // Handle video enabled by peer
  socket.on("video-enabled", (callData) => {
    console.log("📹 Video enabled:", callData);

    const { meetingId, from, to } = callData;

    // Find recipient's socket and notify them
    if (to) {
      // Direct notification to specific user ID
      socket.to(to).emit("video-enabled-by-peer", {
        meetingId,
        from,
        timestamp: Date.now(),
      });
      console.log(
        `📹 Notified user ${to} about video enabled by ${from.name || from._id}`
      );
    }

    // Also broadcast to the room just in case
    if (meetingId) {
      socket.to(meetingId).emit("video-enabled-by-peer", {
        meetingId,
        from,
        timestamp: Date.now(),
      });
    }
  });

  // Handle video disabled by peer
  socket.on("video-disabled", (callData) => {
    console.log("📹 Video disabled:", callData);

    const { meetingId, from, to } = callData;

    // Find recipient's socket and notify them
    if (to) {
      // Direct notification to specific user ID
      socket.to(to).emit("video-disabled-by-peer", {
        meetingId,
        from,
        timestamp: Date.now(),
      });
      console.log(
        `📹 Notified user ${to} about video disabled by ${
          from.name || from._id
        }`
      );
    }

    // Also broadcast to the room just in case
    if (meetingId) {
      socket.to(meetingId).emit("video-disabled-by-peer", {
        meetingId,
        from,
        timestamp: Date.now(),
      });
    }
  });

  // Handle disconnect
  socket.on("disconnect", async () => {
    let disconnectedUserId = null;

    // ✅ EXISTING FUNCTIONALITY - Handle online status disconnect
    for (const userId in users) {
      if (users[userId] === socket.id) {
        disconnectedUserId = userId;
        delete users[userId];
        console.log(
          `User ${userId} with socket ${socket.id} removed from online users.`
        );
        break;
      }
    }

    const req = {
      socket_id: socket.id,
      is_online: 0,
    };

    // Update user status in the database
    await chatController.onlineOrOffline(req);
    console.log(`Socket ${socket.id} disconnected. User marked offline.`);

    // 🎥 NEW FUNCTIONALITY - Handle video call disconnect
    const user = connectedUsers.get(socket.id);
    if (user) {
      console.log(`🎥 ${user.name} disconnected from video calls`);

      // Remove user from connected users
      connectedUsers.delete(socket.id);

      // Cancel any active calls from this user
      for (const [meetingId, call] of activeCalls.entries()) {
        if (call.from.socketId === socket.id) {
          // Notify receiver that caller disconnected
          socket.to(call.to).emit("call-cancelled", {
            meetingId,
            reason: "caller-disconnected",
            timestamp: Date.now(),
          });
          activeCalls.delete(meetingId);
        }
      }

      // Broadcast updated user list
      io.emit("users-updated", Array.from(connectedUsers.values()));
    }
  });

  // Обробка увімкнення відео
  socket.on("video-enabled", (callData) => {
    console.log("📹 Video enabled:", callData);

    const { meetingId, from, to } = callData;

    // Повідомити іншого учасника
    if (to) {
      socket.to(to).emit("video-enabled-by-peer", {
        meetingId,
        from,
        timestamp: Date.now(),
      });
    }
  });

  // Обробка вимкнення відео
  socket.on("video-disabled", (callData) => {
    console.log("📹 Video disabled:", callData);

    const { meetingId, from, to } = callData;

    // Повідомити іншого учасника
    if (to) {
      socket.to(to).emit("video-disabled-by-peer", {
        meetingId,
        from,
        timestamp: Date.now(),
      });
    }
  });
});

// 🎥 NEW ENDPOINTS for video calls monitoring

// Health check endpoint
app.get("/video-calls/health", (req, res) => {
  res.json({
    status: "ok",
    connectedUsers: connectedUsers.size,
    activeCalls: activeCalls.size,
    timestamp: new Date().toISOString(),
  });
});

// Get active calls endpoint
app.get("/video-calls/calls", (req, res) => {
  res.json({
    activeCalls: Array.from(activeCalls.entries()),
    count: activeCalls.size,
  });
});

server.listen(app.get("port"), () => {
  console.log(
    `Express running${
      process.env.IS_SSL == "true" ? " securely" : ""
    } → On PORT : ${server.address().port}`
  );
  console.log(`🎥 Video calls enabled`);
  console.log(
    `📊 Health check: http://localhost:${app.get("port")}/video-calls/health`
  );
  console.log(
    `📞 Active calls: http://localhost:${app.get("port")}/video-calls/calls`
  );
});

// 🎥 Clean up old calls every 5 minutes
setInterval(() => {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;

  for (const [meetingId, call] of activeCalls.entries()) {
    if (now - call.timestamp > fiveMinutes) {
      console.log(`🧹 Cleaning up old call: ${meetingId}`);
      activeCalls.delete(meetingId);
    }
  }
}, 5 * 60 * 1000);
