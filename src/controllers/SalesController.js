import axios from 'axios';

export default class SalesController {
     getSaleById(saleId) {
          return axios.get('http://localhost:3000/sales/' + saleId)
          .then(res => res.data)
     }

     addSale(sale) {
          return axios.post('http://localhost:3000/sales', {...sale})
          .then(res => res)
     }
}