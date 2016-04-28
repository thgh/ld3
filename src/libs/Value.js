export default {
  getType (o) {
    return typeof o !== 'object'
      ? (typeof o === 'boolean' ? 'ValueString' : typeof o === 'number' ? 'ValueString' : 'ValueText')
      : Array.isArray(o) ? 'ValueArray' : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference' : 'ValueObject'
  }
}
