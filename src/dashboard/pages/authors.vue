<template>
    <div>
      <h1>Authors</h1>
      <button @click="addAuthor">Add Author</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number of Books</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="author in authors" :key="author.id">
            <td>{{ author.name }}</td>
            <td>{{ author.bookCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        authors: [],
      };
    },
    async asyncData({ store }) {
      // Fetch the list of authors from the backend using Vuex actions
      await store.dispatch('fetchAuthors');
  
      return {
        authors: store.state.authors.authors,
      };
    },
    methods: {
      addAuthor() {
        // Redirect to the page where you can add a new author
        this.$router.push('/add-author');
      },
    },
  };
  </script>
  