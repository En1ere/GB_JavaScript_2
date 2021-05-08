Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            isVisibleCart: false,
            cartItems: [],
            imgCart: 'https://via.placeholder.com/100x150',
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div>
            <button class="btn-cart" type="button" @click='isVisibleCart = !isVisibleCart'>Корзина</button>
            <div class="cart__mini" v-show='isVisibleCart'>
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart__item" v-for="item of cartItems" :key="item.id_product" :cart-item="item" :img="imgCart" @remove="remove"></cart-item>
            </div>
        </div>`,
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
        <div class="cart__item">
            <div class="cart__item-desc">
                <img :src="img" alt="Some image">
                <div class="cart__item-desc-text">
                    <p class="cart__item-title">{{cartItem.product_name}}</p>
                    <p class="cart__item-quantity">Количество: {{cartItem.quantity}}</p>
                    <p class="cart__item-single-price">{{cartItem.price}}₽ за единицу</p>
                </div>
            </div>
            <div class="cart__item-button">
                <p class="cart__item-price">{{cartItem.quantity*cartItem.price}}₽</p>
                <button class="cart__item-del-btn" @click="$emit('remove', cartItem)">&times;</button>
            </div>
        </div>`,
});