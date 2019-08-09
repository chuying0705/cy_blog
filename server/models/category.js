let mongoose = require('mongoose')
let Schema = mongoose.Schema
let UserSchema = new Schema({
  cate: { type: String, requireed: true }
}, {
  collection: 'category'
  // versionKey: false
})
// UserSchema.index({ name: 1 })
module.exports = mongoose.model('category', UserSchema)
