import axios from 'axios';

export default class SalesController {
     async getSalesFromSeller(sellerId) {
          const sales = [
               {id: 1, productId: 1, quantity: 1},
               {id: 2, productId: 1, quantity: 1},
               {id: 3, productId: 1, quantity: 1}
          ]
          
          return sales;
     }
}