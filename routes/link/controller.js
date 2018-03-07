let musicDB = global.db;

let getAll = function () {
	return new Promise((resolve, reject) => {
		musicDB.query(`select ms.msId, m.nume as artist, m.nume_scena, m.an_nastere, sm.nume as stil, sm.anAparitie, sm.origine
		from muzician_stil ms
		left join muzician m
			on ms.mId = m.mId
		left join stilmuzical sm
			on ms.smId = sm.smId`, (err, rows) => {
			if (err) {
				return reject(`Can't list`);
			}
			return resolve(rows);
		});
	});
}

let insertOne = function (link) {
	return new Promise((resolve, reject) => {
		musicDB.query(`insert into muzician_stil set ?`, link, (err, result) => {
			if (err) {
				return reject(`Can't insert`);
			}
			return resolve(result);
		});
	})
}


let deleteOne = function(linkId) {
	return new Promise((resolve, reject) => {
		musicDB.query(`delete from muzician_stil where msId = ${linkId}`, (err, result) => {
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
	deleteOne
}