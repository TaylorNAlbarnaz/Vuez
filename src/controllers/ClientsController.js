import axios from 'axios';

export default class ClientsController {
     getAllClients() {
          return axios.get('http://localhost:3000/clients')
          .then(res => res.data)
     }

     getClientById(clientId) {
          return axios.get('http://localhost:3000/clients/' + clientId)
          .then(res => res.data)
     }

     addClient(client) {
          return axios.post('http://localhost:3000/clients', {...client})
          .then(res => res)
     }
}