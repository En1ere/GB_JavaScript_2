Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://via.placeholder.com/200x250',
            filtered: [],
        }
    },
    methods: {
        
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `<div class="products">
                    <product v-for="product of filtered" :key="product.id_product" :img="imgCatalog" :product="product"></product>
                </div>`,
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item">
                    <img :src='img' alt="Some img">
                    <div class="desc">
                        <h3 class="product-name">{{ product.product_name }}</h3>
                        <p>{{ product.price }} ₽</p>
                        <button class="by-btn" @click='$root.$refs.cart.addProduct(product)'>Добавить в корзину</button>
                    </div>
                </div>`,
});