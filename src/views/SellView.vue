<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="8"
        class="border"
        d-flex
        justify-center
      >
        <div class="view-title">
          <p class="txt">Vender</p>
        </div>

        <SelectClientScreen/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  //Components
  import SelectClientScreen from '@/components/SelectClientScreen.vue';

  export default {
    name: 'SellView',

    components: {
      SelectClientScreen
    },
  };
</script>

<style lang="stylus">
  .text-left
    text-align: left
    justify-content: left

  .text-left .v-btn__append
    width: 100%
    text-align: right
</style>