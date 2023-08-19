// models/teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subject: { type: String, required: true },
  class: { type: String, required: true },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
