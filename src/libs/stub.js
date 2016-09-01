const TYPE = '@type'

function typeName (t) {
  return t && t.slice(t.lastIndexOf(':') + 1)
}

function suggest (type) {
  switch (type) {
    case 'Person':
      return ['schema:name', 'schema:address']
    case 'LocalBusiness':
    case 'Organization':
      return ['schema:name', 'schema:vatID', 'schema:address', 'schema:founder']
    case 'PostalAddress':
      return ['schema:name', 'schema:streetAddress', 'schema:addressLocality', 'schema:postalCode', 'schema:addressCountry']
  }
  return ['schema:name', 'schema:description', 'schema:url']
}

export function toStub (fragment) {
  const type = fragment && fragment[TYPE] ? typeName(fragment[TYPE]) : 'Thing'
  const keys = Object.keys(fragment)

  return suggest(type).filter(function (key) {
    return keys.indexOf(key) === -1
  })
}
