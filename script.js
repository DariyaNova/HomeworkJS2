const goods = [
  { title:'Shirt', price:150},
  { title:'Socks', price:50},
  { title:'Jacket', price:350},
  { title:'Shoes', price:250}];

const renderGoodsItem = (title = 'Название', price = 'Цена') => {  //если правильно поняла, то это значение аргументов по умолчанию, 
                                                                    //если функция будет вызвана к примеру с одним из двух аргументов.
  return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = list => { //из сокращений нашла только возможность удалить "()" у аргумента, так как он один и они не нужны
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  document.querySelector('.goods-list').innerHTML = goodsList.join(''); //не было *join('')*, массив выводился строкой и между добавлял запятую
}

renderGoodsList(goods);