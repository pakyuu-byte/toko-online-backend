const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader ||!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized - Token tidak ada' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role!== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden - Hanya admin' });
  }
  next();
};

module.exports = { authenticate, isAdmin };