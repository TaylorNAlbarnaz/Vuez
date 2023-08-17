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
          <p class="txt">Produtos</p>

          <AddProductScreen />
        </div>

        <v-table>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left">Preço</th>
              <th class="text-left">Estoque Atual</th>
              <th class="text-left">Estoque Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in products"
              :key="product.id"
              :value="product"
              >
              <td>{{ product.name }}</td>
              <td>R$ {{ Number(product.price).toFixed(2) }}</td>
              <td>{{ product.currentStock }}</td>
              <td>{{ product.totalStock }}</td>
            </tr>
          </tbody>
        </v-table>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { onMounted, getCurrentInstance } from "vue";

  //Controllers
  import ProductsController from './../controllers/ProductsController'

  //Components
  import AddProductScreen from "@/components/AddProductScreen.vue";

  export default {
    name: 'ProductsView',

    data: () => ({
      products: []
    }),

    components: {
      AddProductScreen
    },

    mounted() {
      this.$emit('loading', true)
    },

    setup() {
      onMounted(async function() {
        const data = getCurrentInstance().data;
        const productsController = new ProductsController();

        data.products = await productsController.getAllProducts();
      })
    },
    
    watch: {
      products: function() {
        this.$emit('loading', false);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .view-title
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0 10px

    > p
      width: 100%
</style>