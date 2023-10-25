import axios from 'axios';

const state = {
  authors: [],
};

const mutations = {
  setAuthors(state, authors) {
    state.authors = authors;
  },
};

const actions = {
  async fetchAuthors({ commit }) {
    try {
      // Make an API request to your backend to fetch authors
      const response = await axios.get('/authors');

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
