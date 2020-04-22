class GoodItem {
    constructor(title = 'Товар', price = 'Цена', img = 'Фото товара') {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item">
                <img src="${this.img}" alt="${this.title}" width="150" height="150">
                <div class="goods-info">
                  <h3>${this.title}</h3>
                  <p>${this.price}</p>
                </div>
                <button class='addItem'>Добавить</button>
              </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            {title: 'Shirt',
             price: 150,
             img: 'img/shirt.jpg'},

            {title: 'Socks',
             price: 50,
             img: 'img/socks.jpg'},

            {title: 'Jacket',
             price: 350,
             img: 'img/jacket.jpg'},

            {title: 'Shoes',
             price: 250,
             img: 'img/shoes.png'},
            {}
        ]
    }
    render() {
        let listHtml = '';
        this.goods.forEach((good) => {
            const goodItem = new GoodItem(good.title, good.price, good.img);
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
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {

    }
}
class ShoppingCart {
    constructor() {
        this.addGoods = [];
    }
     calcGoods() {

     }
}


const list = new GoodsList();
list.fetchGoods();
list.render();
list.calcAllGoods();