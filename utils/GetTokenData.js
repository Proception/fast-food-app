import jwt from 'jsonwebtoken';

export default function getTokenData(token) {
  if (!token) return 1;

  try {
    const data = jwt.verify(token, 'test');
    return data;
  } catch (err) {
    return err.message;
  }
}
// exports a function declared earlier
export { getTokenData };
