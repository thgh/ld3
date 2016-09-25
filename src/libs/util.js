
export function inert (x) {
  return JSON.parse(JSON.stringify(x))
}

export function toType (o) {
  return typeof o !== 'object'
    ? (typeof o === 'boolean' ? 'ValueString' : typeof o === 'number' ? 'ValueString' : 'ValueText')
    : Array.isArray(o) ? 'ValueArray' : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference'
      : typeof o['@value'] !== 'undefined' ? 'ValueLiteral' : 'ValueObject'
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
