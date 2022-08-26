import listing from './modules/listing/index.js'

export default {
  modules: {
    listing
  },
  actions: {
    async nuxtServerInit({ commit, dispatch }) {
      const products = await fetch(`https://6308878b722029d9ddd1543b.mockapi.io/api/products`).then(res => res.json())
      commit('listing/setTotalProducts', products)
      commit('listing/setActiveProducts', products)
      const filters = await fetch(`https://6308878b722029d9ddd1543b.mockapi.io/api/filters`).then(res => res.json())
      commit('listing/setTotalFilters', filters)
      dispatch('listing/createFilters')
  },
  }
}