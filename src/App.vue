<template>
  <v-app>
    <v-layout>
      <LoadingOverlay
        :loading="loading"
      />

      <LoginDialog
        @login="loginWithEmail"
        :open="loginDialog"
        v-if="login == null"
      />

      <Sidebar
        @logoff="logoff"
        :login="login"
      >
        <SidebarButton title="Minhas Vendas" value="sales" color="lime" icon="mdi-cart" />
        <SidebarButton title="Vender" value="sell" color="green" icon="mdi-currency-usd"/>
        <SidebarButton title="Clientes" value="clients" color="blue" icon="mdi-account"/>
        <SidebarButton title="Produtos" value="products" color="orange" icon="mdi-package"/>
      </Sidebar>

      <v-main>
        <router-view @loading="setLoading"/>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import { onMounted, getCurrentInstance } from "vue";

// Controllers
import SellerController from './controllers/SellerController'

// Components
import LoginDialog from './components/LoginDialog.vue';
import Sidebar from './components/Sidebar.vue'
import SidebarButton from './components/SidebarButton.vue';
import LoadingOverlay from "./components/LoadingOverlay.vue";

export default {
  name: 'App',

  components: {
    LoginDialog,
    Sidebar,
    SidebarButton,
    LoadingOverlay
  },

  data: () => ({
    login: null,
    loginDialog: true,
    loading: false
  }),

  methods: {
    loginWithEmail: async function(email, password) {
      const controller = new SellerController();
      const sellers = await controller.getAllSellers();

      const login = sellers.find(s => s.email == email && s.password == password);
      if (login) {
        this.login = login;
        this.loginDialog = false;
        this.$router.go();
        localStorage.setItem('login', JSON.stringify(login));
      }
    },

    logoff: function() {
      this.login = null;
      this.loginDialog = true;
      localStorage.removeItem('login');
    },

    setLoading: function(isLoading) {
      this.loading = isLoading;
    }
  },

  setup() {
    onMounted(() => {
      const data = getCurrentInstance().data;
      
      const login = localStorage.getItem('login');
      if (login) {
        data.login = JSON.parse(login)
        data.loginDialog = false;
      } else {
        data.login = null;
        data.loginDialog = true;
      }
    })
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

  html
    overflow: hidden
</style>