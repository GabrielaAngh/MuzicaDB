let mysql = require('mysql');
let db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'admin',
	database: 'database'
});

db.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('====== connected to database ======');
});

module.exports = db;