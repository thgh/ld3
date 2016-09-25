
export function inert (x) {
  return JSON.parse(JSON.stringify(x))
}

export function toType (o) {
  return typeof o !== 'object'
    ? (typeof o === 'boolean' ? 'ValueString' : typeof o === 'number' ? 'ValueString' : 'ValueText')
    : Array.isArray(o) ? 'ValueArray' : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference'
      : typeof o['@value'] !== 'undefined' ? 'ValueLiteral' : 'ValueObject'
}

/* Namespace handling */
const namespaces = {}

export function fromMin (obj) {
  // Replace prefix by url in strings
  if (typeof obj === 'string') {
    if (obj.endsWith('#id')) {
      obj = obj.slice(0, -3)
    }
    for (let i = namespaces.length - 1; i >= 0; i--) {
      obj = obj.replace(namespaces[i].prefix, namespaces[i].url)
    }
  }

  // Recursive transformation for objects
  else if (typeof obj === 'object') {
    for (const prop in obj) {
      obj[prop] = fromMin(obj[prop])
    }
  }

  return obj
}

export function toMin (obj) {
  // Replace prefix by url in strings
  if (typeof obj === 'string') {
    for (var i = 0; i < namespaces.length; i++) {
      s = s.replace(namespaces[i].url, namespaces[i].prefix)
    }
  }

  // Recursive transformation for objects
  else if (typeof obj === 'object') {
    for (const prop in obj) {
      obj[prop] = toMin(obj[prop])
    }
  }

  return obj
}

/* HTTP */

export function getJSON (url) {
  return window.fetch(url, {
    redirect: 'follow',
    headers: {
      Accept: 'application/json'
    }
  })
  .then(checkStatus)
  .then(toJSON)
}

export function putJSON (data) {
  return window.fetch(data['@id'], {
    method: 'put',
    body: JSON.stringify(data),
    redirect: 'follow',
    headers: {
      Accept: 'application/json',
      Authorization: 'insecure'
    }
  })
  .then(toJSON)
}

export function checkStatus (response) {
  if (response.status < 400) {
    return response
  }
  var error = new Error(response.statusText)
  error.status = response.status
  error.response = response
  throw error
}

export function toJSON (response) {
  return response.json()
}
