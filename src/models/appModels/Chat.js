const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttechmentTypeEnum = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
  PDF: "PDF",
  DOC: "DOC",
  AUDIO: "AUDIO",
};
const chatSchema = new Schema({
  thread_id: {
    type: Schema.Types.ObjectId,
    ref: "Thread",
  },
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reply_id: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
  message: {
    type: String,
  },
  attechment: {
    type: String,
  },
  is_read: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  ],
  attechment_type: {
    type: String,
    enum: Object.values(AttechmentTypeEnum),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
