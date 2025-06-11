const express = require('express');
const router = express.Router();
const db = require('../db');

// Show add course form
router.get('/add', (req, res) => {
  res.render('courses/add');
});

//Edit course
router.get('edit',(req, res)=>{
  res.render('courses/edit')
});

// Add course to DB
router.post('/add', (req, res) => {
  const { course_name } = req.body;
  db.query('INSERT INTO course (course_name) VALUES (?)', [course_name], (err) => {
    if (err) {
      req.flash('error_msg', 'Failed to add student.');
      return res.redirect('/courses/add');
    }
    req.flash('success_msg', 'Course added successfully!');
    res.redirect('/courses');
  });
});

// View all courses
router.get('/', (req, res) => {
  db.query('SELECT * FROM course', (err, results) => {
    if (err) throw err;
    res.render('courses/list', { courses: results });
  });
});

//Search course...
router.get("/search",(req,res)=>{
    let cname=req.query.sd;
    db.query("select * from course where course_name like '%"+cname+"%' " , (err,result)=>{
        res.json(result);
    });
});

// Delete course
router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  db.query("DELETE FROM course WHERE course_id = ?", [id], (err) => {
    if (err) {
      console.log(err)
      req.flash('error_msg', 'Deletion failed!');
    } else {
      req.flash('success_msg', 'Course deleted successfully!');
    }
    res.redirect('/courses');
  });
});

// Render edit form for a course by ID
router.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  db.query("SELECT * FROM course WHERE course_id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.redirect("/courses");
    }
    if (result.length > 0) {
      req.flash('success_msg','Pass course data to the edit form view');
      res.render("courses/edit", { course: result[0] });
    } else {
      req.flash('error_msg', 'If course not found, redirect to course list');
      res.redirect("/courses");
    }
  });
});

// Handle update course form submission
router.post("/edit/:id", (req, res) => {
  let id = req.params.id;
  let { course_name } = req.body;
  db.query(
    "UPDATE course SET course_name = ? WHERE course_id = ?",
    [course_name, id],
    (err, result) => {
      if (err) {
        console.error(err);
        req.flash('error_msg', 'Update failed!');
      }
      req.flash('success_msg', 'Course updated successfully!');
      res.redirect("/courses");
    }
  );
});

module.exports = router;
