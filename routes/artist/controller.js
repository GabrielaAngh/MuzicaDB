let musicDB = global.db;

let getAll = function () {
	return new Promise((resolve, reject) => {
		musicDB.query(`select * from muzician`, (err, rows) => {
			if (err) {
				return reject(`Can't list`);
			}
			return resolve(rows);
		});
	});
}

let insertOne = function (artist) {
	return new Promise((resolve, reject) => {
		musicDB.query(`insert into muzician set ?`, artist, (err, result) => {
			if (err) {
				return reject(`Can't insert`);
			}
			return resolve(result);
		});
	})
}

let updateOne = function (artist) {
	return new Promise((resolve, reject) => {
		musicDB.query(`update muzician set nume = ?, nume_scena = ?, an_nastere = ? where mId = ?`, [
			artist.nume,
			artist.nume_scena,
			artist.an_nastere,
			artist.mId
		], (err, result) => {
			if (err) {
				return reject(`Can't insert`);
			}
			return resolve(result);
		})
	})
}

let deleteOne = function(artistId) {
	return new Promise((resolve, reject) => {
		musicDB.query(`delete from muzician where mId = ${artistId}`, (err, result) => {
			if (err) {
				return reject(`Can't delete`);
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