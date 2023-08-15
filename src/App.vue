<template>
  <v-app>
    <v-layout>
      <Sidebar>
        <SidebarButton icon="mdi-cart" title="Minhas Vendas" value=""/>
        <SidebarButton icon="mdi-currency-usd" title="Vender" value="sell"/>
        <SidebarButton icon="mdi-account" title="Clientes" value="clients"/>
        <SidebarButton icon="mdi-package" title="Produtos" value="products"/>
      </Sidebar>

      <v-main>
        <router-view/>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import SidebarButton from './components/SidebarButton.vue';

export default {
  name: 'App',

  components: {
    Sidebar,
    SidebarButton
  },

  data: () => ({
    //
  }),
}
</script>

<style lang="stylus">
  *
    border: 0
    padding: 0
    margin: 0
    box-sizing: border-box
    text-decoration: none
</style>