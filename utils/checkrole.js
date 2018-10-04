export default function checkrole(token) {
  //role is normal user
  if (token === 100){
    return 2;
  }
  //returns response from jwt
  if (token < 5){
    return token;
  }
  //if role is admin, allow access
  if (token === 200){
    return 3;
  }
}
// exports a function declared earlier
export { checkrole };
