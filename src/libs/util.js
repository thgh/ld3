export default {
  getJson: {
    redirect: 'follow',
    headers: {
      Accept: 'application/json'
    }
  },
  putJson (data) {
    return {
      method: 'put',
      body: JSON.stringify(data),
      redirect: 'follow',
      headers: {
        Accept: 'application/json'
      }
    }
  },
  checkStatus (response) {
    if (response.status < 400) {
      return response
    }
    console.warn(response.status)
    var error = new Error(response.statusText)
    error.status = response.status
    error.response = response
    throw error
  },
  json (response) {
    console.log(response)
    return response.json()
  },
  inert (obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}
