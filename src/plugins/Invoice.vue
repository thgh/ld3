<template>
  <div>
    <p class="fragment-cta">
      <button class="btn btn-soft" @click="print">Print</button>
      <button class="btn btn-soft" @click="preview=!preview">Preview</button>
    </p>
    <iframe id="ifmcontentstoprint" style="border:0;height: 0px; width: 0px; position: absolute"></iframe>
    <style-inline>
      #printme {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 0 3rem;
        overflow: auto;
        background-color: #1b1f32;
        z-index: 60;
      }
      .print-hidden {
        margin: 0 auto;
        padding: 0 5mm;
        max-width: 22cm;
      }
      #printme>.invoice {
        margin: 0 auto;
      }
      .invoice-ctrl {
        margin: 2rem 0;
        display: block;
      }
      .invoice-ctrl input {
        width: 14rem;
      }
      body {
        overflow: auto;
      }
    </style>
    </style-inline>
    <div id="printme" v-show="preview">
      <div class="print-hidden">
        <div class="invoice-ctrl">
          <p>
            Klik op 'Bewaren' nadat je verbeteringen aangebracht hebt.
          </p>
          <input-single :a="a" path="customer.name" label="Naam"></input-single>
          <input-single :a="a" path="customer.address.streetAddress" label="Straat + nummer"></input-single>
          <input-single :a="a" path="customer.address.postalCode" label="Postcode"></input-single>
          <input-single :a="a" path="customer.address.addressLocality" label="Stad"></input-single>
          <input-single :a="a" path="customer.email" label="E-mailadres"></input-single>
          <input-single :a="a" path="customer.vatID" label="Ondernemingsnummer"></input-single>
        </div>
        <div class="invoice-ctrl">
          <button class="btn" @click="$root.sync(a.customer['@id'] || a['@id'])">Bewaren</button>
          <button class="btn" @click="print">Afdrukken</button>
        </div>
      </div>
      <div class="invoice invoice-page">
        <style-inline>
          .bold {
            font-weight: bold;
          }
          .bolder {
            font-weight: bolder;
          }
          .pre-wrap {
            white-space: pre-wrap;
          }
          .method {
            flex-basis: 100%;
            margin: 1cm 0 0
          }
          .invoice * {
            box-sizing: border-box;
          }
          .invoice a {
            color: inherit;
            text-decoration: none;
            border-bottom: 1px dashed #999;
          }
          .invoice a:hover {
            border-bottom: 2px solid #000;
          }
          .invoice h1 {
            margin: 0;
            font-size: 1.125em;
            font-weight: 500;
          }
          .invoice h2 {
            margin: 0;
            font-size: 1.5em;
            font-weight: 400;
            opacity: .5;
          }
          .invoice h3 {
            margin: 0;
            font-size: 1.125em;
            font-weight: 500;
            line-height: 1.6rem;
          }
          .invoice h3+p {
            margin: 0;
            opacity: .8;
          }
          .invoice address>div {
            white-space: nowrap;
          }
          .invoice-top {
            padding: 2cm 0 1cm;
          }
          .invoice-parties {
            display: flex;
            align-items: flex-start;
          }
          .invoice-start {
            text-transform: uppercase;
            font-size: 2em;
            font-weight: 700;
            opacity: .4;
            margin-bottom: 1em;
          }
          .invoice-to {
            text-transform: uppercase;
            font-size: 1.125em;
            font-weight: 500;
            opacity: .6;
            margin-right: 1em;
          }
          .invoice .customer {
            position: relative;
            flex-grow: 1;
          }
          .invoice .provider {
            color: #666;
          }
          .invoice .summary {
            background: #eee;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 1cm 2cm;
          }
          .invoice .summary-item {
            font-size: 1.25rem;
          }
          .invoice .summary-label {
            display: block;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: normal;
          }
          .invoice .badge {
            padding: .3em .5em;
            line-height: 1.2em;
            background: #888;
            color: #FFF;
            text-transform: uppercase;
            font-size: 1.5em;
            text-align: center;
          }
          .invoice .number {
            display: block;
          }
          .invoice .details {
            padding-top: 1em;
            margin-bottom: 1em;
          }
          .invoice .list {
            margin-top: 1em;
            padding-bottom: 1em;
          }
          .invoice .taxes {
            text-align: right;
          }
          .invoice-asterisk {
            font-weight: 900;
            color: red;
          }
          .tbl {
            border: 0;
            border-collapse: collapse;
            text-align: left;
          }
          .tbl td,
          .tbl th {
            line-height: 1.4em;
          }
          .tbl-orders {
            width: 100%;
          }
          .tbl-orders  td {
            border-bottom: 1px solid #ccc;
            padding-top: .5em;
            padding-bottom: .5em;
          }
          .tbl-orders  th {
            border-bottom: 1px solid #ccc;
            padding-top: .5em;
            padding-bottom: 1em;
            font-size: 12px;
            font-weight: 400;
            text-transform: uppercase;
            color: #666;
          }

          .tbl-calc {
            float: right;
            margin-top: .5em;
          }
          .tbl-calc> .e {
            padding-left: 3em;
          }
          .tbl .e {
            text-align: right;
            padding-left: 2em;
            white-space: nowrap;
            vertical-align: top;
          }
          .invoice {
            font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", sans-serif;
            color: black;
            font-size: 16px;
          }
          .invoice-page {
            width: 210mm;
            min-height: 277mm;
            padding: 0;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            background: #fff;
          }
          #printme .invoice-subpage {
            height: 277mm;
            padding-bottom: 2cm;
          }
          .invoice-subpage {
            height: 277mm;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
                -ms-flex-direction: column;
                    flex-direction: column;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
                -ms-flex-pack: justify;
                    justify-content: space-between;
          }
          .invoice-container {
            padding-left: 2cm;
            padding-right: 2cm;
          }
          .invoice h3 {
            margin: 0;
            font-size: 1.125em;
            font-weight: 500;
            line-height: 25px;
            line-height: 1.6rem;
          }
          .invoice p {
            margin: 1em 0;
          }
          .invoice h3+p {
            margin: 0;
            opacity: .8;
            filter: alpha(opacity=80);
          }
        </style>
        </style-inline>
        <div class="invoice-subpage">
          <div class="invoice-container" v-if="a.provider||a.customer">
            <div class="invoice-top">
              <div class="invoice-start">Factuur</div>
              <div class="invoice-parties">
                <div class="invoice-to">aan</div>
                <section class="customer" v-if="a.customer">
                  <h1>{{a.customer.name}}</h1>
                  <address>
                    <div>{{a.customer.address&&a.customer.address.streetAddress}}</div>
                    <div>{{a.customer.address&&a.customer.address.postalCode}} {{a.customer.address&&a.customer.address.addressLocality}}</div>
                  </address>
                  <div><a :href="'mailto:'+a.customer.email">{{a.customer.email}}</a></div>
                  <div v-if="!a.customer.email"><a :href="a.customer.url">{{a.customer.url}}</a></div>
                  <div>{{a.customer.vatID}}</div>
                </section>
                <section class="provider" v-if="a.provider">
                  <img :src="a.provider.logo||''" v-if="a.provider.logo">
                  <h1>{{a.provider.name}}</h1>
                  <!-- <h2 class="h2">{{a.customer.roleName}}</h2> -->
                  <address v-if="a.provider.address">
                    <div>{{a.provider.address&&a.provider.address.streetAddress}}</div>
                    <div>{{a.provider.address&&a.provider.address.postalCode}} {{a.provider.address&&a.provider.address.addressLocality}}</div>
                  </address>
                  <div><a :href="'mailto:'+a.provider.email">{{a.provider.email}}</a></div>
                  <div v-if="!a.provider.email"><a :href="a.provider.url">{{a.provider.url}}</a></div>
                  <div>{{a.provider.vatID}}</div>
                </section>
              </div>
            </div>
          </div>
          <section class="summary" v-if="dateCreated||a.url||paymentDueDate">
            <div class="summary-item" v-if="invoiceNumber">
              <span class="summary-label">Factuurnr.</span>
              <div class="number" v-text="invoiceNumber">01 / 2015</div>
            </div>
            <div class="summary-item" v-if="dateCreated">
              <span class="summary-label">Factuurdatum</span> {{a.dateCreated| date}}
            </div>
            <div class="summary-item bolder" v-if="paymentDueDate">
              <span class="summary-label">Vervaldatum</span> {{paymentDueDate| date}}
            </div>
            <div class="summary-item bolder" v-if="total">
              <span class="summary-label">Totaalbedrag</span> € {{total}}
            </div>
            <p class="method" v-if="a.paymentMethod" v-html="a.paymentMethod"></p>
          </section>
          <section class="list invoice-container" v-if="a.referencesOrder">
            <table class="tbl tbl-orders">
              <thead>
                <tr>
                  <th>Beschrijving</th>
                  <th class="e">Bedrag</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders">
                  <td>
                    <h3 v-if="order.orderedItem.name">{{order.orderedItem.name}}</h3>
                    <p class="pre-wrap" v-if="order.orderedItem.description">{{order.orderedItem.description}}</p>
                  </td>
                  <td class="e">
                    <span v-if="order.acceptedOffer.price">
                    € {{order.acceptedOffer.price||0}}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="tbl tbl-calc" v-if="totalPaymentDue">
              <tbody>
                <tr v-for="(line, index) in totalPaymentDue" :key="index" :class="{bold:line.valueAddedTaxIncluded}">
                  <td>{{line.name}} <span v-if="line.asterisk" class="invoice-asterisk">*</span></td>
                  <td class="e" v-if="line.price!=undefined">€ {{line.price}}</td>
                </tr>
              </tbody>
            </table>
            <p v-if="taxExemptionRule" style="float:right;text-align:right;width:100%">
              <span class="invoice-asterisk">*</span> Bijzondere vrijstellingsregeling kleine ondernemingen   
            </p>
          </section>
          <footer class="invoice-container" v-if="a.provider">
            <strong>{{a.provider.name}}</strong>
            <i v-if="a.provider.address"> &nbsp; &bullet; &nbsp; {{a.provider.address.streetAddress}}, {{a.provider.address.postalCode}} {{a.provider.address.addressLocality}}</i>
            <span v-if="a.provider.vatID">&nbsp; &bullet; &nbsp; {{a.provider.vatID}}</span>
          </footer>
        </div>
      </div>

      <div class="print-hidden">
        <div class="invoice-ctrl">
          <button class="btn btn-soft" @click="preview=0">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inert, toMin, StyleInline } from '../libs/util.js'

