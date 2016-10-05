function inert (x) {
  return JSON.parse(JSON.stringify(x))
}



/* Namespace handling */

// [{prefix: 'schema:', url: 'http://schema.org/'}]
var namespaces = []

function fromMin (obj) {
  // Replace prefix by url in strings
  if (typeof obj === 'string') {
    if (obj.endsWith('#id')) {
      obj = obj.slice(0, -3)
    }
    for (var i = namespaces.length - 1; i >= 0; i--) {
      obj = obj.replace(namespaces[i].prefix, namespaces[i].url)
    }
  }

  // Recursive transformation for objects
  else if (typeof obj === 'object') {
    for (var prop in obj) {
      obj[prop] = fromMin(obj[prop])
    }
  }

  return obj
}

function toMin (obj) {
  // Replace prefix by url in strings
  if (typeof obj === 'string') {
    for (var i = 0; i < namespaces.length; i++) {
      s = s.replace(namespaces[i].url, namespaces[i].prefix)
    }
  }

  // Recursive transformation for objects
  else if (typeof obj === 'object') {
    for (var prop in obj) {
      obj[prop] = toMin(obj[prop])
    }
  }

  return obj
}

/* HTTP */









var StyleInline = {
  render: function (h) {
    return h('style', this.$slots.default)
  }
}

var InputSingle = {
render: function(){with(this){return _h('label',{staticClass:"inp-single"},["\n    "+_s(label)+"\n    ",_h('input',{directives:[{name:"model",value:(model),expression:"model"}],attrs:{"type":"text","placeholder":label},domProps:{"value":_s(model)},on:{"input":function($event){if($event.target.composing){ return; }model=$event.target.value}}})])}},
staticRenderFns: [],
  name: 'input-single',
  props: ['a', 'path', 'label'],
  computed: {
    parent: function parent$1 () {
      return this.follow(this.path).parent
    },
    prop: function prop$1 () {
      return this.path.slice()
    },
    model: {
      get: function get () {
        return this.value
      },
      set: function set (v) {
        this.$set(this.parent, this.prop, v)
      }
    }
  },
  methods: {
    follow: function follow (path) {
      var this$1 = this;

      if (!this.a || !this.a['@id']) {
        return console.warn('input single only supports fragments with @id')
      }
      var a = this.storage(this.a)
      var pieces = path && path.split('.') || []

      // Loop over all path pieces
      for (var i = 0; i < pieces.length; i++) {
        var piece = 'schema:' + pieces[i]
        if (typeof a[piece] === 'undefined') {
          this$1.$set(a, piece, i < pieces.length - 1 ? {} : 'nope')
        }
        if (i === pieces.length - 1) {
          return {
            parent: a,
            prop: piece
          }
        }
        a = this$1.storage(a[piece]) || a[piece]
      }
      throw 'path param in follow() is required'
    },
    storage: function storage (key) {
      return this.$root.fragments[toMin(typeof key === 'object' ? key['@id'] : key)]
    }
  }
}

var invoiceStyling = "<style type=\"text/css\">\n        html,\n        body {\n          box-sizing: border-box;\n          margin: 0;\n          padding: 0;\n          width: 210mm;\n          height: 277mm;\n          background: transparent;\n        }\n        .invoice-page {\n          position: static;\n          margin: 0;\n          outline: initial;\n          width: initial;\n          min-height: initial;\n          box-shadow: initial;\n          page-break-after: always;\n          transform: none!important;\n          transition: none;\n        }\n        .print-hidden {\n          display: none;\n        }\n        @page {\n          size: A4;\n          margin: 0;\n        }\n      </style>"

var defaultTax = {
  btw0: {
    text: 'BTW vrij',
    percent: 0
  },
  btw6: {
    text: 'BTW 6%',
    percent: 6
  },
  btw21: {
    text: 'BTW 21%',
    percent: 21
  }
}

