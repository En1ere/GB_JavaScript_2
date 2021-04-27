'use strict';
//_______________________________________________________________________
// Переделать в ДЗ не использовать fetch а Promise
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };
//________________________________________________________________________

// Перевел на промисы

// let promiseFunc = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);

//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };
//_______________________________________________________________________________________________


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._getProducts()
            .then((data) => {
                this._goods = data;
                this._render();
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const good of this._goods) {
            const productObject = new ProductItem(good)
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render())
        }
    }

    _calcSum() {
        let sum = 0;

        const products = document.querySelectorAll('.product-item');
        for (const product of products) {
            sum += +product.dataset.price
        }

        return sum;
    }
}

class ProductItem {
    constructor(product, img = "https://via.placeholder.com/200x250") {
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
        this.id = product.id_product;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}" data-price="${this.price}">
                    <img src=${this.img}>        
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} \u20bd</p>
                        <button class="by-btn">Добавить в корзину</button>
                    </div>
                </div>`;
    }
}

class Cart {
    constructor(container = '.cart__mini') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];
        this.openCart();
        this._getCart()
            .then((data) => {
                this._goods = data;
                this._render();
            });
    }

    _getCart() {
        return fetch(`${API}/getBasket.json`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const good of this._goods.contents) {
            const cartItemObject = new CartItem(good)
            this._allProducts.push(cartItemObject);
            block.insertAdjacentHTML('beforeend', cartItemObject.render())
        }
    };

    openCart() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart__mini').classList.toggle('hidden');
        })
    };
}

class CartItem {
    constructor(product, img = "https://via.placeholder.com/100x150") {
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
        this.id = product.id_product;
        this.quantity = product.quantity;
        this.totalSum = this.quantity * this.price;
    }

    render() {
        return `<div class="cart__item">
                    <div class="cart__item-desc">
                        <img src="${this.img}" alt="Some image">
                        <div class="cart__item-desc-text">
                            <p class="cart__item-title">${this.title}</p>
                            <p class="cart__item-quantity">Количество: ${this.quantity}</p>
                            <p class="cart__item-single-price">${this.price}₽ за единицу</p>
                        </div>
                    </div>
                    <div class="cart__item-button">
                        <p class="cart__item-price">${this.totalSum}₽</p>
                        <button class="cart__item-del-btn">&times;</button>
                    </div>
                </div>`
    };

    remove() { };
    increase() {

    };
    decrease() { };
}

new ProductList();
new Cart();