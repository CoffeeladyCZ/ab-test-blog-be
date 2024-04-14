const { v4: uuidv4 } = require('uuid');

const Article = require("../models/ArticleModel");

exports.article_list = async(req, res, next) => {
  const result = await Article.find({})
    .sort({id: 1})
    .exec((error, result) => {
      if (error) {
        return next(error);
      }
      res.json(result);
    })
};

exports.article_detail = async(req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Article.findOne({ article_id: id }).exec();
    if (!result) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.article_update = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const result = await Article.findOneAndUpdate({ article_id: id }, updateData, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.article_create = async (req, res, next) => {
  const articleData = req.body;
  const uniqueId = uuidv4();
  articleData.article_id = uniqueId;
  console.log(articleData);

  const article = new Article(articleData);
  try {
    const result = await article.save({ writeConcern: { w: 'majority', wtimeout: 0 } });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
