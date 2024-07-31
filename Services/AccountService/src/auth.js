const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secrets = require('./data/secrets');
const db = require('./auth_db');

exports.login = async (req, res) => {
  const {email, password} = req.body;
  const [userId, user] = await db.selectUserByEmail(email);
  // console.log(user);
  // console.log(user['last_visited']);
  if (user && bcrypt.compareSync(password, user.user_password)) {
    const accessToken = jwt.sign(
      {userId: userId},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256',
      });
    res.status(200).json({
      name: user.user_name,
      accessToken: accessToken,
    });
  } else {
    res.status(401).send('Invalid credentials');
  }
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  jwt.verify(token, secrets.accessToken, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
