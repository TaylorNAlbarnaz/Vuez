<template>
  <div class="client-input" v-ripple>
    <v-input
      prepend-icon="mdi-account"
      :append-icon="client ? 'mdi-delete' : ''"
      hide-details
      @click:append="resetClient"
    >
      <p @click="openClientSelection">
        {{ client ? client.name : 'Selecione um cliente' }}
        <span> {{ client ? `(${client.cpf})` : '' }}</span>
      </p>
    </v-input>
  </div>

  <v-dialog
    v-model="dialog"
  >
    <v-card
      class="mx-auto card"
      width="450px"
    >
      <v-card-title primary-title>
        Escolha um cliente
      </v-card-title>

      <v-text-field
        density="compact"
        variant="outlined"
        label="pesquisar..."
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        height="10"
        @input="searchClient"
      ></v-text-field>

      <v-list
        :items="items"
        @click:select="selectClient"
      ></v-list>

      <v-pagination
        v-if="pageCount > 1"
        v-model="page"
        :length="pageCount"
        @update:model-value="() => getClientsPaginated(page)"
      ></v-pagination>
    </v-card>
  </v-dialog>
</template>

<script>
  //Controllers
  import ClientsController from './../controllers/ClientsController'

  export default {
    name: 'SelectClientScreen',

    data: () => ({
      dialog: false,
      client: null,
      items: [],
      pageCount: 1,
      page: 1,
      inputTimeout: null
    }),

    methods: {
      resetClient() {
        this.clientName = null
      },

      selectClient(value) {
        this.dialog = false
        this.client = value.id
      },

      searchClient(e) {
        clearTimeout(this.inputTimeout)
        this.inputTimeout = setTimeout(() => {
          const query = e.srcElement.value
          
          if (query.length >= 3) {
            this.getClientBySearch(query)
          } else if (query.length === 0) {
            this.getClientsPaginated(1)
          }
        }, 500)
      },

      openClientSelection() {
        this.dialog = true
        this.getClientsPaginated(1)
      },

      async getClientsPaginated(page) {
        const controller = new ClientsController();
        controller.getAllClients()
          .then((res) => {
            this.pageCount = (Math.ceil(res.length / 8))
            controller.getClientsPaginated(page)
              .then((items) => {
                this.items = this.formatClientList(items)
              })
          })
      },

      async getClientBySearch(query) {
        const controller = new ClientsController();
        controller.searchClient(query)
          .then((items) => {
            this.items = this.formatClientList(items)
          })
      },

      formatClientList(items) {
        return items.map(s => {return {
          title: `${s.name} - CPF: ${s.cpf}`,
          value: {...s}
        }})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .client-input
    border: 1px solid gainsboro
    user-select: none
    cursor: pointer
    padding: 5px 10px
    border-radius: 5px
    transition: .2s

  .client-input > *
    color: black
    font-size: 0.875rem
    font-weight: 500
    text-rendering: optimizelegibility
    text-transform: uppercase
    letter-spacing: 0.0892857143em

  .client-input p
    width: 100%
    height: 100%

  .client-input span
    font-weight: 300!important
    font-style: oblique

  .card
    padding: 10px
</style>