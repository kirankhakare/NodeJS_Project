const express = require('express');
const router = express.Router();
const db = require('../db');
const fs = require('fs');
const ejs = require('ejs');

// Show add student form
router.get('/add', (req, res) => {
  db.query('SELECT * FROM course', (err, courses) => {
    if (err) throw err;
    res.render('students/add', { courses });
  });
});

// View all students with course name
router.get('/', (req, res) => {
  const sql = `
    SELECT s.*, c.course_name 
    FROM student s
    JOIN course c ON s.course_id = c.course_id
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('students/list', { students: results });
  });
});

router.post('/add', (req, res) => {
  const { name, email, course_id } = req.body;
  db.query('INSERT INTO student (name, email, course_id) VALUES (?, ?, ?)', [name, email, course_id], (err) => {
    if (err) {
      req.flash('error_msg', 'Failed to add student.');
      return res.redirect('/students/add');
    }
    req.flash('success_msg', 'Student added successfully!');
    res.redirect('/students');
  });
});

// Edit student (GET form)
router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM student WHERE student_id = ?', [id], (err, studentData) => {
    if (err || studentData.length === 0) return res.redirect('/students');

    db.query('SELECT * FROM course', (err2, courseData) => {
      if (err2) return res.redirect('/students');

      res.render('students/edit', {
        student: studentData[0],
        courses: courseData
      });
    });
  });
});



// Edit student (POST update)
router.post('/edit/:id', (req, res) => {
  const { name, email, course_id } = req.body;
  db.query(
    'UPDATE student SET name = ?, email = ?, course_id = ? WHERE student_id = ?',
    [name, email, course_id, req.params.id],
    (err) => {
      if (err) {
        req.flash('error_msg', 'Update failed!');
        return res.redirect('/students');
      }
      req.flash('success_msg', 'Student updated successfully!');
      res.redirect('/students');
    }
  );
});

// Delete student
router.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM student WHERE student_id = ?', [req.params.id], (err) => {
    if (err) {
      req.flash('error_msg', 'Deletion failed!');
    } else {
      req.flash('success_msg', 'Student deleted successfully!');
    }
    res.redirect('/students');
  });
});

//Search the student...
router.get('/search', (req, res) => {
  const query = req.query.query;
  const sql = `
    SELECT s.student_id, s.name, s.email, c.course_name 
    FROM student s 
    JOIN course c ON s.course_id = c.course_id 
    WHERE s.name LIKE ? OR c.course_name LIKE ?
  `;

  db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


module.exports = router;
