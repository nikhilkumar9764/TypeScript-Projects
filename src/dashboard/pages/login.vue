<template>
    <div>
      <h1>Login</h1>
      <form @submit="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          // Send a POST request to the backend to obtain a Bearer token
          const response = await this.$axios.post('/token', {
            username: this.username,
            password: this.password,
          });
  
          // Store the token in local storage or Vuex for future requests
          localStorage.setItem('token', response.data.access_token);
  
          // Redirect the user to the authors page (or another protected page)
          this.$router.push('/authors');
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    },
  };
  </script>
  