var Invoice = {
render: function(){with(this){return _h('div',[_h('p',{staticClass:"fragment-cta"},[_h('button',{staticClass:"btn btn-soft",on:{"click":print}},["Print"])," ",_h('button',{staticClass:"btn btn-soft",on:{"click":function($event){preview=!preview}}},["Preview"])])," ",_h('iframe',{attrs:{"id":"ifmcontentstoprint","style":"border:0;height: 0px; width: 0px; position: absolute"}})," ",_h('style-inline',["\n      #printme {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        padding: 0 0 3rem;\n        overflow: auto;\n        background-color: #1b1f32;\n        z-index: 60;\n      }\n      .print-hidden {\n        margin: 0 auto;\n        max-width: 28rem;\n        text-align: center;\n      }\n      #printme>.invoice {\n        margin: 0 auto;\n      }\n      .invoice-ctrl {\n        margin: 2rem auto;\n        display: block;\n      }\n      .invoice-ctrl input {\n        width: 14rem;\n      }\n      body {\n        overflow: auto;\n      }\n    \n    "])," ",_h('div',{directives:[{name:"show",value:(preview),expression:"preview"}],attrs:{"id":"printme"}},[_h('div',{staticClass:"print-hidden"},[_h('div',{staticClass:"invoice-ctrl"},[_m(0)," ",_h('input-single',{attrs:{"a":a,"path":"customer.name","label":"Naam"}})," ",_h('input-single',{attrs:{"a":a,"path":"customer.address.streetAddress","label":"Straat + nummer"}})," ",_h('input-single',{attrs:{"a":a,"path":"customer.address.postalCode","label":"Postcode"}})," ",_h('input-single',{attrs:{"a":a,"path":"customer.address.addressLocality","label":"Stad"}})," ",_h('input-single',{attrs:{"a":a,"path":"customer.email","label":"E-mailadres"}})," ",_h('input-single',{attrs:{"a":a,"path":"customer.vatID","label":"Ondernemingsnummer"}})])," ",_h('div',{staticClass:"invoice-ctrl"},[_h('button',{staticClass:"btn",on:{"click":function($event){$root.sync(a.customer['@id'] || a['@id'])}}},["Bewaren"])," ",_h('button',{staticClass:"btn",on:{"click":print}},["Afdrukken"])])])," ",_h('div',{staticClass:"invoice invoice-page"},[_h('style-inline',["\n          .bold {\n            font-weight: bold;\n          }\n          .bolder {\n            font-weight: bolder;\n          }\n          .pre-wrap {\n            white-space: pre-wrap;\n          }\n          .method {\n            flex-basis: 100%;\n            margin: 1cm 0 0\n          }\n          .invoice * {\n            box-sizing: border-box;\n          }\n          .invoice a {\n            color: inherit;\n            text-decoration: none;\n            border-bottom: 1px dashed #999;\n          }\n          .invoice a:hover {\n            border-bottom: 2px solid #000;\n          }\n          .invoice h1 {\n            margin: 0;\n            font-size: 1.125em;\n            font-weight: 500;\n          }\n          .invoice h2 {\n            margin: 0;\n            font-size: 1.5em;\n            font-weight: 400;\n            opacity: .5;\n          }\n          .invoice h3 {\n            margin: 0;\n            font-size: 1.125em;\n            font-weight: 500;\n            line-height: 1.6rem;\n          }\n          .invoice h3+p {\n            margin: 0;\n            opacity: .8;\n          }\n          .invoice address>div {\n            white-space: nowrap;\n          }\n          .invoice-top {\n            padding: 2cm 0 1cm;\n          }\n          .invoice-parties {\n            display: flex;\n            align-items: flex-start;\n          }\n          .invoice-start {\n            text-transform: uppercase;\n            font-size: 2em;\n            font-weight: 700;\n            opacity: .4;\n            margin-bottom: 1em;\n          }\n          .invoice-to {\n            text-transform: uppercase;\n            font-size: 1.125em;\n            font-weight: 500;\n            opacity: .6;\n            margin-right: 1em;\n          }\n          .invoice .customer {\n            position: relative;\n            flex-grow: 1;\n          }\n          .invoice .provider {\n            color: #666;\n          }\n          .invoice .summary {\n            background: #eee;\n            display: flex;\n            justify-content: space-between;\n            flex-wrap: wrap;\n            padding: 1cm 2cm;\n          }\n          .invoice .summary-item {\n            font-size: 1.25rem;\n          }\n          .invoice .summary-label {\n            display: block;\n            text-transform: uppercase;\n            font-size: 12px;\n            font-weight: normal;\n          }\n          .invoice .badge {\n            padding: .3em .5em;\n            line-height: 1.2em;\n            background: #888;\n            color: #FFF;\n            text-transform: uppercase;\n            font-size: 1.5em;\n            text-align: center;\n          }\n          .invoice .number {\n            display: block;\n          }\n          .invoice .details {\n            padding-top: 1em;\n            margin-bottom: 1em;\n          }\n          .invoice .list {\n            margin-top: 1em;\n            padding-bottom: 1em;\n          }\n          .invoice .taxes {\n            text-align: right;\n          }\n          .invoice-asterisk {\n            font-weight: 900;\n            color: red;\n          }\n          .tbl {\n            border: 0;\n            border-collapse: collapse;\n            text-align: left;\n          }\n          .tbl td,\n          .tbl th {\n            line-height: 1.4em;\n          }\n          .tbl-orders {\n            width: 100%;\n          }\n          .tbl-orders  td {\n            border-bottom: 1px solid #ccc;\n            padding-top: .5em;\n            padding-bottom: .5em;\n          }\n          .tbl-orders  th {\n            border-bottom: 1px solid #ccc;\n            padding-top: .5em;\n            padding-bottom: 1em;\n            font-size: 12px;\n            font-weight: 400;\n            text-transform: uppercase;\n            color: #666;\n          }\n\n          .tbl-calc {\n            float: right;\n            margin-top: .5em;\n          }\n          .tbl-calc> .e {\n            padding-left: 3em;\n          }\n          .tbl .e {\n            text-align: right;\n            padding-left: 2em;\n            white-space: nowrap;\n            vertical-align: top;\n          }\n          .invoice {\n            font-family: \"Segoe UI\", Frutiger, \"Frutiger Linotype\", \"Dejavu Sans\", \"Helvetica Neue\", sans-serif;\n            color: black;\n            font-size: 16px;\n          }\n          .invoice-page {\n            width: 210mm;\n            min-height: 277mm;\n            padding: 0;\n            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n            background: #fff;\n          }\n          #printme .invoice-subpage {\n            height: 277mm;\n            padding-bottom: 2cm;\n          }\n          .invoice-subpage {\n            height: 277mm;\n            display: -webkit-box;\n            display: -webkit-flex;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-box-orient: vertical;\n            -webkit-box-direction: normal;\n            -webkit-flex-direction: column;\n                -ms-flex-direction: column;\n                    flex-direction: column;\n            -webkit-box-pack: justify;\n            -webkit-justify-content: space-between;\n                -ms-flex-pack: justify;\n                    justify-content: space-between;\n          }\n          .invoice-container {\n            padding-left: 2cm;\n            padding-right: 2cm;\n          }\n          .invoice h3 {\n            margin: 0;\n            font-size: 1.125em;\n            font-weight: 500;\n            line-height: 25px;\n            line-height: 1.6rem;\n          }\n          .invoice p {\n            margin: 1em 0;\n          }\n          .invoice h3+p {\n            margin: 0;\n            opacity: .8;\n            filter: alpha(opacity=80);\n          }\n        \n        "])," ",_h('div',{staticClass:"invoice-subpage"},[(a.provider||a.customer)?_h('div',{staticClass:"invoice-container"},[_h('div',{staticClass:"invoice-top"},[_m(1)," ",_h('div',{staticClass:"invoice-parties"},[_m(2)," ",(a.customer)?_h('section',{staticClass:"customer"},[_h('h1',[_s(a.customer.name)])," ",_h('address',[_h('div',[_s(a.customer.address&&a.customer.address.streetAddress)])," ",_h('div',[_s(a.customer.address&&a.customer.address.postalCode)+" "+_s(a.customer.address&&a.customer.address.addressLocality)])])," ",_h('div',[_h('a',{attrs:{"href":'mailto:'+a.customer.email}},[_s(a.customer.email)])])," ",(!a.customer.email)?_h('div',[_h('a',{attrs:{"href":a.customer.url}},[_s(a.customer.url)])]):_e()," ",_h('div',[_s(a.customer.vatID)])]):_e()," ",(a.provider)?_h('section',{staticClass:"provider"},[(a.provider.logo)?_h('img',{attrs:{"src":a.provider.logo||''}}):_e()," ",_h('h1',[_s(a.provider.name)])," "," ",(a.provider.address)?_h('address',[_h('div',[_s(a.provider.address&&a.provider.address.streetAddress)])," ",_h('div',[_s(a.provider.address&&a.provider.address.postalCode)+" "+_s(a.provider.address&&a.provider.address.addressLocality)])]):_e()," ",_h('div',[_h('a',{attrs:{"href":'mailto:'+a.provider.email}},[_s(a.provider.email)])])," ",(!a.provider.email)?_h('div',[_h('a',{attrs:{"href":a.provider.url}},[_s(a.provider.url)])]):_e()," ",_h('div',[_s(a.provider.vatID)])]):_e()])])]):_e()," ",(dateCreated||a.url||paymentDueDate)?_h('section',{staticClass:"summary"},[(invoiceNumber)?_h('div',{staticClass:"summary-item"},[_m(3)," ",_h('div',{staticClass:"number",domProps:{"textContent":_s(invoiceNumber)}},["01 / 2015"])]):_e()," ",(dateCreated)?_h('div',{staticClass:"summary-item"},[_m(4)," "+_s(_f("date")(a.dateCreated))+"\n            "]):_e()," ",(paymentDueDate)?_h('div',{staticClass:"summary-item bolder"},[_m(5)," "+_s(_f("date")(paymentDueDate))+"\n            "]):_e()," ",(total)?_h('div',{staticClass:"summary-item bolder"},[_m(6)," € "+_s(total)+"\n            "]):_e()," ",(a.paymentMethod)?_h('p',{staticClass:"method",domProps:{"innerHTML":_s(a.paymentMethod)}}):_e()]):_e()," ",(a.referencesOrder)?_h('section',{staticClass:"list invoice-container"},[_h('table',{staticClass:"tbl tbl-orders"},[_m(7)," ",_h('tbody',[(orders)&&_l((orders),function(order){return _h('tr',[_h('td',[(order.orderedItem.name)?_h('h3',[_s(order.orderedItem.name)]):_e()," ",(order.orderedItem.description)?_h('p',{staticClass:"pre-wrap"},[_s(order.orderedItem.description)]):_e()])," ",_h('td',{staticClass:"e"},[(order.acceptedOffer.price)?_h('span',["\n                    € "+_s(order.acceptedOffer.price||0)+"\n                    "]):_e()])])})])])," ",(totalPaymentDue)?_h('table',{staticClass:"tbl tbl-calc"},[_h('tbody',[(totalPaymentDue)&&_l((totalPaymentDue),function(line,index){return _h('tr',{key:index,class:{bold:line.valueAddedTaxIncluded}},[_h('td',[_s(line.name)+" ",(line.asterisk)?_h('span',{staticClass:"invoice-asterisk"},["*"]):_e()])," ",(line.price!=undefined)?_h('td',{staticClass:"e"},["€ "+_s(line.price)]):_e()])})])]):_e()," ",(taxExemptionRule)?_h('p',{attrs:{"style":"float:right;text-align:right;width:100%"}},[_m(8)," Bijzondere vrijstellingsregeling kleine ondernemingen   \n            "]):_e()]):_e()," ",(a.provider)?_h('footer',{staticClass:"invoice-container"},[_h('strong',[_s(a.provider.name)])," ",(a.provider.address)?_h('i',["   •   "+_s(a.provider.address.streetAddress)+", "+_s(a.provider.address.postalCode)+" "+_s(a.provider.address.addressLocality)]):_e()," ",(a.provider.vatID)?_h('span',["  •   "+_s(a.provider.vatID)]):_e()]):_e()])])," ",_h('div',{staticClass:"print-hidden"},[_h('div',{staticClass:"invoice-ctrl"},[_h('button',{staticClass:"btn btn-soft",on:{"click":function($event){preview=0}}},["Close"])])])])])}},
staticRenderFns: [function(){with(this){return _h('p',["\n            Klik op 'Bewaren' nadat je verbeteringen aangebracht hebt.\n          "])}},function(){with(this){return _h('div',{staticClass:"invoice-start"},["Factuur"])}},function(){with(this){return _h('div',{staticClass:"invoice-to"},["aan"])}},function(){with(this){return _h('span',{staticClass:"summary-label"},["Factuurnr."])}},function(){with(this){return _h('span',{staticClass:"summary-label"},["Factuurdatum"])}},function(){with(this){return _h('span',{staticClass:"summary-label"},["Vervaldatum"])}},function(){with(this){return _h('span',{staticClass:"summary-label"},["Totaalbedrag"])}},function(){with(this){return _h('thead',[_h('tr',[_h('th',["Beschrijving"])," ",_h('th',{staticClass:"e"},["Bedrag"])])])}},function(){with(this){return _h('span',{staticClass:"invoice-asterisk"},["*"])}}],
  props: ['a', 'options'],
  data: function data () {
    return {
      preview: true
    }
  },
  computed: {
    invoiceNumber: function invoiceNumber$1 () {
      var n = this.a.url || this.a['@id'] || 'nope'
      n = n.slice(n.lastIndexOf(':') + 1)
      n = n.slice(n.lastIndexOf('/') + 1)
      return n.indexOf('-') > 0 ? n.slice(0, n.indexOf('-')) : n
    },
    dateCreated: function dateCreated$1 () {
      if (!this.a.dateCreated) {
        this.$set(this.$root.fragments[toMin(this.a['@id'])], 'schema:dateCreated', {
          '@type': 'xsd:date',
          '@value': new Date().toJSON().slice(0, 10)
        })
      }
      return this.a.dateCreated
    },
    paymentDueDate: function paymentDueDate$1 () {
      if (!this.a.paymentDueDate && this.dateCreated) {
        var d = new Date(this.dateCreated)
        d.setMonth(d.getMonth() + 1)
        this.$set(this.$root.fragments[toMin(this.a['@id'])], 'schema:paymentDueDate', {
          '@type': 'xsd:date',
          '@value': d.toJSON().slice(0, 10)
        })
      }
      return this.a.paymentDueDate
    },
    taxExemptionRule: function taxExemptionRule$1 () {
      return this.a.provider && this.a.provider['be:taxExemptionRule']
    },
    total: function total$1 () {
      return this.totalPaymentDue[this.totalPaymentDue.length - 1].price
    },
    orders: function orders$1 () {
      return Array.isArray(this.a.referencesOrder) ? this.a.referencesOrder : [this.a.referencesOrder]
    },
    totalPaymentDue: function totalPaymentDue$1 () {
      if (this.a.totalPaymentDue) {
        return this.a.totalPaymentDue
      }

      if (!this.orders) {
        this.a.referencesOrder = [{
          orderedItem: {
            name: ''
          },
          acceptedOffer: {
            price: 10
          }
        }]
      }

      if (typeof this.orders[0] !== 'object') {
        alert('expected object but got ' +  this.a.referencesOrder)
        return
      }

      var totalExcl = 0
      var totalIncl = 0
      var tax = inert(defaultTax)
      this.orders.forEach(function(v, k) {

        if (!v.orderedItem) { return }
        if (!v.acceptedOffer) { return }

        /* Get category */
        var cat = v.orderedItem.category
        if (cat === undefined) { cat = 'btw21' }
        var taxcat = tax[cat]
        if (taxcat === undefined) { taxcat = tax['btw21'] }
        if (!taxcat.vat) { taxcat.vat = 0 }

        /* Get the rest */
        var pct = (taxcat.percent || 0) / 100
        var price = parseInt(v.acceptedOffer.price) || 0
        var incl = !!v.acceptedOffer.valueAddedTaxIncluded

        /* Count */
        var vat = price * pct / (incl ? 1 + pct : 1)
        totalExcl += incl ? price - vat : price
        totalIncl += incl ? price : price + vat
        taxcat.vat += vat
      })

      if (this.taxExemptionRule) {
        return [{
          '@type': 'PriceSpecification',
          price: 0,
          priceCurrency: '%',
          name: 'Btw-tarief: 0%',
          asterisk: 1
        }, {
          '@type': 'PriceSpecification',
          price: totalExcl,
          priceCurrency: 'EUR',
          name: 'Totaal',
          valueAddedTaxIncluded: true
        }]
      }

      /* Generate totalPaymentDue */
      var due = [{
        '@type': 'PriceSpecification',
        price: totalExcl,
        priceCurrency: 'EUR',
        name: 'Totaal excl. BTW',
        valueAddedTaxIncluded: false
      }]
      for (var key in tax) {
        if (tax[key].vat) {
          due.push({
            '@type': 'PriceSpecification',
            price: tax[key].vat,
            priceCurrency: 'EUR',
            name: tax[key].text
          })
        }
      }

      due.push({
        '@type': 'PriceSpecification',
        price: totalIncl,
        priceCurrency: 'EUR',
        name: 'Totaal incl. BTW',
        valueAddedTaxIncluded: true
      })

      return due
    }
  },
  methods: {
    print: function print$1 () {
      var content = document.getElementById('printme').innerHTML
      var pri = document.getElementById('ifmcontentstoprint').contentWindow
      pri.document.open()
      pri.document.write(content + invoiceStyling)
      pri.document.close()
      pri.focus()
      pri.print()
    }
  },
  created: function created () {
    console.log('Invoice compnent created')
    this.options.resolve = 3
  },
  filters: {
    'date': function date (date) {
      return date
    }
  },
  components: {
    InputSingle: InputSingle,
    StyleInline: StyleInline
  }
}

window.Vue.use({
	install: function install (Vue) {
	  Vue.component('invoice', Invoice)
	}
})