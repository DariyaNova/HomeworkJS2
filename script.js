const app = new Vue({
  el: '#app',
  data: {
    products: [],
    filteredProducts: [],
    img: [],
    searchLine: '',
    cart: [],
    isVisibleCart: false,
  },
  methods: {
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
                let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
                xhr.open("GET", url, true);
                xhr.onload = () => resolve(JSON.parse(xhr.responseText));
                xhr.onerror = () => reject(xhr.statusText);
                xhr.send();
            });
    },
    
    addProduct(product) {
      let productIndex = this.cart.findIndex(el => el.id === product.id);

      if (productIndex != -1) {
        this.cart[productIndex].quantity++;
      } else {
        let cartItem = Object.assign({}, product);
        Vue.set(cartItem, 'quantity', 1);
        this.cart.push(cartItem);
        
      }
    },

    removeProduct(product) {
      let productIndex = this.cart.findIndex(el => el.id === product.id);

      if (productIndex != -1) {
        if (this.cart[productIndex].quantity > 1) {
          this.cart[productIndex].quantity--;   
        } else {
          this.deleteProduct(product);
        }
      }

    },

    deleteProduct(product) {
      let productIndex = this.cart.findIndex(el => el.id === product.id);

      if (productIndex != -1) this.cart.splice(productIndex, 1);
    },


    calcCart() {
      return this.cart.reduce((total, el) => total += el.price * el.quantity , 0);
      
    },

    filterGoods() {
      this.filteredProducts = this.products.filter(el =>
        el.title.includes(this.searchLine)
      );
    }
  },
   mounted() {
    this.makeGETRequest(`response.json`).then(data => {
      for (let el of data) {
        this.products.push(el);
      }
    });
    this.filteredProducts = this.products;
  }
});