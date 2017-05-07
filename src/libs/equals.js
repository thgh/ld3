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
  return typeof x === 'object' && typeof y === 'object' && Object.keys(y).every((i) => xKeys.includes(i) || !y[i])
    && xKeys.every((i) => equals(x[i], y[i]))
}

// Returns object containing key/values that need to be copied from y and applied to x
export function differs(x, y) {
  // Don't care about undefined, null, false, ''
  if (typeof x !== 'object' || typeof y !== 'object' || !x || !y) {
    return {}
  }

  // 
  const diff = {}
  Object.keys(y).forEach(key => {
    if (!equals(x[key], y[key])) {
      diff[key] = y[key]
    }
  })
  return diff
}
