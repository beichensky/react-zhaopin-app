/*
 * filename: ChatSchema
 * overview: mongoose 生成的会话内容数据库格式
 */

import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
    from: String,
    to: String,
    chatId: String,
    content: String,
    read: Boolean,
    createTime: Number,
});
