const User = require('../models/coreModels/User');
const ChatAttachment = require('../models/appModels/ChatAttachment');
var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { sendResponse } = require('@/helpers');

const chatController = {};

chatController.onlineOrOffline = async (req) => {
    console.log("reqNew", req);
    const { socket_id, is_online, sender_id } = req;
    console.log("reqNew", socket_id);
    try {

        if (is_online == 1) {
            const result = await User.findOneAndUpdate({ _id: sender_id }, { socket_id: socket_id, is_online: is_online });
            return { status: true, message: 'User is online', data: result };
        }
        else {
            const result = await User.findOneAndUpdate({ socket_id: socket_id }, { socket_id: '', is_online: is_online, last_seen: new Date() });
            console.log("User is offline", result);
            return { status: true, message: 'User is offline', data: result };
        }
    } catch (error) {
        return { status: false, message: 'error ' + error };
    }
}

chatController.getSocketIdByUserId = async (req) => {
    const { user_id } = req;
    try {
        const result = await User.findOne({ _id: user_id });
        return { status: true, message: 'User socket', socket_id: result?.socket_id };

    } catch (error) {
        return { status: false, message: 'error ' + error };
    }
}

chatController.getToken = async (req, res) => {
    const appId = 386820498; // Replace with your App ID
    const secret = "977c3c122c7ec6dff6bbfe5d397322a1"; // Replace with your Server Secret
    const effectiveTimeInSeconds = 36000;
    try {
        const { userId, payload } = req.body;
        const token = generateToken04(appId, userId, secret, effectiveTimeInSeconds, payload);
        res.json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

const ErrorCode = {
    success: 0,
    appIDInvalid: 1,
    userIDInvalid: 3,
    secretInvalid: 5,
    effectiveTimeInSecondsInvalid: 6
};

function RndNum(a, b) {
    return Math.ceil((a + (b - a)) * Math.random());
}

function makeRandomIv() {
    const str = '0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += str.charAt(Math.floor(Math.random() * str.length));
    }
    return result;
}

function getAlgorithm(keyBase64) {
    const key = Buffer.from(keyBase64);
    switch (key.length) {
        case 16: return 'aes-128-cbc';
        case 24: return 'aes-192-cbc';
        case 32: return 'aes-256-cbc';
        default: throw new Error(`Invalid key length: ${key.length}`);
    }
}

function aesEncrypt(plainText, key, iv) {
    const cipher = crypto.createCipheriv(getAlgorithm(key), key, iv);
    cipher.setAutoPadding(true);
    const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
    return Uint8Array.from(encrypted).buffer;
}

function generateToken04(appId, userId, secret, effectiveTimeInSeconds, payload = '') {
    if (!appId || typeof appId !== 'number') throw { errorCode: ErrorCode.appIDInvalid, errorMessage: 'appID invalid' };
    if (!userId || typeof userId !== 'string') throw { errorCode: ErrorCode.userIDInvalid, errorMessage: 'userId invalid' };
    if (!secret || typeof secret !== 'string' || secret.length !== 32) throw { errorCode: ErrorCode.secretInvalid, errorMessage: 'Secret must be a 32-byte string' };
    if (!effectiveTimeInSeconds || typeof effectiveTimeInSeconds !== 'number') throw { errorCode: ErrorCode.effectiveTimeInSecondsInvalid, errorMessage: 'Effective time in seconds invalid' };

    const createTime = Math.floor(Date.now() / 1000);
    const tokenInfo = {
        app_id: appId,
        user_id: userId,
        nonce: RndNum(-2147483648, 2147483647),
        ctime: createTime,
        expire: createTime + effectiveTimeInSeconds,
        payload
    };

    const iv = makeRandomIv();
    const encryptBuf = aesEncrypt(JSON.stringify(tokenInfo), secret, iv);

    const b1 = new Uint8Array(8);
    new DataView(b1.buffer).setBigInt64(0, BigInt(tokenInfo.expire), false);

    const b2 = new Uint8Array(2);
    new DataView(b2.buffer).setUint16(0, iv.length, false);

    const b3 = new Uint8Array(2);
    new DataView(b3.buffer).setUint16(0, encryptBuf.byteLength, false);

    const buf = Buffer.concat([Buffer.from(b1), Buffer.from(b2), Buffer.from(iv), Buffer.from(b3), Buffer.from(encryptBuf)]);
    return '04' + Buffer.from(buf).toString('base64');
}

chatController.upload = async (req, res) => {
    try {
        if (req.body.photo) {

            const data = {
                attechment: req.body.photo,
                sender_id: req.user._id,
                receiver_id: req.body.receiver_id,
                attechment_type: req.body.type
            }

            // Create a new rose
            await new ChatAttachment(data).save();

            return res.status(200).json({
                success: true,
                data: req.body.photo,
                message: 'Successfully upload attachment',
            });
        } else {
            return res.status(200).json({
                success: false,
                message: 'Attachment not upload',
            });
        }
    } catch (error) {
        console.log("error", error);

        return res.status(200).json({
            success: false,
            message: 'something went wrong',
        });
    }
}

chatController.getAttachment = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const otherUserId = req.params.recipientId;

        if (!otherUserId) {
            return res.status(400).json({
                success: false,
                message: 'Other user ID is required',
            });
        }

        const filter = {
            $or: [
                { sender_id: currentUserId, receiver_id: otherUserId },
                { sender_id: otherUserId, receiver_id: currentUserId }
            ]
        };

        const imageAttachments = await ChatAttachment.find({
            ...filter,
            attechment_type: 'image'
        }).sort({ createdAt: -1 });

        const videoAttachments = await ChatAttachment.find({
            ...filter,
            attechment_type: 'video'
        }).sort({ createdAt: -1 });

        const result = {
            images: imageAttachments,
            videos: videoAttachments,
        }

        return res.status(200).json({
            success: true,
            message: 'Attachment lists',
            result
        });

    } catch (error) {
        console.error("getAttachment error:", error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};

chatController.delete = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const otherUserId = req.body.recipientId;
        const attachmentUrl = req.body.attachment;

        // Extract relative file path from full URL
        const attachmentPath = new URL(attachmentUrl).pathname.replace(/^\/+/, ''); // e.g., public/uploads/chatAttachment/xxx.jpg
        console.log("attachmentPath", attachmentPath);
        
        // Create a filter to match document by users and attachment path
        const filter = {
            $or: [
                { sender_id: currentUserId, receiver_id: otherUserId },
                { sender_id: otherUserId, receiver_id: currentUserId }
            ],
            attechment: attachmentPath
        };

        const result = await ChatAttachment.findOneAndDelete(filter);

        if (!result) {
            return sendResponse(res, 404, false, null, 'No document found');
        }

        // Optional: Delete physical file from server
        const fullPath = path.join(__dirname, '..', attachmentPath);
        fs.unlink(fullPath, (err) => {
            if (err) console.error('Error deleting file:', err);
        });

        return sendResponse(res, 200, true, result, 'Successfully deleted the document');
    } catch (error) {
        console.error('Delete error:', error);
        return sendResponse(res, 500, false, null, 'Something went wrong');
    }
};


module.exports = chatController;