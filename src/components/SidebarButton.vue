<template>
  <router-link v-if="value" :to="value" class="button">
    <v-list-item :prepend-icon="icon" :title="title" :value="value" :color="color"></v-list-item>
  </router-link>
  <v-list-item v-else :prepend-icon="icon" :title="title" value="none" :color="color"></v-list-item>
</template>

<script>
export default {
  name: 'SidebarButton',
  props: {
    'icon': String,
    'title': String,
    'value': String,
    'color': String
  }
}
</script>

<style lang="stylus" scoped>
  .button
    color: rgba(0, 0, 0, 0.87)
</style>