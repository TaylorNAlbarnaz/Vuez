<template>
  <v-app>
    <v-layout>
      <Sidebar>
        <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
      </Sidebar>

      <v-main>
        <router-view/>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',

  components: {
    Sidebar
  },

  data: () => ({
    //
  }),
}
</script>
