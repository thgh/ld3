// https://remysharp.com/2010/07/21/throttling-function-calls
export default function throttle (fn, threshold, scope) {
  threshold || (threshold = 250)
  var last, deferTimer
  return function () {
    var context = scope || this
    var now = +new Date()
    var args = arguments
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}