import InputSingle from '../components/InputSingle.vue'

const invoiceStyling = `<style type="text/css">
        html,
        body {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          width: 210mm;
          height: 277mm;
          background: transparent;
        }
        .invoice-page {
          position: static;
          margin: 0;
          outline: initial;
          width: initial;
          min-height: initial;
          box-shadow: initial;
          page-break-after: always;
          transform: none!important;
          transition: none;
        }
        .print-hidden {
          display: none;
        }
        @page {
          size: A4;
          margin: 0;
        }
      </style>`

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

export default {
  props: ['a', 'options'],
  data () {
    return {
      preview: true
    }
  },
  computed: {
    invoiceNumber () {
      var n = this.a.url || this.a['@id'] || 'nope'
      n = n.slice(n.lastIndexOf(':') + 1)
      n = n.slice(n.lastIndexOf('/') + 1)
      return n.indexOf('-') > 0 ? n.slice(0, n.indexOf('-')) : n
    },
    dateCreated () {
      if (!this.a.dateCreated) {
        this.$set(this.$root.fragments[toMin(this.a['@id'])], 'schema:dateCreated', {
          '@type': 'xsd:date',
          '@value': new Date().toJSON().slice(0, 10)
        })
      }
      return this.a.dateCreated
    },
    paymentDueDate () {
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
    taxExemptionRule () {
      return this.a.provider && this.a.provider['be:taxExemptionRule']
    },
    total () {
      return this.totalPaymentDue[this.totalPaymentDue.length - 1].price
    },
    orders () {
      return Array.isArray(this.a.referencesOrder) ? this.a.referencesOrder : [this.a.referencesOrder]
    },
    totalPaymentDue () {
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
        // alert('expected object but got ' +  this.a.referencesOrder)
        return
      }

      var totalExcl = 0
      var totalIncl = 0
      var tax = inert(defaultTax)
      this.orders.forEach(function(v, k) {

        if (!v.orderedItem) return
        if (!v.acceptedOffer) return

        /* Get category */
        var cat = v.orderedItem.category
        if (cat === undefined) cat = 'btw21'
        var taxcat = tax[cat]
        if (taxcat === undefined) taxcat = tax['btw21']
        if (!taxcat.vat) taxcat.vat = 0

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
      for (let key in tax) {
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
    print () {
      var content = document.getElementById('printme').innerHTML
      var pri = document.getElementById('ifmcontentstoprint').contentWindow
      pri.document.open()
      pri.document.write(content + invoiceStyling)
      pri.document.close()
      pri.focus()
      pri.print()
    }
  },
  created () {
    console.log('Invoice compnent created')
    this.options.resolve = 3
  },
  filters: {
    'date' (date) {
      return date
    }
  },
  components: {
    InputSingle,
    StyleInline
  }
}
</script>
