<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="blue" v-bind="props">+</v-btn>
      </template>

      <v-card class="add-screen">
        <v-card-title>
          <span class="text-h5">Novo Usuário</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-text-field
                  label="Nome"
                  v-model="name"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-row>

              <v-row>
                <v-text-field
                  label="Telefone"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                  v-model="phone"
                  :rules="[rules.required, rules.phone]"
                ></v-text-field>
              </v-row>

              <v-row>
                <v-text-field
                  label="CPF"
                  v-mask="['###.###.###-##']"
                  v-model="cpf"
                  :rules="[rules.required, rules.cpf]"
                ></v-text-field>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue"
            variant="text"
            @click="() => addClient()"
          >
            Salvar
          </v-btn>
          <v-btn
            color="grey"
            variant="text"
            @click="() => close()"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  //Controllers
  import ClientsController from './../controllers/ClientsController'

  export default {
    name: 'AddClientScreen',

    data () {
      return {
        dialog: false,
        name: '',
        phone: '',
        cpf: '',
        valid: false,
        rules: {
          required: value => !!value || 'Obrigatório!',
          phone: v => v.length >= 14 || 'Precisa ser um telefone válido',
          cpf: v => v.length == 14 || 'Precisa ser um cpf válido',
        }
      }
    },

    methods: {
      addClient: function() {
        if (this.valid) {
          const clientsController = new ClientsController();
          const newClient = {name: this.name, cpf: this.cpf, phone: this.phone}
          
          clientsController.addClient(newClient)
          this.$router.go();
          this.dialog = false;
        }
      },

      close: function() {
        this.name = '';
        this.phone = '';
        this.cpf = '';
        this.dialog = false;
      }
    }
  }
</script>

<style lang="stylus">
  .add-screen
    min-width: 480px
</style>