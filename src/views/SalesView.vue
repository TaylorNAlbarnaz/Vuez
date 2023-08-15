<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="8"
        class="border"
        d-flex
        justify-center
      >
        <p class="txt">Vendas Realizadas: {{ totalSales }}</p>

        <v-card>
          <v-list
            v-for="sale in sales"
            :key="sale.id"
            :value="sale"
          >
            <v-list-item-title>{{ sale.name }}</v-list-item-title>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { onMounted, getCurrentInstance } from "vue";
  
  //Controllers
  import SalesController from './../controllers/SalesController'
  import ProductsController from './../controllers/ProductsController'

  export default {
    name: 'SalesView',
    
    data: () => ({
      totalSales: 0,
      sales: []
    }),

    setup() {
      onMounted(async () => {
        const data = getCurrentInstance().data;
        const salesController = new SalesController();
        const productsController = new ProductsController();

        const login = localStorage.getItem('login');
        if (login) {
          let sales = await salesController.getSalesFromSeller(login.id);
          let newSales = []

          sales.forEach(async s => {
            const product = await productsController.getProductById(s.productId);
            //s.name = product.name
            const newS = {...s, name: product.name}
            newSales.push(newS)
            
            data.sales = newSales;
            data.totalSales = newSales.length;
          });
        }
      })
    }
  };
</script>

<style lang="stylus" scoped>
  .txt
    text-align: center
</style>