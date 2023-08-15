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
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
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
      email: ''
    }),

    props: {
      open: {
        type: Boolean,
        default: true
      }
    },

    setup: (props, { emit }) => {
      function login() {
        emit('login', this.email)
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