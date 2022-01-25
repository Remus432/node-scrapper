const mongoose = require('mongoose');

const pageInfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  headline: {
    type: String,
    required: false
  },
  screenshot: {
    type: String,
    required: true
  }
})

const PageInfo = mongoose.model("PageInfo", pageInfoSchema)

module.exports = PageInfo