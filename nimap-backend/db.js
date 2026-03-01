const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mysql-instance.aivencloud.com',
  user: 'your_username',
  password: 'your_password',
  database: 'nimap_test',
  port: 12345,   // VERY IMPORTANT (Aiven gives custom port)
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect(err => {
  if (err) {
    console.log("DB Connection Failed ❌", err);
  } else {
    console.log("MySQL Connected (Cloud) ✅");
  }
});

module.exports = db;