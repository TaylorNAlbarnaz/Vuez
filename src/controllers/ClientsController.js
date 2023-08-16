import axios from 'axios';

export default class ClientsController {
     getClientById(clientId) {
          return axios.get('http://localhost:3000/clients/' + clientId)
          .then(res => res.data)
     }
}