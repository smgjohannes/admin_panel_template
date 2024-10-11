export const replacer = function (key, value) {
  let seen = [];
  if (value != null && typeof value == 'object') {
    if (seen.indexOf(value) >= 0) {
      return;
    }
    seen.push(value);
  }
  return value;
};
