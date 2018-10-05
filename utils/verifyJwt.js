import jwt from 'jsonwebtoken';

export default function verifyJwt(token, admin) {
  if (!token) return 1;

  try {
    const data = jwt.verify(token, 'test');
    // return 3;
    if (admin === 'admin'){
      return data.role_id;
    }else{
      return 3;
    }

  } catch (err) {
    // err
    return 2;
  }
}
// exports a function declared earlier
export { verifyJwt };
