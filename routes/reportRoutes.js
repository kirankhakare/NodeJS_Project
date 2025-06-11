const express = require('express');
const router = express.Router();
const db = require('../db');

// Course-wise student count
router.get('/course-wise', (req, res) => {
  const sql = `
    SELECT c.course_name, COUNT(s.student_id) AS student_count
    FROM course c
    LEFT JOIN student s ON c.course_id = s.course_id
    GROUP BY c.course_name
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('reports/courseWise', { report: results });
  });
});

// Total student count
router.get('/total', (req, res) => {
  db.query('SELECT COUNT(*) AS total FROM student', (err, result) => {
    if (err) throw err;
    res.render('reports/totalStudents', { total: result[0].total });
  });
});

module.exports = router;
