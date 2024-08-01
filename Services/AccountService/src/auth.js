const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secrets = require('./data/secrets');
const db = require('./auth_db');

exports.login = async (req, res) => {
  const {studentid, password} = req.body;
  const [id, data] = await db.selectUserByStudentId(studentid);

  if (data && bcrypt.compareSync(password, data.pwhash)) {
    const accessToken = jwt.sign(
      {userId: id},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256',
      });
    res.status(200).json({
      name: data.name, // or maybe chinese name?
      accessToken: accessToken,
    });
  } else {
    res.status(401).send('Invalid Credentials');
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
