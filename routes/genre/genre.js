var express = require('express');
var router = express.Router();
let Genre = require('./controller');

router.get('/',  (req, res, next) => {
	Genre.getAll().then(genres => {
		res.send({
			code: 200,
			content: genres
		});
	}).catch(reason => {
		res.send({
			code: 500,
			content: reason
		});
	})
});

router.post('/', (req, res) => {
	Genre.insertOne(req.body.genre).then(genre => {
		res.send({
			code: 200,
			content: genre
		});
	}).catch(reason => {
		res.send({
			code: 500,
			content: reason
		});
	});
});
router.put('/', (req, res) => {
	Genre.updateOne(req.body.genre).then(genre => {
		res.send({
			code: 200,
			content: genre
		});
	}).catch(reason => {
		res.send({
			code: 500,
			content: reason
		});
	});
});

router.delete('/:smId', (req, res) => {
	Artist.deleteOne(req.params.smId).then(result => {
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
