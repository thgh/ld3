export default {
  getJson: {
    redirect: 'follow',
    headers: {
      Accept: 'application/json'
    }
  },
  putJson (data) {
    return window.fetch(data['@id'], {
      method: 'put',
      body: JSON.stringify(data),
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
        Authorization: 'insecure'
      }
    })
  },
  checkStatus (response) {
    if (response.status < 400) {
      return response
    }
    var error = new Error(response.statusText)
    error.status = response.status
    error.response = response
    throw error
  },
  json (response) {
    return response.json()
  },
  inert (obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  valueType (o) {
    return typeof o !== 'object'
      ? (typeof o === 'boolean' ? 'ValueString' : typeof o === 'number' ? 'ValueString' : 'ValueText')
      : Array.isArray(o) ? 'ValueArray' : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference'
        : typeof o['@value'] !== 'undefined' ? 'ValueLiteral' : 'ValueObject'
  }
}

export function inert (x) {
  return JSON.parse(JSON.stringify(x))
}
