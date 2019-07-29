let mongoose = require('mongoose')
let config = require('config-lite').mongodb
mongoose.connet(config.url, function (err) {
  if (err) {
    console.error('connet to %s error:', config.url, err.message)
    process.exit(1)
  }
})

exports.User = require('./user')
