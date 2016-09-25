<template>
  <label class="inp-single">
    {{ label }} {{fragment}}
    <input type="text" v-model="model" :placeholder="label">
  </label>
</template>

<script>
import { inert, toMin } from '../libs/util.js'

export default {
  props: ['a', 'path', 'label'],
  data () {
    return {
      depth: 0
    }
  },
  computed: {
    setPath () {
      var a = inert(this.a)
      if (!a || !a['@id']) {
        return '$parent.a'
      }

      var setPath = '$parent.a'

      if (a['@id']) {
        var min = toMin(a['@id'])
        setPath = '$root.fragments[\'' + min + '\']'
      }

      var paths = [setPath]
      var pieces = [a]

      var vm = this
      var last = this.path.split('.').length - 1
      this.path.split('.').forEach(function (piece, i) {
        setPath += '[\'schema:' + piece + '\']'
        if (typeof a[piece] === 'undefined') {
          vm.$set(setPath, i === last ? 'no' : {})
        } else if (a[piece]['@id']) {
          var min = toMin(a[piece]['@id'])
          setPath = '$root.fragments[\'' + min + '\']'
        }
        pieces.push(a[piece])
        paths.push(setPath)

        a = a[piece]
      })

      console.log(pieces, paths)

      return setPath
    },
    model: {
      get () {
        return this.$get('$parent.a.' + this.path)
      },
      set (v) {
        console.log(this.setPath)
        this.$set(this.setPath, v)
      }
    }
  }
}
</script>
