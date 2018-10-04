import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      siteInfo: [],
      projects: [],
      currentSlide: 0,
      infoVisible: true
    },
    actions: {

      // Get Index Files
      async getSiteInfo ({ commit }) {
        const info = await this.$axios.$get('/site')
        commit('setSiteInfo', info)
      },

      async getProjectDetails({ commit, state }) {

        for (let i = 0; i < state.projects.data.length; i++) {
          let id = state.projects.data[i].id
          id = id.replace("/", "+")
          const project = await this.$axios.$get('/pages/' + id)
          commit('setProjectDetails', project)
        }
      },

      async getProjects({ commit, dispatch }) {
        const projects = await this.$axios.$get('/pages/projects/children')
        commit('setProjects', projects)
        await dispatch ('getProjectDetails')
      },

      //Nuxt Server Init
      async nuxtServerInit ({ dispatch }) {
        await dispatch ('getSiteInfo')
        await dispatch ('getProjects')
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
      // Set Slide
      setSlide: (state, index) => {
        state.currentSlide = index
      },
      setInfo: (state, bool) => {
        state.infoVisible = bool
      }
    }
  })
}

export default createStore
