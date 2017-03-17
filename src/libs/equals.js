// Falsy values are ignored
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
  const xKeys = Object.keys(x)
  return Object.keys(y).every((i) => xKeys.includes(i) || !y[i])
    && xKeys.every((i) => equals(x[i], y[i]))
}
