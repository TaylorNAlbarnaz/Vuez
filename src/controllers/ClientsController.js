import axios from 'axios';

export default class ClientsController {
     getAllSaless() {
          return axios.get('http://localhost:3000/sales')
          .then(res => res.data)
     }
}