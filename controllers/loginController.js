const { v4: uuidv4 } = require('uuid');

exports.login = async (req, res, next) => {
  try {
    const uniqueId = uuidv4();

    res.cookie('uniqueId', uniqueId, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    res.status(200).json({ uniqueId });
  } catch (err) {
    next(err);
  }
};

