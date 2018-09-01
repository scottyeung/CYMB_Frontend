import Vuex from 'vuex'
  
const createStore = () => {
  return new Vuex.Store({
    state: {
      indexImages: [],
      projects: []
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

      async getProjects({ commit }) {
        const files = await this.$axios.$get('http://localhost:8888/rest/pages/projects/children')
        commit('setProjects', files)
      },
      
      //Nuxt Server Init
      async nuxtServerInit ({ commit, dispatch }) {
        await dispatch('getIndexFiles')
        await dispatch('getProjects')
      }
    },
    mutations: {
      // Set Index files
      setIndexFiles: (state, list) => {
        state.indexImages = list
      },
       // Set Projects
      setProjects: (state, list) => {
        state.projects = list
      }
    }
  })
}

export default createStore
