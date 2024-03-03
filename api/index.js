require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const articleRouter = require('./routes/api/article');
const loginRouter = require('./routes/api/login');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://ab-test-blog-fe.vercel.app'],
  credentials: true
}));

app.use('/api/article', articleRouter);
app.use('/api/login', loginRouter);

const openapiSpecification = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'openapi.json'), 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;
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

if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI not found in .env file');
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

app.use(cookieParser())

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.listen(5000, () => {
  console.log('Server is ready on 5000')
})

module.exports = app;
