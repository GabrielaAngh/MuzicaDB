var express = require('express');
var router = express.Router();
let Link = require('./controller');

router.get('/',  (req, res, next) => {
	Link.getAll().then(links => {
		res.send({
			code: 200,
			content: links
		});
	}).catch(reason => {
		res.send({
			code: 500,
			content: reason
		});
	})
});

router.post('/', (req, res) => {
	Link.insertOne(req.body.link).then(link => {
		res.send({
			code: 200,
			content: link
		});
	}).catch(reason => {
		res.send({
			code: 500,
			content: reason
		});
	});
});

router.delete('/:msId', (req, res) => {
	Link.deleteOne(req.params.msId).then(result => {
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
