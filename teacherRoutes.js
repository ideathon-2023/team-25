// routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Teacher = require('../models/teacher');

// Teacher registration (Sign up) endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, subject, class: teacherClass } = req.body;

// Teacher login endpoint
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the teacher with the given email exists
      const teacher = await Teacher.findOne({ email });
      if (!teacher) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, teacher.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      return res.status(200).json({ message: 'Teacher login successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  });
  

    // Check if the email is already registered
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new teacher in the database
    const newTeacher = new Teacher({ name, email, password: hashedPassword, subject, class: teacherClass });
    await newTeacher.save();

    return res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});
// Mark attendance endpoint
router.post('/mark-attendance', (req, res) => {
    try {
      const { sid, status } = req.body;
  
      // Logic to update attendance for the given SID with the provided status
      
  
      return res.status(200).json({ message: `Attendance for SID ${sid} is marked as ${status}` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  });
  

module.exports = router;
