import axios from 'axios';

export default class ClientsController {
     getAllClients() {
          return axios.get('http://localhost:3000/clients')
          .then(res => res.data)
     }

     getClientsPaginated(page) {
          return axios.get(`http://localhost:3000/clients?_page=${page}&_limit=8`)
          .then(res => res.data)
     }

     getClientById(clientId) {
          return axios.get('http://localhost:3000/clients/' + clientId)
          .then(res => res.data)
     }

     searchClient(query) {
          return axios.get('http://localhost:3000/clients?q=' + query)
          .then(res => res.data)
     }

     addClient(client) {
          return axios.post('http://localhost:3000/clients', {...client})
          .then(res => res)
     }
}