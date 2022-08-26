export default {
    getTotalProducts: (state) => {
        return state.listing.totalProducts
    },
    getTotalProductsIds: (state) => {
        return state.listing.totalProducts.map(product => product.id)
    },
    getActiveProducts: (state) => {
        return state.listing.activeProducts
    },
    getTotalFilters: (state) => {
        return state.listing.totalFilters
    },
    getActiveFilters: (state) => {
        return state.listing.activeFilters
    },
    getCompareProductIds: (state) => {
        return state.listing.compareProductIds
    }
  }
