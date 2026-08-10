const jwt = require('jsonwebtoken');

export const generateEmployeeToken = (user:any, isRefreshToken = false) => {
  const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET;
 
  const expiresIn = isRefreshToken ? (process.env.JWT_REFRESH_EXPIRES_IN || '7d') : (process.env.JWT_EXPIRES_IN || '24h');

  if (!secret) {
    throw new Error('JWT secret is not configured (process.env.JWT_SECRET / JWT_REFRESH_SECRET)');
  }

  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      type: 'employee'
    },
    secret,
    { expiresIn }
  );
};

export const generateCompanyToken = (company:any, isRefreshToken = false) => {
  const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET;
  const expiresIn = isRefreshToken ? (process.env.JWT_REFRESH_EXPIRES_IN || '7d') : (process.env.JWT_EXPIRES_IN || '24h');

  if (!secret) {
    throw new Error('JWT secret is not configured (process.env.JWT_SECRET / JWT_REFRESH_SECRET)');
  }

  return jwt.sign(
    {
      sub: company.id,
      email: company.email,
      type: 'company'
    },
    secret,
    { expiresIn }
  );
};

export const verifyToken = (token:any, isRefreshToken = false) => {
  const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};
