import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      siteInfo: [],
      projects: [],
      currentSlide: 0,
      widthClasses: ['small', 'small', 'medium', 'large'],
    },
    actions: {
      async getInfo ({ commit }) {
        const info = await this.$axios.$get('/site')
        const about = await this.$axios.$get('/pages/about')
        const images = await this.$axios.get('/pages/about/files')
        commit('setSiteInfo', info)
        await commit('setAbout', about)
        commit('SetAboutImage', images)
      },

      async getProjectImages({ commit }, payload) {
        const images = await this.$axios.$get('/pages/' + payload.id + '/files')
        commit('setProjectImages', { images: images, index: payload.index })
      },

      async getProjectDetails({ commit, state, dispatch }) {
        for (let i = 0; i < state.projects.length; i++) {
          let id = state.projects[i].id
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

      async nuxtServerInit ({ commit, dispatch }) {
        await dispatch ('getInfo')
        await dispatch ('getProjects')
        commit('shuffleClasses')
      }
    },
    mutations: {
      // Site info
      setSiteInfo: (state, info) => {
        state.siteInfo = info.data
      },
      // About
      setAbout: (state, info) => {
        state.about = info.data.content
      },
      // About image
      SetAboutImage: (state, images) => {
        state.about.images = images.data.data
      },
      // Projects
      setProjects: (state, payload) => {
        state.projects = payload.data
      },
      // Project Details
      setProjectDetails: (state, payload) => {
        state.projects[payload.data.num - 1] = payload.data
      },
      // Project images
      setProjectImages: (state, payload) => {
        state.projects[payload.index]['images'] = payload.images.data
      },
      // Slide
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
