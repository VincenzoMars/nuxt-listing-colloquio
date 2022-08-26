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
  }
} 
</script>