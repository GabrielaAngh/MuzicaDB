                let musicDB = global.db;

let getAll = function () {
	return new Promise((resolve, reject) => {
		musicDB.query(`select * from stilmuzical`, (err, rows) => {
			if (err) {
				return reject(`Can't list`);
			}
			return resolve(rows);
		});
	});
}

let insertOne = function (genre) {
	return new Promise((resolve, reject) => {
		musicDB.query(`insert into stilmuzical set ?`, genre, (err, result) => {
			if (err) {
				console.log(err);
				return reject(`Can't insert`);
			}
			return resolve(result);
		});
	})
}

let updateOne = function (genre) {
	console.log(genre);
	return new Promise((resolve, reject) => {
		musicDB.query(`update stilmuzical set nume = ?, origine = ?, anAparitie = ? where smId = ?`, [
			genre.nume,
			genre.origine,
			genre.anAparitie,
			genre.smId
		], (err, result) => {
			console.log(err, result);
			if (err) {
				return reject(`Can't update`);
			}
			return resolve(result);
		})
	})
}

let deleteOne = function(genreId) {
	return new Promise((resolve, reject) => {
		musicDB.query(`delete from stilmuzical where smId = ${genreId}`, (err, result) => {
			if (err) {
				return reject(`Can't insert`);
			}
			return resolve(result);
		});
	})
}

module.exports = {
	getAll,
	insertOne,
	updateOne,
	deleteOne
}