import Invoice from './Invoice.vue'

window.Vue.use({
	install (Vue) {
	  Vue.component('invoice', Invoice)
	}
})
