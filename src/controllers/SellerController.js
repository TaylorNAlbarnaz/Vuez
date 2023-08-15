import axios from 'axios';

export default class SellerController {
     getAllSellers() {
          return axios.get('http://localhost:3000/sellers')
          .then(res => res.data)
     }
}