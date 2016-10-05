import vue from 'rollup-plugin-vue2'
import sass from 'rollup-plugin-sass'
import css from 'rollup-plugin-css-only'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const plugins = [
  vue(),
  sass({ include: '**/*.css', output: 'dist/build.css' }),
  // css(),
  buble({ exclude: ['node_modules/**'], transforms: { dangerousForOf: true } }),
  nodeResolve({ browser: true, jsnext: true }),
  commonjs()
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify())
}

if (process.env.NODE_ENV === 'development') {
  plugins.push(livereload('dist'))
  plugins.push(serve({
    open: true
  }))
}

export default {
  entry: 'src/main.js',
  dest: 'dist/build.js',
  plugins
}
