var express = require('express');
var router = express.Router();
let Artist = require('./controller');

router.get('/',  (req, res, next) => {
	Artist.getAll().then(artists => {
		res.send({
			code: 200,
			content: artists
		});
	}).catch(reason => {
		res.send({
			code: 500,
			content: reason
		});
	})
});

router.post('/', (req, res) => {
	Artist.insertOne(req.body.artist).then(artist => {
		res.send({
			code: 200,
			content: artist
		});
	}).catch(reason => {
		res.send({
			code: 500,
			content: reason
		});
	});
});
router.put('/', (req, res) => {
	Artist.updateOne(req.body.artist).then(artist => {
		res.send({
			code: 200,
			content: artist
		});
	}).catch(reason => {
		res.send({
			code: 500,
			content: reason
		});
	});
});

router.delete('/:mId', (req, res) => {
	Artist.deleteOne(req.params.mId).then(result => {
		res.send({
			code: 200,
			content: result
		});
	}).catch(reason => {
		res.send({
			code: 500,
			content: reason
		});
	});
});

module.exports = router;
