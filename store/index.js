import listing from './listing/index.js'

export default {
  modules: {
    listing
  },
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('listing/loadResources')
    },
  }
}