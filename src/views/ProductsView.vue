<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="8"
        class="border"
        d-flex
        justify-center
      >
        <p class="txt">Produtos</p>

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
export default {
  name: 'ProductsView'
}
</script>