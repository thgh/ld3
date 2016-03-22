<template>
  <div class="invoice">
    <button @click="print">print</button>
    <iframe id="ifmcontentstoprint" style="border:0;height: 0px; width: 0px; position: absolute"></iframe>

    <div class="invoice-page" id="printme">
      <div class="invoice-subpage">
        <div class="invoice-container" v-if="a.provider||a.customer">
          <div class="flex-top">
            <img :src="a.provider.logo||''" v-if="a.provider.logo">
            <header v-if="a.provider">
              <h1 class="h1">{{a.provider.name}}</h1>
              <!-- <h2 class="h2">{{a.customer.roleName}}</h2> -->
              <address>
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
            <span class="summary-label">Factuurdatum</span> {{a.dateCreated| date 'yyyy-MM-dd'}}
          </div>
          <div class="summary-item bolder" v-if="a.paymentDueDate">
            <span class="summary-label">Vervaldatum</span> {{a.paymentDueDate| date 'yyyy-MM-dd'}}
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
</template>

<script>
export default {
  props: ['a'],
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
      var content = document.getElementById('printme')
      var pri = document.getElementById('ifmcontentstoprint').contentWindow
      pri.document.open()
      pri.document.write(content.innerHTML)
      pri.document.close()
      pri.focus()
      pri.print()
    }
  },
  filters: {
    'date' () {
      return 'date'
    }
  }
}
</script>

<style>
.invoice {
  color: black;
  font-size: 16px;
}
.invoice-page {
  position: absolute;
  width: 210mm;
  min-height: 297mm;
/*  margin-top: -148.5mm;
  top: 50%;
  margin-left: -105mm;
  left: 50%;*/
  padding: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background: #fff;
}
.invoice-subpage {
  height: 297mm;
  padding-bottom: 2cm;
  display: flex;
  flex-direction: column;
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
  line-height: 1.6rem;
}
.invoice p {
  margin: 1em 0;
}
.invoice h3+p {
  margin: 0;
  opacity: .8;
}

</style>