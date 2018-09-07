export default function jsonIsEmpty(json) {
  const array = Object.keys(json);
  if (!(array === undefined) || !(array.length === 0)) {
    console.log(json, 'JSON is not Empty');
    return false;
  }
  console.log(json, 'JSON is Empty');
  return true;
}
// exports a function declared earlier
export { jsonIsEmpty };
