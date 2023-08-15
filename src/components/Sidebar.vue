<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    app
  >
    <v-list>
      <v-list-item
        v-if="login"
        :prepend-avatar="picture"
        :title="name"
        :subtitle="email"
      ></v-list-item>

      <v-list-item
        v-else
        prepend-icon="mdi-account"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list class="item-list" density="compact" nav>
      <slot></slot>
    </v-list>

    <template v-slot:append>
      <v-list class="item-list" density="compact" nav>
        <SidebarButton @click="$emit('logoff')" icon="mdi-power" title="Desconectar"/>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import SidebarButton from './SidebarButton.vue';

export default {
  name: 'Sidebar',
  
  components: {
    SidebarButton
  },

  data: () => ({
    picture: '',
    name: '',
    email: ''
  }),

  props: {
    login: Object
  },

  watch: {
    login: function(newLogin) {
      this.picture = newLogin ? newLogin.picture :''
      this.name = newLogin ? newLogin.name :''
      this.email = newLogin ? newLogin.email :''
    }
  }
}
</script>

<style lang="stylus">
  .item-list *
    user-select: none
</style>