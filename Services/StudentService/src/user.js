const db = require('./user_db');

exports.profile = async (req, res) => {
  const userId = req.user.userId;
  const output = await db.getProfile(userId);
  res.status(200).json(output);
};
