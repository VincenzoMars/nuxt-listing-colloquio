<template>
    <section id="listing-filters" class="d-flex f-column j-flex-start">
      <div class="listing-filters__categories">
        <h5 class="categories-title f-size-12 f-weight-black letter-spacing-small line-height-20">Categorie</h5>
        <p class="category-label f-size-15 f-weight-book letter-spacing-none line-height-20 color-complementary">Riscaldamento</p>
        <p class="sub-category-label f-size-15 f-weight-book letter-spacing-none line-height-20">Casa e acqua</p>
        <p class="sub-category-label f-size-15 f-weight-book letter-spacing-none line-height-20">Casa</p>
        <p class="sub-category-label f-size-15 f-weight-book letter-spacing-none line-height-20">Acqua</p>
      </div>
      <template v-for="filter in totalFilters">
        <listing-filter :key="filter.name" :filter="filter"></listing-filter>
      </template>
    </section>
</template>

<script>
import '../assets/styles/components/listing-filters.scss'
import ListingFilter from './ListingFilter.vue'


export default {
  name: 'ListingFilters',
  components: {
    ListingFilter,
  },
  computed: {
    totalFilters() {
      return this.$store.getters['listing/getTotalFilters']
    }
  },
} 
</script>