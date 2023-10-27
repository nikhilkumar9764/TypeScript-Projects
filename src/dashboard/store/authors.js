import axios from 'axios';

export const state = {
  authors: []
};

export const mutations = {
  setAuthors(state, authors) {
    state.authors = authors;
  }
};

const actions = {
  async fetchAuthors({ commit }) {
    try {
      // Make an API request to your backend to fetch authors
      const response = await axios.get('http://localhost:5000/authors');
      
      console.log(response.data);
      // Commit a mutation to set the retrieved authors in the store
      commit('setAuthors', response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  },
};

const getters = {
  getAuthors: (state) => state.authors,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
