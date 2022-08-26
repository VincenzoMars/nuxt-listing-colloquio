export default {
  async loadResources({ commit, dispatch }) {
    const products = await fetch(`https://nuxt-listing-default-rtdb.firebaseio.com/products.json`).then(res => res.json())
    commit('setTotalProducts', products)
    commit('setActiveProducts', products)
    const filters = await fetch(`https://nuxt-listing-default-rtdb.firebaseio.com/filters.json`).then(res => res.json())
    commit('setTotalFilters', filters)
    dispatch('createFilters')
  },
  createFilters({ commit, dispatch, getters }) {
    getters.getTotalProducts.forEach(product => {
      Object.entries(product.filters).forEach(([filterName, filterValue]) => {
        const filter = getters.getFilterByName(filterName)
        if (Array.isArray(filterValue)) {
          // if a product value is an array and has more selections, then iterate each value selected and create values for filters
          filterValue.forEach(productValue => {
              dispatch('createValue', { product, filter, productValue })
          })
        } else {
            const productValue = filterValue
            dispatch('createValue', { product, filter, productValue })
        }
      })
    })
  },
  createValue(_, { product, filter, productValue }) {
    const value = filter.values.find(value => value.id === productValue)
    if (isNaN(value.quantity)) {
      value.quantity = 0
    }
    value.quantity++
    if (!value.productIds) {
      value.productIds = []
    }
    value.productIds.push(product.id)
  },
}