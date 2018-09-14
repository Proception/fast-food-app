export default function jsonIsEmpty(json) {
  const array = (json !== null && typeof json === 'object') ? Object.keys(json) : [];
  // console.log('json :', json, 'array :', array.length);
  if (!(array.length === 0)) {
    // console.log(json, 'JSON is not Empty');
    return false;
  }
  // console.log(json, 'JSON is Empty');
  return true;
}
// exports a function declared earlier
export { jsonIsEmpty };
