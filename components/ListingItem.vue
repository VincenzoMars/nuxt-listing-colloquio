<template>
    <section id="product-item" class="d-flex f-column j-flex-start">
        <div v-if="isDiscountActive" class="product-item__discount-label line-height-0">
            <span class="color-white f-size-12 f-weight-black letter-spacing-none line-height-15">
                Risparmi il {{product.discount.percentage}}%
            </span>
        </div>
        <div class="product-item__wishlist-badge line-height-0">
            <i class="icon" :class="[ isOnWishlist ? 'icon-preferiti-pieno' : 'icon-preferiti' ]" @click="wishlistToggle()"></i>
        </div>
        <img class="product-item__image" :src="product.imageUrl" alt="boiler assurdo" :srcset="product.imageUrl">
        <h5 class="product-item__brand f-size-12 f-weight-black letter-spacing-small line-height-15">{{product.brand}}</h5>
        <p class="product-item__description f-size-15 f-weight-book letter-spacing-none line-height-20">
            <span class="description__name">{{product.name}}</span>
            <span class="description__consumption">{{product.consumption}}</span>
            <span v-if="product.isIndoor" class="description__indoor"> - Indoor</span>
        </p>
        <div class="product-item__price">
            <div v-if="isDiscountActive" class="price__discount d-flex f-row">
                <span class="discounted f-size-20 f-weight-black letter-spacing-none line-height-22 color-secondary">{{product.discount.price}}</span>
                <span class="base f-size-12 f-weight-black letter-spacing-none line-height-15 color-grey-2">{{product.basePrice}}</span>
            </div>
            <div v-else class="price__no-discount">
                <span class="base f-size-20 f-weight-black letter-spacing-none line-height-22 color-primary">{{product.basePrice}}</span>
            </div>
        </div>
        <span
            v-if="product.isServiceIncluded" 
            class="product-item__service f-size-12 f-weight-black letter-spacing-none line-height-25"
            :class="[ isDiscountActive ? 'color-secondary': 'color-primary' ]">
                Sopralluogo e installazione inclusi
        </span>
        <div class="product-item__divider-line"></div>
        <div class="d-flex f-row j-space-between">
            <div class="product-item__rating-stars line-height-0">
                <template v-for="i in 5">
                    <i v-if="i <= product.rating" :key="i" class="icon icon-rating-on color-primary"></i>
                    <i v-else :key="i" class="icon icon-rating-off color-primary"></i>
                </template>
            </div>
            <div class="product-item__compare-checkbox">
                <label class="checkbox-primary color-complementary d-flex f-row-reverse color-grey-2">
                    <input v-model="isCompareActive" type="checkbox" @change="compareToggle()">
                    <span class="text f-size-12 letter-spacing-small line-height-15 f-weight-black">Confronta</span>
                    <span class="fake-checkbox d-flex f-row j-center a-center">
                        <i class="icon icon-check color-white"></i>
                    </span>
                </label>
            </div>
        </div>
    </section>
</template>

<script>
import '../assets/styles/components/listing-item.scss'

export default {
    name: 'ListingItem',
    props: {
        product: {
            type: Object,
            required: true 
        }
    },
    data() {
        return {
            isOnWishlist: false,
            isCompareActive: false
        }
    },
    computed: {
        isDiscountActive() {
            return this.product.discount.isActive 
        },
        isCompareProductActive() {
             // eslint-disable-next-line unicorn/prefer-includes
             return this.$store.getters['listing/getCompareProductIds'].some(compareProductId => compareProductId === this.product.id)
        }
    },
    mounted() {
        this.setIsOnWishlist()
        this.$nuxt.$on("flushCompareProducts", this.flushCompareProduct);
    },
    destroyed() {
        this.$nuxt.$off("flushCompareProducts", this.flushCompareProduct);
    },
    methods: {
        wishlistToggle() {
            let wishlistItems = this.wishlistItems()
            if (this.isOnWishlist) {
                wishlistItems = wishlistItems.filter(item => item !== this.product.id)
                this.isOnWishlist = false
            } else {
                wishlistItems.push(this.product.id)
                this.isOnWishlist = true
            }
            localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
        },
        wishlistItems() {
            return JSON.parse(localStorage.getItem('wishlistItems')) || []
        },
        setIsOnWishlist() {
            this.isOnWishlist = this.wishlistItems().find(item => item === this.product.id)
        },
        compareToggle() {
            console.log('compareToggle')
            return !this.isCompareProductActive
                ? this.$store.commit('listing/addCompareProductId', this.product.id)
                : this.$store.commit('listing/removeCompareProductId', this.product.id)
        },
        flushCompareProduct() {
            this.isCompareActive = false
            this.$store.commit('listing/removeCompareProductId', this.product.id)
        }
    }
} 
</script>