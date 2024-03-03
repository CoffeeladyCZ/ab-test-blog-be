const express = require('express');
const router = express.Router();

const article_controller = require('../../controllers/articleController');

router.get('/list/', article_controller.article_list);

router.get('/:id/', article_controller.article_detail);


module.exports = router;