import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      siteInfo: [],
      projects: [],
      currentSlide: 0,
      widthClasses: ['small', 'medium', 'large'],
    },
    actions: {
      // Get Index Files
      async getInfo ({ commit }) {
        const info = await this.$axios.$get('/site')
        const about = await this.$axios.$get('/pages/information')
        commit('setSiteInfo', info)
        commit('setInfo', about)
      },

      async getProjectImages({ commit }, payload) {
        const images = await this.$axios.$get('/pages/' + payload.id + '/files')
        commit('setProjectImages', { images: images, index: payload.index })
      },

      async getProjectDetails({ commit, state, dispatch }) {
        for (let i = 0; i < state.projects.data.length; i++) {
          let id = state.projects.data[i].id
          id = id.replace("/", "+")
          const details = await this.$axios.$get('/pages/' + id)
          commit('setProjectDetails', details)
          await dispatch('getProjectImages', { id: id, index: i })
        }
      },

      async getProjects({ commit, dispatch }) {
        const projects = await this.$axios.$get('/pages/projects/children')
        await commit('setProjects', projects)
        await dispatch ('getProjectDetails')
      },

      //Nuxt Server Init
      async nuxtServerInit ({ commit, dispatch }) {
        await dispatch ('getInfo')
        await dispatch ('getProjects')
        commit('shuffleClasses')
      }
    },
    mutations: {
      // Set Site Info
      setSiteInfo: (state, info) => {
        state.siteInfo = info.data
      },
      // Set About Info
      setInfo: (state, info) => {
        state.information = info.data.content
      },
      // Set Projects
      setProjects: (state, payload) => {
        state.projects = payload
      },
      // Set Projects
      setProjectDetails: (state, payload) => {
        state.projects.data[payload.data.num - 1] = payload.data
      },
      // Set Images
      setProjectImages: (state, payload) => {
        state.projects.data[payload.index]['images'] = payload.images.data
      },
      // Set Slide
      setSlide: (state, index) => {
        state.currentSlide = index
      },
      shuffleClasses: (state) => {
        state.widthClasses = _.shuffle(state.widthClasses)
      }
    }
  })
}

export default createStore
