<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="auto"
    >
      <v-card
        class="mx-auto pa-8 pb-2"
        elevation="14"
        width="448"
        rounded="lg"
      >
        <v-text-field
          density="compact"
          placeholder="Email"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
        ></v-text-field>

        <v-text-field
          density="compact"
          placeholder="Senha"
          :rules="[rules.required, rules.min]"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          v-model="password"
          type="password"
        ></v-text-field>
        
        <v-card-actions>
          <v-btn
            block
            variant="elevated"
            density="comfortable"
            color="blue"
            @click="() => login()"
          >Logar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: 'LoginDialog',

    data: () => ({
      dialog: true,
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Obrigatório!',
        min: v => v.length >= 8 || 'Precisa ter ao menos 8 caracteres'
      }
    }),

    props: {
      open: {
        type: Boolean,
        default: true
      }
    },

    setup: (props, { emit }) => {
      function login() {
        emit('login', this.email, this.password)
        setTimeout(() => {
          this.email = ''
          this.password = ''
        }, 1000)
      }

      return {
        login
      }
    },

    watch: {
      open: function(newVal) {
        this.dialog = newVal;
      }
    }
  }
</script>