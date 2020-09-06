const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
    },
  author: {
type: String,
required: true
},
link: {
type: String,
required: true
}
  },
);

const event = mongoose.model("event", eventSchema);
module.exports = event;
