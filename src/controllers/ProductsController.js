import axios from 'axios';

export default class ProductsController {
     getAllProducts() {
          return axios.get('http://localhost:3000/products')
          .then(res => res.data)
     }

     getProductsPaginated(page) {
          return axios.get(`http://localhost:3000/products?_page=${page}&_limit=8`)
          .then(res => res.data)
     }

     getProductById(productId) {
          return axios.get('http://localhost:3000/products/' + productId)
          .then(res => res.data)
     }

     searchProduct(query) {
          return axios.get('http://localhost:3000/products?q=' + query)
          .then(res => res.data)
     }

     addProduct(product) {
          return axios.post('http://localhost:3000/products', {...product})
          .then(res => res)
     }

     updateProduct(product) {
          return axios.put('http://localhost:3000/products/' + product.id, {...product})
          .then(res => res.data)
     }
}