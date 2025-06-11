const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kiran@123',
  database: 'student_admissions'
});
connection.connect(err => {
  if (err){
    console.log("Some issue in connection")
  }else{
    console.log('Connected MySQL');
  }
});
module.exports = connection;
