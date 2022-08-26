export default {
    createFilters({ commit, dispatch, getters }) {
        getters.getTotalProducts.forEach(product => {
            Object.entries(product.filters).forEach(productFilter => {
              // const filter =  getters['listing/getFilterByName'](productFilter[0])
              const filter = getters.getFilterByName(productFilter[0])
              // if a product value has more selections, then iterate each value selected and create values for filters
              if (Array.isArray(productFilter[1])) {
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