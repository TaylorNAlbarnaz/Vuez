<template>
  <v-app>
    <v-layout>
      <LoginDialog
        @login="loginWithEmail"
        :open="loginDialog"
        v-if="!loginId"
      />

      <Sidebar
        @logoff="logoff"
        :login="login"
      >
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
// Controllers
import SellerController from './controllers/SellerController'

// Components
import LoginDialog from './components/LoginDialog.vue';
import Sidebar from './components/Sidebar.vue'
import SidebarButton from './components/SidebarButton.vue';

export default {
  name: 'App',

  components: {
    LoginDialog,
    Sidebar,
    SidebarButton
  },

  data: () => ({
    login: null,
    loginDialog: true
  }),

  methods: {
    loginWithEmail: async function(email, password) {
      const controller = new SellerController();
      const sellers = await controller.getAllSellers();

      const login = sellers.find(s => s.email == email && s.password == password);
      if (login) {
        this.login = login;
        this.loginDialog = false;
      }
    },

    logoff: function() {
      this.login = null;
      this.loginDialog = true;
    }
  }
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