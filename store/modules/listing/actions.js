export default {
  async loadResources({ commit, dispatch }) {
      const products = await fetch(`https://6308878b722029d9ddd1543b.mockapi.io/api/products`).then(res => res.json())
      commit('setTotalProducts', products)
      commit('setActiveProducts', products)
      const filters = await fetch(`https://6308878b722029d9ddd1543b.mockapi.io/api/filters`).then(res => res.json())
      commit('setTotalFilters', filters)
      dispatch('createFilters')
    },
    createFilters({ commit, dispatch, getters }) {
        getters.getTotalProducts.forEach(product => {
            Object.entries(product.filters).forEach(productFilter => {
              const filter = getters.getFilterByName(productFilter[0])
              if (Array.isArray(productFilter[1])) {
                // if a product value is an array and has more selections, then iterate each value selected and create values for filters
                productFilter[1].forEach(productValue => {
                    dispatch('createValue', { product, filter, productValue })
                })
              } else {
                  const productValue = productFilter[1]
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