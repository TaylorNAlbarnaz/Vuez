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
          <p class="txt">Clientes</p>

          <AddClientScreen/>
        </div>

        <v-table>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left">Telefone</th>
              <th class="text-left">CPF</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="client in clients"
              :key="client.id"
              :value="client"
              >
              <td>{{ client.name }}</td>
              <td>{{ client.phone }}</td>
              <td>{{ client.cpf }}</td>
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
  import ClientsController from './../controllers/ClientsController'

  //Components
  import AddClientScreen from "@/components/AddClientScreen.vue";

  export default {
    name: 'ClientsView',

    data: () => ({
      clients: []
    }),

    components: {
      AddClientScreen
    },

    mounted() {
      this.$emit('loading', true)
    },

    setup() {
      onMounted(async function() {
        const data = getCurrentInstance().data;
        const clientsController = new ClientsController();

        data.clients = await clientsController.getAllClients();
      })
    },
    
    watch: {
      clients: function() {
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