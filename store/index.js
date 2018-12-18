import Vuex from 'vuex'
import Vue from 'vue';

const axiosConfig = {
  params: {
    auth: {
      username: process.env.USER,
      password: process.env.AUTH
    },
    select: ['content', 'children', 'files', 'id', 'slug'],
  }
}

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
        const about = await this.$axios.$get('/pages/about', axiosConfig)
        commit('setSiteInfo', info)
        await commit('setAbout', about)
      },

      async getProjects({ commit, dispatch }) {
        const projects = await this.$axios.$get('/pages/projects/children', axiosConfig)
        await commit('setProjects', projects)
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
        Vue.set(state.about, 'files', info.data.files)
      },
      // Projects
      setProjects: (state, payload) => {
        console.log(payload)
        state.projects = payload.data
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
