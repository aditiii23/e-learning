const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  expert: {
    type: String,
    required: true
    },
  email: {
type: String,
required: true
},
password: {
type: String,
required: true
},
designation: {
type: String,
required: true
}
  },
);

const mentor = mongoose.model("mentor", mentorSchema);
module.exports = mentor;
