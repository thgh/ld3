import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const plugins = [
  vue(),
  scss(),
  buble({ exclude: ['node_modules/**'], transforms: { dangerousForOf: true } }),
  // nodeResolve({ browser: true, jsnext: true }),
  // commonjs()
]

if (process.env.NODE_ENV === 'production') {
  process.env.VUE_ENV = 'production'
  // plugins.push(uglify())
}

if (process.env.NODE_ENV === 'development') {
  process.env.VUE_ENV = 'development'
  plugins.push(livereload('dist'))
  plugins.push(serve({
    open: true
  }))
}

export default {
  entry: 'src/main.js',
  dest: 'dist/build.js',
  sourceMap: true,
  plugins
}
