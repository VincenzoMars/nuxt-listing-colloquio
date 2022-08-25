<template>
    <section id="listing-filter" class="d-flex f-column j-flex-start">
        <h5 class="listing-filter__title f-size-12 f-weight-black letter-spacing-small line-height-20">{{filter.label}}</h5>
        <template v-for="value in filter.values">
            <label :key="value.id" class="listing-filter__checkbox checkbox-filters color-complementary d-flex color-grey-2">
                <input type="checkbox" @change="setListingFilter($event, value)">
                <span class="fake-checkbox d-flex f-row j-center a-center">
                    <i class="icon icon-check color-white"></i>
                </span>
					<span v-if="filter.name === 'rating'" class="rating text f-size-15 letter-spacing-0 line-height-20 f-weight-book">
						<template v-for="i in 5">
							<i :key="i" class="icon" :class="[ i <= value.label ? 'icon-rating-on' : 'icon-rating-off' ]"></i>
						</template>
						({{value.quantity || 0}})
					</span>
					<span v-else class="text f-size-15 letter-spacing-0 line-height-20 f-weight-book">
						{{value.label}} ({{value.quantity || 0}})
					</span>
            	</label>
        </template>
    </section>
</template>

<script>
import '../assets/styles/components/listing-filter.scss'


export default {
    name: 'ListingFilter',
    props: {
        filter: {
            type: Object,
            required: true 
        },
    },
    methods: {
        setListingFilter($event, filterValue) {
            // when use filters, if there are active compare products, then reset their checkboxes and flush them from state to avoid bugs
            if (this.$store.getters['listing/getCompareProductIds'].length) {
                this.emitter.emit("flushCompareProducts");
            }
            $event.currentTarget.checked
                ? this.$store.commit('listing/addFilterValue', filterValue)
                : this.$store.commit('listing/removeFilterValue', filterValue.id)
        }
    }
} 
</script>