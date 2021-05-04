'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://via.placeholder.com/200x250',
        searchLine: '',
        isVisibleCart: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product)
        }
    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
    openCart() {
        
    }
});

// class List {
//     constructor(url, container, list = listContext) {
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this.init();
//     }

    // getJson(url) {
    //     return fetch(url ? url : `${API + this.url}`)
    //         .then(result => result.json())
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }
//     render() {
//         const block = document.querySelector(this.container);

//         for (const good of this.goods) {
//             const productObject = new this.list[this.constructor.name](good);
//             this.allProducts.push(productObject);
//             block.insertAdjacentHTML('beforeend', productObject.render())
//         }
//     }
//     calcSum() {
//         let sum = 0;

//         const products = document.querySelectorAll('.product-item');
//         for (const product of products) {
//             sum += +product.dataset.price
//         }

//         return sum;
//     }
//     getData(data) {
//         this.goods = [...data];
//         this.render();
//     }
//     init() {
//         return false
//     }
// }
// class ProductsList extends List {
//     constructor(cart, url = "/catalogData.json", container = '.products') {
//         super(url, container);
//         this.cart = cart;
//         this.getJson().then(data => this.getData(data));
//     }
//     init() {
//         document.querySelector(this.container).addEventListener('click', el => {
//             if (el.target.classList.contains('by-btn')) {
//                 this.cart.addProduct(el.target);
//             }
//         });
//     }
// }
// class Cart extends List {
//     constructor(url = '/getBasket.json', container = '.cart__mini') {
//         super(url, container);
//         this.getJson()
//             .then(data => {
//                 this.getData(data.contents);
//             });
//     }
//     getCart() {
//         return fetch(`${API}/getBasket.json`)
//             .then((response) => response.json())
//             .catch((error) => {
//                 console.log(error);
//             });
//     }
//     init() {
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector('.cart__mini').classList.toggle('hidden');
//         })
//         document.querySelector(this.container).addEventListener('click', el => {
//             if (el.target.classList.contains('cart__item-del-btn')) {
//                 this.removeProduct(el.target);
//             }
//         })
//     }
//     addProduct(el) {
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +el.dataset['id'];
//                     let find = this.allProducts.find(product => product.product_id === productId);
//                     if (find) {
//                         find.quantity++;
//                         this.updateCart(find);
//                     } else {
//                         let product = {
//                             id_product: productId,
//                             price: +el.dataset['price'],
//                             product_name: el.dataset['name'],
//                             quantity: 1
//                         };

//                         this.goods = [product];
//                         this.render();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//     removeProduct(el) {
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +el.dataset['id'];
//                     let find = this.allProducts.find(product => product.product_id === productId);
//                     if (find.quantity > 1) {
//                         find.quantity--;
//                         this.updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart__item[data-id="${productId}"]`).remove();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//     updateCart(product) {
//         let block = document.querySelector(`.cart__item[data-id="${product.product_id}"]`);
//         block.querySelector('.cart__item-quantity').textContent = `Количество: ${product.quantity}`;
//         block.querySelector('.cart__item-price').textContent = `${product.quantity * product.price} ₽`;
//     }
// }
// class Item {
//     constructor(product, img = "https://via.placeholder.com/200x250") {
//         this.product_name = product.product_name;
//         this.price = product.price;
//         this.img = img;
//         this.product_id = product.id_product;
//     }
//     render() {
//         return ``;
//     }
// }
// class ProductItem extends Item {
//     render() {
        // return `<div class="product-item" data-id="${this.product_id}" data-price="${this.price}">
        //             <img src=${this.img}>        
        //             <div class="desc">
        //                 <h3>${this.product_name}</h3>
        //                 <p>${this.price} \u20bd</p>
        //                 <button class="by-btn" data-id="${this.product_id}" data-name="${this.product_name}" data-price="${this.price}">Добавить в корзину</button>
        //             </div>
        //         </div>`;
//     }
// }
// class CartItem extends Item {
//     constructor(product, img = "https://via.placeholder.com/100x150") {
//         super(product, img);
//         this.quantity = product.quantity;
//         this.totalSum = this.quantity * this.price;
//     }

//     render() {
//         return `<div class="cart__item" data-id="${this.product_id}">
//                     <div class="cart__item-desc">
//                         <img src="${this.img}" alt="Some image">
//                         <div class="cart__item-desc-text">
//                             <p class="cart__item-title">${this.product_name}</p>
//                             <p class="cart__item-quantity">Количество: ${this.quantity}</p>
//                             <p class="cart__item-single-price">${this.price}₽ за единицу</p>
//                         </div>
//                     </div>
//                     <div class="cart__item-button">
//                         <p class="cart__item-price">${this.totalSum}₽</p>
//                         <button class="cart__item-del-btn" data-id="${this.product_id}">&times;</button>
//                     </div>
//                 </div>`
//     };
// }
// const listContext = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// };
// let cart = new Cart();
// let products = new ProductsList(cart);