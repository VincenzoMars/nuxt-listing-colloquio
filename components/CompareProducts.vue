<template>
    <Transition name="compare-swipe-up">
        <section v-if="getCompareProductIds.length" id="compare-products" class="d-flex f-row j-space-between">
            <p class="compare-products__label f-size-20 f-weight-book color-white line-height-26 letter-spacing-0 d-flex a-center">
                <span>{{compareLabel}}</span>
            </p>
            <button :class="[ isReadyToCompare ? '' : 'button-disabled' ]" class="compare-products__button button-primary line-height-0 d-flex a-center" @click="openCompareModal()">
                <span class="f-size-12 f-weight-black color-white letter-spacing-small">Confronta</span>
            </button>
        </section>
    </Transition>
</template>

<script>
import '../assets/styles/components/compare-products.scss'

export default {
    name: 'CompareProducts',
    computed: {
        getCompareProductIds() {
            return this.$store.getters['listing/getCompareProductIds']
        },
        isReadyToCompare() {
            return this.getCompareProductIds.length >= 3
        },
        compareLabel() {
            if (this.getCompareProductIds.length >= 3) {
                return "Confronta i modelli selezionati"
            }
            if (this.getCompareProductIds.length === 2) {
                return "Seleziona ancora un prodotto per un confronto più dettagliato"
            }
            return "Seleziona altri 2 prodotti per confrontarli"
        }
    },
    methods: {
        openCompareModal() {
            if (this.isReadyToCompare) {
                alert('modale pazzesca')
            }
        }
    }
} 
</script>