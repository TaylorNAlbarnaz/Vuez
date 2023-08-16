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

        <v-table>
          <thead>
            <tr>
              <th class="text-left">Produto</th>
              <th class="text-left">Quantidade</th>
              <th class="text-left">Comprador</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="sale in sales"
              :key="sale.id"
              :value="sale"
              >
              <td>{{ sale.productName }}</td>
              <td>{{ sale.quantity }}</td>
              <td>{{ sale.clientName }}</td>
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
  import SalesController from './../controllers/SalesController'
  import ProductsController from './../controllers/ProductsController'
  import OrdersController from './../controllers/OrdersController'
  import ClientsController from './../controllers/ClientsController'

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
        const ordersController = new OrdersController();
        const clientsController = new ClientsController();

        const login = JSON.parse(localStorage.getItem('login'));
        if (login) {
          let orders = await ordersController.getOrdersFromSeller(login.id);

          data.sales = await Promise.all(
            orders.map(async o => {
              let orderData = {};

              await Promise.all(o.saleIds.map(async s => {
                const sale = await salesController.getSaleById(s);
                const client = await clientsController.getClientById(o.clientId);
                const product = await productsController.getProductById(sale.productId);
                
                orderData.id = o.id;
                orderData.productName = product.name;
                orderData.clientName = client.name;
                orderData.quantity = sale.quantity;
              }))

              return orderData;
            })
          )
        }
      })
    }
  };
</script>

<style lang="stylus" scoped>
  .txt
    text-align: center
</style>