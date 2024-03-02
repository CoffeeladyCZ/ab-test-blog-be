const express = require('express');

const app = express();

router.get('/list/', article_controller.article_list);

router.get('/:id/', article_controller.article_detail);

router.get('/login/', login_controller.login);

const port = normalizePort(process.env.PORT || 5000);
app.set('port', port);
