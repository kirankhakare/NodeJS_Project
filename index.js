const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Session & Flash Setup
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Globals for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Routes
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use('/courses', courseRoutes);
app.use('/students', studentRoutes);
app.use('/reports', reportRoutes);

app.get('/', (req, res) => res.redirect('/students'));

app.listen(3000, () => 
  console.log('Server running on http://localhost:3000'
));


/*IMP Command : 
npm init -y
npm install express mysql2 ejs body-parser
npm install express-session connect-flash
*/