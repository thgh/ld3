export function collection(a) {
  return Array.isArray(a) ? a : [a]
}

export function last(a) {
  a = collection(a)
  return a[a.length - 1]
}

export function first() {
  return collection(a)[0]
}
