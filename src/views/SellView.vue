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

        <SelectClientScreen ref="client"/>
        <SelectProductsScreen ref="products"/>

        <div class="buttons">
          <v-btn @click="finishSale" color="success">Concluir Venda</v-btn>

          <router-link :to="'/'" class="button">
            <v-btn color="grey">Cancelar</v-btn>
          </router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  //Components
  import SelectClientScreen from '@/components/SelectClientScreen.vue';
  import SelectProductsScreen from '@/components/SelectProductsScreen.vue';

  export default {
    name: 'SellView',

    components: {
      SelectClientScreen,
      SelectProductsScreen
    },

    methods: {
      finishSale() {
        console.log(this.$refs)
      },
    }
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

<style lang="stylus" scoped>
  .buttons
    display: flex
    justify-content: center
    gap: 40px
    margin-top: 40px
</style>