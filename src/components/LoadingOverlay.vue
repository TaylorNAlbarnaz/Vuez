<template>
  <v-overlay
    :model-value="loading"
    class="align-center justify-center"
  >
    <v-progress-circular
      activator="parent"
      color="blue-lighten-3"
      indeterminate
      persistent
      lazy
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'LoadingOverlay',

  props: {
    loading: Boolean
  }
}
</script>