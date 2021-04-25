'use strict';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods();
        this._render();
        this._calcSum();
    }

    _fetchGoods() {
        this._goods = [
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ];
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

        console.log(sum);
    }
}

class ProductItem {
    constructor(product, img = "https://via.placeholder.com/200x250") {
        this.title = product.title;
        this.price = product.price;
        this.img = img;
        this.id = product.id;
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
    constructor() {

    }

    render() { };
}

class CartItem {
    constructor() {

    }

    render() { };
    remove() { };
    increase() { };
    decrease() { };
}

new ProductList();