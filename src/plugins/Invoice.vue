<template>
  <div>
    <p class="fragment-cta">
      <button class="btn btn-soft" @click="print">Print</button>
      <button class="btn btn-soft" @click="preview=!preview">Preview</button>
    </p>
    <iframe id="ifmcontentstoprint" style="border:0;height: 0px; width: 0px; position: absolute"></iframe>
    <template id="invoicestyling">
      <style type="text/css">
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
        @page {
          size: A4;
          margin: 0;
        }
      </style>
    </template>
    <div id="printme" v-show="preview">
      <div class="invoice invoice-page">
        <style>
          .bold {
            font-weight: bold;
          }
          .bolder {
            font-weight: bolder;
          }
          header {
            position: relative;
            flex-grow: 1;
          }
          .method {
            flex-basis: 100%;
            margin: 1cm 0 0
          }
          .flex-top {
            padding: 2cm 0 1cm;
            display: flex;
            align-items: flex-end;
          }
          .invoice * {
            box-sizing: border-box;
          }
          .invoice a {
            color: inherit;
          }
          .invoice h1 {
            margin: 0;
            font-size: 2em;
            font-weight: 300;
            line-height: 1.1;
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
        <div class="invoice-subpage">
          <div class="invoice-container" v-if="a.provider||a.customer">
            <div class="flex-top">
              <img :src="a.provider.logo||''" v-if="a.provider.logo">
              <header v-if="a.provider">
                <h1 class="h1">{{a.provider.name}}</h1>
                <!-- <h2 class="h2">{{a.customer.roleName}}</h2> -->
                <address v-if="a.provider.address">
                  <div>{{a.provider.address.streetAddress}}</div>
                  <div>{{a.provider.address.postalCode}} {{a.provider.address.addressLocality}}</div>
                </address>
                <div><a href="mailto:{{a.provider.email}}">{{a.provider.email}}</a></div>
                <div><a href="mailto:{{a.provider.url}}">{{a.provider.url}}</a></div>
                <div>{{a.provider.vatID}}</div>
              </header>
              <section class="customer" v-if="a.customer">
                Opgemaakt voor:
                <div>{{a.customer.name}}</div>
                <address>
                  <div>{{a.customer.address.streetAddress}}</div>
                  <div>{{a.customer.address.postalCode}} {{a.customer.address.addressLocality}}</div>
                </address>
                <div><a href="mailto:{{a.customer.email}}">{{a.customer.email}}</a></div>
                <div><a href="mailto:{{a.customer.url}}">{{a.customer.url}}</a></div>
                <div>{{a.customer.vatID}}</div>
              </section>
            </div>
          </div>
          <section class="summary" v-if="a.dateCreated||a.url||a.paymentDueDate">
            <div class="summary-item" v-if="a.url">
              <span class="summary-label">Factuurnr.</span>
              <div class="number" v-text="invoiceNumber">01 / 2015</div>
            </div>
            <div class="summary-item" v-if="a.dateCreated">
              <span class="summary-label">Factuurdatum</span> {{a.dateCreated| date}}
            </div>
            <div class="summary-item bolder" v-if="a.paymentDueDate">
              <span class="summary-label">Vervaldatum</span> {{a.paymentDueDate| date}}
            </div>
            <div class="summary-item bolder" v-if="total">
              <span class="summary-label">Totaalbedrag</span>{{total|currency '€ '}}
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
                <tr v-for="order in a.referencesOrder">
                  <td>
                    <h3 v-if="order.orderedItem.name">{{order.orderedItem.name}}</h3>
                    <p v-if="order.orderedItem.description">{{order.orderedItem.description}}</p>
                  </td>
                  <td class="e">
                    <span v-if="order.acceptedOffer.price">
                    {{order.acceptedOffer.price||0|currency '€ '}}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="tbl tbl-calc" v-if="a.totalPaymentDue">
              <tbody>
                <tr v-for="line in a.totalPaymentDue" :class="{bold:line.valueAddedTaxIncluded}">
                  <td>{{line.name}}</td>
                  <td class="e" v-if="line.price!=undefined">{{line.price|currency '€ '}}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <footer class="invoice-container" v-if="a.provider">
            <strong>{{a.provider.name}}</strong>
            <i v-if="a.provider.address"> &nbsp; &bullet; &nbsp; {{a.provider.address.streetAddress}}, {{a.provider.address.postalCode}} {{a.provider.address.addressLocality}}</i>
            <span v-if="a.provider.vatID">&nbsp; &bullet; &nbsp; {{a.provider.vatID}}</span>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['a', 'options'],
  data () {
    return {
      preview: false
    }
  },
  computed: {
    invoiceNumber () {
      if (!this.a.url) return ''
      return this.a.url.substring(this.a.url.lastIndexOf('/') + 1)
    },
    total () {
      return this.a.totalPaymentDue[this.a.totalPaymentDue.length - 1].price
    }
  },
  methods: {
    print () {
      var styling = document.getElementById('invoicestyling').innerHTML
      var content = document.getElementById('printme').innerHTML
      var pri = document.getElementById('ifmcontentstoprint').contentWindow
      pri.document.open()
      pri.document.write(content + styling)
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
  }
}
</script>
