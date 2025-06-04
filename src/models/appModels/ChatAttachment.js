const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatAttachmentSchema = new Schema({
    sender_id :{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver_id :{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    attechment : {
        type:String,
    },
    attechment_type : {
        type:String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const ChatAttachment = mongoose.model('ChatAttachment', chatAttachmentSchema);

module.exports = ChatAttachment;