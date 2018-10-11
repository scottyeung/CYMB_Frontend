import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      siteInfo: [],
      projects: [],
      currentSlide: 0,
      infoVisible: true,
      widthClasses: ['small', 'medium', 'large'],
      alignClasses: ['flex-start', 'center', 'flex-end']
    },
    actions: {
      // Get Index Files
      async getSiteInfo ({ commit }) {
        const info = await this.$axios.$get('/site')
        commit('setSiteInfo', info)
      },

      async getProjectImages({ commit }, payload) {
        const images = await this.$axios.$get('/pages/' + payload.id + '/files')
        commit('setProjectImages', { images: images, index: payload.index })
      },

      async getProjectDetails({ commit, state, dispatch }) {
        for (let i = 0; i < state.projects.data.length; i++) {
          let id = state.projects.data[i].id
          id = id.replace("/", "+")
          const project = await this.$axios.$get('/pages/' + id)
          commit('setProjectDetails', project)
          dispatch('getProjectImages', { id: id, index: i })
        }
      },

      async getProjects({ commit, dispatch }) {
        const projects = await this.$axios.$get('/pages/projects/children')
        commit('setProjects', projects)
        await dispatch ('getProjectDetails')
      },

      //Nuxt Server Init
      async nuxtServerInit ({ commit, dispatch }) {
        await dispatch ('getSiteInfo')
        await dispatch ('getProjects')
        commit('shuffleClasses')
      }
    },
    mutations: {
      // Set Index files
      setSiteInfo: (state, info) => {
        state.siteInfo = info.data
      },
      // Set Projects
      setProjects: (state, projects) => {
        state.projects = projects
      },
      // Set Projects
      setProjectDetails: (state, project) => {
        state.projects.data[project.data.num - 1] = project.data
      },
      // Set Images
      setProjectImages: (state, payload) => {
        state.projects.data[payload.index]['images'] = payload.images.data
      },
      // Set Slide
      setSlide: (state, index) => {
        state.currentSlide = index
      },
      setInfo: (state, bool) => {
        state.infoVisible = bool
      },
      shuffleClasses: (state) => {
        state.widthClasses = _.shuffle(state.widthClasses)
        state.alignClasses = _.shuffle(state.alignClasses)
      }
    }
  })
}

export default createStore
