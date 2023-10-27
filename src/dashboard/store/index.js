import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const createStore = () => {
    const store = new Vuex.Store({
      modules: {
        // Import your Vuex modules for books and authors
        books: require('./books').default,
        authors: require('./authors').default,
      },
    })
  
    return store
  }
  
  export default createStore
  