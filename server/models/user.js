let mongoose = require('mongoose')
let Schema = mongoose.Schema
let UserSchema = new Schema({
  name: { type: String, requireed: true },
  password: { type: String, requireed: true },
  email: { type: String, requireed: true }
}, {
  collection: 'user'
  // versionKey: false
})
// UserSchema.index({ name: 1 })
module.exports = mongoose.model('User', UserSchema)
