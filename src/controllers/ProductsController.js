import axios from 'axios';

export default class ProductsController {
     getAllProducts() {
          return axios.get('http://localhost:3000/products')
          .then(res => res.data)
     }

     getProductById(productId) {
          return axios.get('http://localhost:3000/products/' + productId)
          .then(res => res.data)
     }

     addProduct(product) {
          return axios.post('http://localhost:3000/products', {...product})
          .then(res => res)
     }
}