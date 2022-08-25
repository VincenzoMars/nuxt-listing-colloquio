<template>
    <section id="listing-items">
      <div class="listing-items__pagination-header d-flex f-row-reverse a-center j-space-between">
        <a class="sort-by-button color-complementary">
          <span class="f-size-15 letter-spacing-0 line-height-20 f-weight-book">Ordina per: migliori recensioni</span>
          <i class="icon icon-arrow_bottom"></i>
        </a>
      </div>
      <div class="listing-items__wrapper">
        <template v-for="product in activeProducts">
          <listing-item :key="product.id" :product="product"></listing-item>
        </template>
      </div>
      <div class="listing-items__pagination-footer d-flex f-row a-center j-space-between">
        <a class="prev-button">
          <i class="icon icon-arrow-left"></i>
          <span class="f-size-15 f-weight-book letter-spacing-0 line-height-20">Prev</span>
        </a>
        <div class="navigation-dots d-flex f-row a-center j-space-between f-size-12 f-weight-black letter-spacing-small line-height-22">
          <button class="dot active-dot f-weight-black ">1</button>
          <button class="dot f-weight-black ">2</button>
          <button class="dot f-weight-black ">3</button>
        </div>
        <a class="next-button">
          <span class="f-size-15 f-weight-book letter-spacing-0 line-height-20">Next</span>
          <i class="icon icon-arrow-right"></i>
        </a>
      </div>
    </section>
</template>

<script>
import '../assets/styles/components/listing-items.scss'
import ListingItem from './ListingItem.vue'

export default {
  name: 'ListingItems',
  components: {
    ListingItem
  },
  computed: {
    activeProducts() {
      return this.$store.getters['listing/getActiveProducts']
    }
  }
} 
</script>