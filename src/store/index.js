// entry point to our vuex
// 1. Imports
import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos'


//2. load vuex
Vue.use(Vuex)


//3. create store
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    todos
  }
})

// 4. import this file to main.js