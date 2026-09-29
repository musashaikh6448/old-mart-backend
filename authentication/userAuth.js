import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({ error: 'Access denied. Invalid token.' });
    }

    req.user = user;
    next();
  });
};

export  default authenticateToken
