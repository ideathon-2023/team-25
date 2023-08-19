// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Student = require('../models/student');

// Student registration (Sign up) endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new student in the database
    const newStudent = new Student({ name, email, password: hashedPassword });
    await newStudent.save();

    return res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Student login endpoint
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the student with the given email exists
      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, student.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      return res.status(200).json({ message: 'Student login successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  });
  

module.exports = router;
