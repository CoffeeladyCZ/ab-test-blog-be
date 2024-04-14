const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  perex: {
    type: String,
  },
  ab_test: {
    type: String | null,
  },
  version: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  article_id: {
    type: String,
    required: true,
  },
  image: { 
    type: String,
  }
});

ArticleSchema.virtual('url').get(function () {
  return 'api/article/' + this._id;
});

// Export model
module.exports = mongoose.model('Articles', ArticleSchema);