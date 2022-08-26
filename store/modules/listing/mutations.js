export default {
    setTotalProducts(state, products) {
        state.listing.totalProducts = products
    },
    setActiveProducts(state, products) {
        state.listing.activeProducts = products
    },
    setTotalFilters(state, filters) {
        state.listing.totalFilters = filters
    },
    setActiveFilters(state, filters) {
        state.listing.activeFilters = filters
    },
    addFilterValue(state, filterValue) {
        state.listing.activeFilters.push(filterValue)
        state.listing.activeProducts = state.listing.totalProducts.filter(product => {
            return state.listing.activeFilters.some(activeFilter => activeFilter.productIds && activeFilter.productIds.includes(product.id))
        })
    },
    removeFilterValue(state, filterValueID) {
        state.listing.activeFilters = state.listing.activeFilters.filter(filterValue => filterValue.id !== filterValueID)
        state.listing.activeProducts = state.listing.totalProducts.filter(product => {
            return state.listing.activeFilters.some(activeFilter => activeFilter.productIds && activeFilter.productIds.includes(product.id))
        })
        if (!state.listing.activeProducts.length) {
            state.listing.activeProducts = state.listing.totalProducts
        }
    },
    addCompareProductId(state, productId) {
        state.listing.compareProductIds.push(productId)
    },
    removeCompareProductId(state, productId) {
        console.log('remove', productId)
        state.listing.compareProductIds= state.listing.compareProductIds.filter(compareProductId => compareProductId !== productId)
    },
    flushCompareProductIds(state) {
        state.listing.compareProductIds = []
    }
}