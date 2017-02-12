export default function equals(x, y) {
  // Don't care about undefined, null, false, ''
  if (!x || !y) {
    return !x && !y
  }
  if (x === y || x.valueOf() === y.valueOf()) {
    return true
  }

  // Quick array check
  if (Array.isArray(x) && x.length !== y.length) {
    return false
  }

  // Recursive check
  var p = Object.keys(x)
  return Object.keys(y).every((i) => p.includes(i)) && p.every((i) => equals(x[i], y[i]))
}
