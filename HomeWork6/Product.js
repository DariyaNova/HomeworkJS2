Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'img/shirt.jpg',
        }
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product ref="product" v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    data() {
      return {
          cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
      };
    },
    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
                </div>
            </div>
    `
});


Vue.component("filters", {
  data() {
    return {
      userSearch: "",
    };
  },
  mounted() {
    this.productsAPI = this.$root.$refs.products;
  },
  template: `
    <form action="#" class="search-form" @submit.prevent="productsAPI.filter(userSearch)">
            <input type="text" class="search-field" v-model="userSearch" />
            <button class="btn-search" type="submit">
            </button>
          </form>  
    `
});
