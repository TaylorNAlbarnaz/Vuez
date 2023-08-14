<template>
  <nav>
    <router-link to="/">
      <v-icon icon="mdi-home" />
      Home
    </router-link> |
    
    <router-link to="/about">
      <v-icon icon="mdi-help-circle" />
      About
    </router-link>
  </nav>
  <router-view/>
</template>

<style lang="stylus">
*
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;

#app
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

nav
  padding: 30px;

nav a
  font-weight: bold;
  color: #2c3e50;

nav a.router-link-exact-active
  color: #42b983;
</style>
