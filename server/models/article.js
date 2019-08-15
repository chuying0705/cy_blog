let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ArticleSchema = new Schema({
  category: { type: String, requireed: true },
  title: { type: String, requireed: true },
  desc: { type: String, requireed: true },
  content: { type: String, requireed: true },
  content_type: { type: String, requireed: true },
  readCount: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 },
  tag: [String],
  from: { type: String, requireed: true },
  authorId: { type: String, requireed: true }
}, {
  collection: 'article',
  // versionKey: false,
  timestamps: { createdAt: 'publishTime', updatedAt: 'updateTime' }
})
// UserSchema.index({ name: 1 })
module.exports = mongoose.model('article', ArticleSchema)
