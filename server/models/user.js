let mongoose = require('mongoose')
let Schema = mongoose.Schema
let UserSchema = new Schema({
  email: { type: String, requireed: true },
  password: { type: String, requireed: true },
  name: { type: String, requireed: true },
  avatar: { type: String }
}, {
  collection: 'user',
  timestamps: true
  // versionKey: false
})
// UserSchema.index({ name: 1 })
module.exports = mongoose.model('User', UserSchema)
