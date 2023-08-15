<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    app
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Sandra Adams"
        subtitle="sandra_a88@gmailcom"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list class="item-list" density="compact" nav>
      <slot></slot>
    </v-list>

    <template v-slot:append>
      <v-list class="item-list" density="compact" nav>
        <v-list-item 
          prepend-icon="mdi-power" 
          title="Desconectar" 
          value="signoff"
        ></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style lang="stylus">
  .item-list *
    user-select: none
</style>