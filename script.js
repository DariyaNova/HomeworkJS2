function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
        let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      });
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodItem {
    constructor(id, product_name = 'Товар', price = 'Цена', img = 'Фото товара') {
        this.id = id;
        this.product_name = product_name;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item">
                <img src="${this.img}" alt="${this.product_name}" width="150" height="150">
                <div class="goods-info">
                  <h3>${this.product_name}</h3>
                  <p>${this.price}</p>
                </div>
                <button class='addItem' onclick='addToCart()'>Добавить</button>
              </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
     fetchGoods(cb) {
      makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    })
  }
    render() {
        let listHtml = '';
        this.goods.forEach((good) => {
            const goodItem = new GoodItem(good.id, good.product_name, good.price, good.img);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
    }


    calcAllGoods() {
        let totalPrice = 0;
        this.goods.forEach((good) => {
            if(good.price !== undefined) {
                totalPrice += good.price;
            }
        });
        let cost = 'Стоимость ' + totalPrice;
        document.querySelector('.total-price').innerHTML = cost;
    }

}

class ShoppingCartItem {
    constructor(id, product_name, price, img) {
        this.id = id;
        this.product_name = product_name;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="cart-item">
        <img src="${this.img}" alt="${this.product_name}">
        <div class="cart-info"><h3>${this.product_name}</h3><p>${this.price}</p></div>
        <button class='deleteItem' onclick=''>Удалить</button>
        </div>`;
    }
}

class ShoppingCart {
    constructor() {
        this.cartGoods = [];
    }
    addToCart(id) {
        let toCart;
        list.goods.forEach(function(item) {
            if(id == item.id) {
                toCart = {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    img: item.img
                }
            }
        });
        this.cartGoods.push(toCart);
    }

    deleteFromCart(id) {
        let getIdElement;
        this.cartGoods.forEach(function(item, i) {
            let thisId = item.id;
            if(id == thisId) {
                getIdElement = i;
            }    
        });
        this.cartGoods.splice(getIdElemen, 1);
        this.render();
    }

    render() {
        let readHtml = '';
        this.cartGoods.forEach((good) => {
            const goodItem = new ShoppingCartItem(good.id, good.product_name, good.price, good.img);
            readHtml += goodItem.render();
        })
        document.querySelector('.cart-list').innerHTML =  readHtml;
    }
}
const list = new GoodsList();
const cart = new ShoppingCart();
list.fetchGoods(() => {
list.render();
list.calcAllGoods();
});
