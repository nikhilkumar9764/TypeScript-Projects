import axios from 'axios';

export const state = {
  books: [],
};

export const mutations = {
  setBooks(state, books) {
    state.books = books;
  },
};

const actions = {
  async fetchBooks({ commit }) {
    try {
      // Make an API request to your backend to fetch authors
      const response = await axios.get('http://localhost:5000/books');
      console.log(response);

      // Commit a mutation to set the retrieved authors in the store
      commit('setBooks', response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  },
};

const getters = {
  getBooks: (state) => state.books,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
