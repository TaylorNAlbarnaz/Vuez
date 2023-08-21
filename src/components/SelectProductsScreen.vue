<template>
  <v-card
    class="mx-auto"
    max-width="650"
  >
    <v-card-title class="header">
      <span>Lista de Produtos</span>

      <v-btn
        icon="mdi-plus"
        size="x-small"
        variant="text"
        color="green"
        @click="openProductSelection"
      ></v-btn>
    </v-card-title>

    <v-divider></v-divider>

    <v-virtual-scroll
      :items="sales"
      height="320"
      item-height="48"
      class="list"
      elevation="0"
    >
      <template v-slot:default="{ item }">
        <v-list-item
          :title="item.name"
          :subtitle="`R$ ${item.price}`"
        >
          <template v-slot:append>
            <div class="buttons">
              <v-btn
                icon="mdi-minus"
                size="x-small"
                variant="text"
                class="button reduce-button"
                @click="decreaseSaleCount(item)"
              ></v-btn>
              <span>{{ item.quantity }}</span>
              <v-btn
                icon="mdi-plus"
                size="x-small"
                variant="text"
                class="button add-button"
                @click="increaseSaleCount(item)"
              ></v-btn>
              <v-btn
                icon="mdi-delete"
                size="x-small"
                variant="text"
                class="button delete-button"
                @click="removeProduct(item)"
              ></v-btn>
            </div>
          </template>
        </v-list-item>
      </template>
    </v-virtual-scroll>

    <v-dialog
      v-model="dialog"
    >
      <v-card
        class="mx-auto card"
        width="450px"
      >
        <v-card-title primary-title>
          Escolha um produto
        </v-card-title>

        <v-text-field
          :loading="loading"
          density="compact"
          variant="outlined"
          label="pesquisar..."
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          height="10"
          @click:append-inner="onClick"
          @input="searchProduct"
        ></v-text-field>

        <v-list
          :items="items"
          @click:select="selectProduct"
        ></v-list>

        <v-pagination v-if="pageCount > 1" :length="pageCount"></v-pagination>
      </v-card>
    </v-dialog>

    <v-card-title primary-title>
      Valor Total: R$ {{ totalPrice }}
    </v-card-title>
  </v-card>
</template>

<script>
  //Controllers
  import ProductsController from './../controllers/ProductsController'

  export default {
    name: 'SelectProductsScreen',

    data: () => ({
      dialog: false,
      sales: [],
      items: [],
      totalPrice: 0,
      pageCount: 1,
      inputTimeout: null
    }),

    methods: {
      removeProduct(sale) {
        this.sales = this.sales.filter(s => s != sale)
        this.recalculateTotalPrice()
      },

      selectProduct(value) {
        this.dialog = false

        const sale = value.id
        this.sales.push({
          ...sale, quantity: 1, basePrice: sale.price, price: Number(sale.price).toFixed(2)
        })

        this.recalculateTotalPrice()
      },

      decreaseSaleCount(sale) {
        if (sale.quantity > 1)
          sale.quantity--
        this.recalculatePrice(sale)
      },

      increaseSaleCount(sale) {
        sale.quantity++
        this.recalculatePrice(sale)
      },

      recalculatePrice(sale) {
        sale.price = (Number(sale.basePrice) * Number(sale.quantity)).toFixed(2)
        this.recalculateTotalPrice()
      },

      recalculateTotalPrice() {
        this.totalPrice = 0;

        if (this.sales.length > 0) {
          this.sales.forEach((s) => this.totalPrice += Number(s.price))
          this.totalPrice = Number(this.totalPrice).toFixed(2)
        }
      },

      openProductSelection() {
        this.dialog = true
        this.getProductsPaginated(1)
      },

      searchProduct(e) {
        clearTimeout(this.inputTimeout)
        this.inputTimeout = setTimeout(() => {
          const query = e.srcElement.value
          
          if (query.length >= 3) {
            this.getProductBySearch(query)
          } else if (query.length === 0) {
            this.getProductsPaginated(1)
          }
        }, 500)
      },

      async getProductsPaginated(page) {
        const controller = new ProductsController();
        controller.getAllProducts()
          .then((res) => {
            this.pageCount = (Math.ceil(res.length / 8))
            controller.getProductsPaginated(page)
              .then((items) => {
                this.items = this.formatProductList(items)
              })
          })
      },

      async getProductBySearch(query) {
        const controller = new ProductsController();
        controller.searchProduct(query)
          .then((items) => {
            this.items = this.formatProductList(items)
          })
      },

      formatProductList(items) {
        return items.map(s => {return {
          title: `${s.name}`,
          value: {...s}
        }})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .button
    transition: 0.2s

  .reduce-button:hover
    color: blue

  .add-button:hover
    color: lime

  .delete-button:hover
    color: red

  .header
    display: flex
    justify-content: space-between
    margin-top: 20px

  .card
    padding: 10px

  .buttons *
    user-select: none
    font-size: 0.6em

  .list
    border: 1px solid gainsboro
    border-radius: 5px
</style>