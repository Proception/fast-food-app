import jwt from 'jsonwebtoken';

export default function verifyJwt(token) {
  if (!token) return 1;

  try {
    jwt.verify(token, 'test');
    return 3;
  } catch (err) {
    // err
    return 2;
  }
}
// exports a function declared earlier
export { verifyJwt };
