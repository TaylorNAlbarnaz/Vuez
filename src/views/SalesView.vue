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

        <v-expansion-panels variant="accordion">
          <v-expansion-panel
            v-for="order in orders"
            :key="order.id"
          >
            <v-expansion-panel-title>
              <b>{{ `${order.clientName}` }}</b>
              <i>{{ ` - ${order.date}` }}</i>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <v-table>
                <tbody>
                  <tr
                    v-for="sale in order.sales"
                    :key="sale.id"
                  >
                    <td>{{ `${sale.quantity}x ${sale.productName}` }}</td>
                    <td>R$ {{ sale.price }}</td>
                  </tr>

                  <tr>
                    <td><b>Valor Total: </b></td>
                    <td>R$ {{ order.totalValue }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  //Controllers
  import SalesController from './../controllers/SalesController'
  import ProductsController from './../controllers/ProductsController'
  import OrdersController from './../controllers/OrdersController'
  import ClientsController from './../controllers/ClientsController'

  export default {
    name: 'SalesView',
    
    data: () => ({
      totalSales: 0,
      orders: []
    }),

    mounted() {
      this.$emit('loading', false)

      const salesController = new SalesController();
      const productsController = new ProductsController();
      const ordersController = new OrdersController();
      const clientsController = new ClientsController();

      const login = JSON.parse(localStorage.getItem('login'));
      if (login) {
        ordersController.getOrdersFromSeller(login.id)
          .then((orders) => {
            for (const order of orders) {
              const date = new Date(order.date).toLocaleDateString('en-US')
              let orderData = {...order, date: date}

              clientsController.getClientById(order.clientId)
                .then((client) => {
                  orderData = {...orderData, clientName: client.name, sales: [], totalValue: 0}
                  const sales = []

                  for (const saleId of orderData.saleIds) {
                    salesController.getSaleById(saleId)
                      .then((sale) => {
                        productsController.getProductById(sale.productId)
                          .then((product) => {
                            const price = (Number(product.price) * Number(sale.quantity)).toFixed(2) 

                            sales.push({
                              id: sale.id,
                              productName: product.name,
                              quantity: sale.quantity,
                              price: price
                            })

                            orderData = {
                              ...orderData,
                              sales: sales,
                              totalValue: (Number(orderData.totalValue) + Number(price)).toFixed(2)
                            }
                            this.orders.push(orderData)
                            console.log(orderData)
                          })
                      })
                  }
                })
            }
          })
        }
    },

    watch: {
      sales: function() {
        this.$emit('loading', false)
      }
    }
  };
</script>

<style lang="stylus">
  .txt
    text-align: center
</style>