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
          <span class="text-h5">Novo Produto</span>
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
                  label="Preço"
                  v-model="price"
                  :rules="[rules.required, rules.num]"
                ></v-text-field>
              </v-row>

              <v-row>
                <v-text-field
                  label="Stock"
                  v-model="stock"
                  :rules="[rules.required, rules.num]"
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
            @click="() => addProduct()"
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
import ProductsController from '@/controllers/ProductsController';
  //Controllers
  import ClientsController from '../controllers/ClientsController'

  export default {
    name: 'AddProductScreen',

    data () {
      return {
        dialog: false,
        name: '',
        price: '',
        stock: '',
        valid: false,
        rules: {
          required: value => !!value || 'Obrigatório!',
          num: v => !isNaN(v) || 'Precisa ser um número',
        }
      }
    },

    methods: {
      addProduct: function() {
        if (this.valid) {
          const productsController = new ProductsController();
          const newProduct = {name: this.name, price: this.price, totalStock: this.stock, currentStock: this.stock}
          
          productsController.addProduct(newProduct)
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