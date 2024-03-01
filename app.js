require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const articleRouter = require('./routes/api/article');
const loginRouter = require('./routes/api/login');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/api/article', articleRouter);
app.use('/api/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_URL;
mongoose.set('strictQuery', false);

const connectDB = async() => {
  try {
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB');
  } catch(error) {
    console.error('Failed to connect to MongoDB', error);
  }
}
connectDB();

if (!process.env.MONGO_URL) {
  console.error('Error: MONGO_URL not found in .env file');
  process.exit(1);
}


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.get('/article/list', (req, res, next) => {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

app.listen(80, () => {
  console.log('CORS-enabled web server listening on port 80')
})

app.use(cookieParser())

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})


module.exports = app;
