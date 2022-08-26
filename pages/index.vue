<template>
    <section id="listing" class="d-flex d-row j-center">
      <div class="listing-wrapper d-flex d-row j-space-between">
        <listing-filters></listing-filters>
        <listing-items></listing-items>
        <compare-products></compare-products>
      </div>
    </section>
</template>

<script>
import ListingFilters from '../components/ListingFilters.vue'
import ListingItems from '../components/ListingItems.vue'
import CompareProducts from '../components/CompareProducts.vue'
import '../assets/styles/pages/listing.scss'

export default {
  name: 'Listing',
  components: {
    ListingFilters,
    ListingItems,
    CompareProducts
  },
  data() {
    return {
      products: [],
      filters: []
    }
  },
  async fetch() {
    this.products = await fetch(`https://listing-colloquio.free.beeceptor.com/products`).then(res => res.json())
    this.filters = await fetch(`https://listing-colloquio.free.beeceptor.com/filters`).then(res => res.json())
  },
  mounted () {
    this.loadProducts()
    this.createFilters()
  },
  methods: {
    loadProducts() {
      this.$store.commit('listing/setTotalProducts', this.products)
      this.$store.commit('listing/setActiveProducts', this.products)
    },
    createFilters() {
      this.$store.commit('listing/setTotalFilters', this.filters)
      this.$store.getters['listing/getTotalProducts'].forEach(product => {
        Object.entries(product.filters).forEach(productFilter => {
          const filter = this.filters.find(filter => filter.name === productFilter[0])

          // if a product value has more selections, then iterate each value selected and create values for filters
          if (Array.isArray(productFilter[1])) {
            productFilter[1].forEach(productValue => {
              this.createValue(product, filter, productValue)
            })
          } else {
            this.createValue(product, filter, productFilter[1])
          }
        })
			})
    },
    createValue(product, filter, productValue) {
      const value = filter.values.find(value => value.id === productValue)
      if (isNaN(value.quantity)) {
        value.quantity = 0
      }
      value.quantity++
      if (!value.productIds) {
        value.productIds = []
      }
      value.productIds.push(product.id)
    }
  }
} 
</script>