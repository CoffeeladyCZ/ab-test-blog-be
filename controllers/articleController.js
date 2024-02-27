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
