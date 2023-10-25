<template>
    <div>
      <h1>Books</h1>
      <button @click="addBook">Add Book</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author Name</th>
            <th>Number of Pages</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.name }}</td>
            <td>{{ book.authorName }}</td>
            <td>{{ book.pageCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        books: [],
      };
    },
    async asyncData({ store }) {
      // Fetch the list of books from the backend using Vuex actions
      await store.dispatch('fetchBooks');
  
      return {
        books: store.state.books,
      };
    },
    methods: {
      addBook() {
        // Redirect to the page where you can add a new book
        this.$router.push('/add-book');
      },
    },
  };
  </script>
  