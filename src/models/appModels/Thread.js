const mongoose = require("mongoose");
const { Schema } = mongoose;

const TypeEnum = {
    SINGLE: 'SINGLE',
    GROUP: 'GROUP'
}
const threadSchema = Schema({
    ticket_id: {
        type: String,
    },
    ticket_type: {
        type: String,
    },
    group_name: {
        type: String,
    },
    group_image: {
        type: String,
    },
    type: {
        type: String,
        enum: Object.values(TypeEnum)
    },
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }],
    last_message: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    blockBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    blockedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    },

});


threadSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: '_id',
    justOne: false // Set to true if you expect only one chat user per convenience
});

threadSchema.set('toObject', { virtuals: true });
threadSchema.set('toJSON', { virtuals: true });


const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;