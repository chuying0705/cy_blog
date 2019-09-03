let mongoose = require('mongoose')
let Schema = mongoose.Schema
let commentSchema = new Schema({
  // comment_id: { type: String, requireed: true },
  // comment_time: Date,
  comment_from: { type: String, requireed: true },
  comment_content: { type: String, requireed: true },
  comment_like: { type: Number, default: 0 },
  reply: [{
    reply_from: { type: String, requireed: true },
    reply_to: { type: String, requireed: true },
    reply_content: { type: String, requireed: true },
    reply_time: Date
  }]
}, {
  timestamps: { createdAt: 'comment_time' }
})
let ArticleSchema = new Schema({
  category: { type: String, requireed: true },
  title: { type: String, requireed: true },
  desc: { type: String, requireed: true },
  content: { type: String, requireed: true },
  content_type: { type: String, requireed: true },
  readCount: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 },
  tag: [String],
  from: { type: Number, requireed: true, enum: [0, 1] },
  authorId: { type: String, requireed: true },
  comments: [commentSchema]
}, {
  collection: 'article',
  // versionKey: false,
  timestamps: { createdAt: 'publishTime', updatedAt: 'updateTime' }
})
// UserSchema.index({ name: 1 })
module.exports = mongoose.model('article', ArticleSchema)
