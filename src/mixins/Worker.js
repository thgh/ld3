export default {
  ready () {
    if (this.$root.config.serviceWorker) {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js')
        })
      }
    }
  }
}
