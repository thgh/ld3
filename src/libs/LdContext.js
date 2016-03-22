'use strict'

// var CONTEXT = '@context'
var ID = '@id'
var TYPE = '@type'
var GRAPH = '@graph'

var graph = []
var classArray = []
var _propIndex = Object.create(null)
var _rangeIndex = Object.create(null)
var _superIndex = Object.create(null)
var _classes = {}
var _props = {}
var _types = {}

var init = function (options) {
  var url = options && options.url || 'schemaorg.json'
  return fetchContext(url)
}

var fetchContext = function (url) {
  // TODO: keep track of fetched urls
  // return $http.get(url).success(addContext)
  console.time('fetchContext')
  window.fetch('static/schemaorg.json').then(r => r.json()).then(addContext)
}

// Accepts only FLATTENED graphs
var addContext = function (data) {
  console.log(data)
  console.time('addContext')
  data[GRAPH].forEach(function (g) {
    var type = g[TYPE]
    if (typeof type !== 'string') {
      type = type[0] === 'http://www.w3.org/2000/01/rdf-schema#Class' ? type[1] : type[0]
    }
    switch (type) {
      case 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property':
        _props[g[ID]] = g
        var d = g['http://schema.org/domainIncludes']
        if (d) {
          if (d[ID]) {
            addPropToClass(d[ID], g)
          } else {
            d.forEach(function (v) {
              addPropToClass(v[ID], g)
            })
          }
        }
        var r = g['http://schema.org/rangeIncludes']
        if (r) {
          if (r[ID]) {
            buildRangeIndex(r[ID], g[ID])
          } else {
            r.forEach(function (v) {
              buildRangeIndex(v[ID], g[ID])
            })
          }
        }
        break
      case 'http://www.w3.org/2000/01/rdf-schema#Class':
        _classes[g[ID]] = g
        var s = g['http://www.w3.org/2000/01/rdf-schema#subClassOf']
        if (s) {
          if (s[ID]) {
            buildSuperIndex(s[ID], g[ID])
          } else {
            s.forEach(function (v) {
              buildSuperIndex(v[ID], g[ID])
            })
          }
        }
        break
      case 'http://schema.org/DataType':
        _types[g[ID]] = g
    }
  })
  for (var o in _classes) {
    classArray.push(_classes[o])
  }
  console.timeEnd('addContext')
  console.timeEnd('fetchContext')
  // console.debug(_propIndex)
  // console.debug(_rangeIndex)
  // console.log(Object.keys(_props).length, Object.keys(_classes).length, Object.keys(_types))
}

/* Build index helpers */

var addPropToClass = function (id, prop) {
  if (!_propIndex[id]) _propIndex[id] = []
  _propIndex[id].push(prop)
}
var buildRangeIndex = function (prop, id) {
  if (!_rangeIndex[id]) _rangeIndex[id] = []
  if (prop.indexOf('/') !== -1) {
    prop = prop.substring(prop.lastIndexOf('/') + 1)
  }
  _rangeIndex[id].push(prop)
}
var buildSuperIndex = function (superr, id) {
  if (!_superIndex[id]) _superIndex[id] = []
  _superIndex[id].push(superr)
}

/* Find helpers */

var findByType = function (key) {
  return _types[key]
}
var findByProp = function (key) {
  return _props['http://schema.org/' + key]
}
var findByClass = function (key) {
  return _props[key]
}
// Trim off "http://schema.org/"
// TODO: trim off "schema:"
var trim = function (key) {
  return key.indexOf('/') !== -1 ? key.substring(key.lastIndexOf('/') + 1) : key
}
var propsForClass = function (fClass) {
  var fProps = _propIndex[fClass]
  if (fProps) {
    return {
      'class': fClass,
      'props': fProps
    }
  }
  fProps = _propIndex['http://schema.org/' + fClass]
  if (fProps) {
    return {
      'class': 'http://schema.org/' + fClass,
      'props': fProps
    }
  }
  return false
}
var propsFor = function (fClass) {
  var props = []
  var fProps = propsForClass(fClass)
  if (fProps) props.push(fProps)

  // Recursive search for props
  fClass = superFor(fClass)
  while (fClass) {
    fProps = propsForClass(fClass)
    if (fProps) props.push(fProps)
    fClass = superFor(fClass)
  }
  return props
}
var rangeFor = function (key) {
  return _rangeIndex['http://schema.org/' + key]
}
var superFor = function (key) {
  if (_superIndex[key]) {
    return _superIndex[key][0]
  }
  if (_superIndex['http://schema.org/' + key]) {
    return _superIndex['http://schema.org/' + key][0]
  }
  return false
}
var _isBoolean = function (cls) {
  return trim(cls) === 'Boolean'
}
var _isNumeric = function (cls) {
  return ['Number', 'Float', 'Integer'].indexOf(trim(cls)) !== -1
}
var _isTextual = function (cls) {
  return ['Text', 'URL'].indexOf(trim(cls)) !== -1
}
var defaultValueFor = function (prop, value) {
  var r = rangeFor(trim(prop[ID]))
  if (!r || !r.length) {
    console.warn('defaultValueFor', prop)
    return 'Trouble'
  }
  for (var i = 0; i < r.length; i++) {
    if (_isTextual(r[i]) || _isNumeric(r[i]) || _isBoolean(r[i])) {
      return value || ''
    }
  }
  return {
    _range: r,
    '@type': trim(r[0]),
    'name': value || null
  }
}

export default {
  init: init,
  type: findByType,
  prop: findByProp,
  class: findByClass,
  classArray: classArray,
  propsFor: propsFor,
  rangeFor: rangeFor,
  superFor: superFor,
  defaultValueFor: defaultValueFor,
  graph: graph
}
