<template>
  <v-app>
    <v-layout>
      <Sidebar>
        <v-list-item prepend-icon="mdi-currency-usd" title="Vender" value="sell"></v-list-item>
        <v-list-item prepend-icon="mdi-cart" title="Minhas vendas" value="sales"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Clientes" value="clients"></v-list-item>
        <v-list-item prepend-icon="mdi-package" title="Produtos" value="products"></v-list-item>
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
