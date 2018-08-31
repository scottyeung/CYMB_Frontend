import Vuex from 'vuex'
  
const createStore = () => {
  return new Vuex.Store({
    state: {
      indexImages: []
    },
    getters: {
      // GET_FILTERACTIVE: (state) => (filtervalue) => {
      //   const trueorfalse = _.includes(state.filtervalue, filtervalue)
      //   return trueorfalse
      // },
    },
    actions: {

      // Get Index Files
      async getIndexFiles ({ commit }) {
        const files = await this.$axios.$get('http://localhost:8888/rest/pages/home/files')
        commit('setIndexFiles', files)
      },
      
      //Nuxt Server Init
      async nuxtServerInit ({ commit, dispatch }) {
        await dispatch('getIndexFiles')
      }
    },
    mutations: {
      // Set Index files
      setIndexFiles: (state, list) => {
        state.indexImages = list
      }
    }
  })
}

export default createStore
