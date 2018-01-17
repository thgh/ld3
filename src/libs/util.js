export function inert (x) {
  return JSON.parse(JSON.stringify(x))
}

export function toType (o) {
  return !o || typeof o !== 'object'
    ? (typeof o === 'boolean' ? 'ValueString' : typeof o === 'number' ? 'ValueString' : 'ValueText')
    : Array.isArray(o) ? 'ValueArray' : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference'
      : typeof o['@value'] !== 'undefined' ? 'ValueLiteral' : 'ValueObject'
}

/* Date helpers */

export function timestamp () {
  return new Date().toJSON().slice(0, 19) + 'Z'
}

/* Namespace handling */

// [{prefix: 'schema:', url: 'http://schema.org/'}]
// const namespaces = [{prefix: 'http:', url: 'https:'}, {prefix: 'https:', url: 'http:'}]
const namespaces = []

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
      obj = obj.replace(namespaces[i].url, namespaces[i].prefix)
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

// Force https on every request
const httpsFix = window.location.protocol !== 'https:' ? u => u :
  u => 'https' + u.slice(u.indexOf(':'))

export function getJSON (url) {
  return window.fetch(httpsFix(url), {
    redirect: 'follow',
    headers: {
     'Authorization': 'Basic ' + btoa('visitor:'), 
      Accept: 'application/json'
    }
  })
  .then(checkStatus)
  .then(toJSON)
}

export function putJSON (data) {
  return window.fetch(httpsFix(data['@id']), {
    method: 'put',
    body: JSON.stringify(data),
    redirect: 'follow',
    headers: {
     'Authorization': 'Basic ' + btoa('visitor:'), 
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

export const StyleInline = {
  render: function (h) {
    return h('style', this.$slots.default)
  }
}