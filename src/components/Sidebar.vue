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

    <v-list
      class="item-list"
      density="compact"
      mandatory
      nav
      v-model:selected="selectedButton"
    >
      <slot></slot>
    </v-list>

    <template v-slot:append>
      <v-list class="item-list" density="compact" nav>
        <SidebarButton @click="$emit('logoff')" icon="mdi-power" title="Desconectar" color="red"/>
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
    email: '',
    selectedButton: ['sales']
  }),

  methods: {
    updateActiveButton() {
      setTimeout(() => {
        const path = this.$router.currentRoute.value.fullPath.substring(1)
        this.selectedButton = [path]
      }, 100)
    }
  },

  props: {
    login: Object
  },

  watch: {
    login: function(newLogin) {
      this.picture = newLogin ? newLogin.picture :''
      this.name = newLogin ? newLogin.name :''
      this.email = newLogin ? newLogin.email :''
    },
    '$route': function() {
      this.updateActiveButton()
    }
  },

  mounted() {
    this.updateActiveButton()
  }
}
</script>

<style lang="stylus">
  .item-list *
    user-select: none
</style>