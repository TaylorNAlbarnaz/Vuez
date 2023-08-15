import axios from 'axios';

export default class ProductsController {
     getProductById(productId) {
          return axios.get('http://localhost:3000/products/' + productId)
          .then(res => res.data)
     }
}