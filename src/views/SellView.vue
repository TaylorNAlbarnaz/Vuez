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
  //Controllers
  import ProductsController from '../controllers/ProductsController'
  import OrdersController from '../controllers/OrdersController'
  import SalesController from '../controllers/SalesController'

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
      async finishSale() {
        const ordersController = new OrdersController()
        const productsController = new ProductsController()
        const salesController = new SalesController()

        const sellerId = JSON.parse(localStorage.getItem('login')).id | null;
        const clientId = this.$refs.client.client?.id | null
        const date = new Date()
        
        const saleIds = []
        const products = this.$refs.products.sales

        if (products.length == 0 | !sellerId | !clientId)
          return;

        // Cria as vendas
        for (const product of products) {
          salesController.addSale({
            productId: product.id,
            quantity: product.quantity
          })
            .then((res) => {
              saleIds.push(res.data.id)
              productsController.getProductById(product.id)
                .then((res) => {
                  productsController.updateProduct({...res, currentStock: res.currentStock - product.quantity})
                    .then(() => this.$router.push('sales'))
                })
            })
        }

        //Cria o pedido
        ordersController.addOrder({
          sellerId: sellerId,
          clientId: clientId,
          saleIds: saleIds,
          date: date.toString()
        })
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