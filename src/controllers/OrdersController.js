import axios from 'axios';

export default class OrdersController {
     getAllOrders() {
          return axios.get('http://localhost:3000/orders')
          .then(res => res.data)
     }

     async getOrdersFromSeller(sellerId) {
          let orders = await this.getAllOrders();
          orders = orders.filter(o => o.sellerId == sellerId);
          
          return orders;
     }

     addOrder(order) {
          return axios.post('http://localhost:3000/orders', {...order})
          .then(res => res)
     }
}