import Vuex from 'vuex'
import Vue from 'vue';

const auth = {
    username: process.env.USER,
    password: process.env.AUTH,
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      siteInfo: [],
      projects: [],
      cover: [],
      currentSlide: 0,
      widthClasses: ['small', 'small', 'medium', 'large'],
    },
    actions: {
      async getInfo ({ commit }) {
        const info = await this.$axios.$get('/site', {auth, params: { select: 'content, id, slug'}})
        const about = await this.$axios.$get('/pages/about', {auth, params: { select: 'content, id, files, slug'}})
        commit('setSiteInfo', info)
        await commit('setAbout', about)
      },

      async getProjects ({ commit, dispatch }) {
        const projects = await this.$axios.$get('/pages/projects/children', {auth, params: { select: 'content, id, slug'}})
        commit('setProjects', projects)
      },

      async nuxtServerInit ({ commit, dispatch }) {
        dispatch ('getInfo')
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
