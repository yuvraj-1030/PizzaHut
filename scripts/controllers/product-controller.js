// Product Controller - It is a Glue B/w View and Model
// Controller - I/O View Layer

import productOperations from "../services/product-operations.js";
// Data Exchange B/w View and Model.

var count = {10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0};
var subTotalValue = 0.000;
var totalTax = 0.000;
var amount = 0.000;

async function loadPizzas(){
  const pizzas = await productOperations.loadProducts();
  console.log('Pizzas are ', pizzas);
  for(let pizza of pizzas){
    preparePizzaCard(pizza);
  }
}
loadPizzas();
function preparePizzaCard(pizza){
  const output = document.querySelector('#loadData');
  const colDiv = document.createElement('div');
  colDiv.className = 'col-3';
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card text-left mb-3 mr-2';
  //cardDiv.style = 'width:16rem; height: 650px;';
  colDiv.appendChild(cardDiv);
  const img = document.createElement('img');
  img.src = pizza.url;
  img.className = 'card-img-top';
  cardDiv.appendChild(img);
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardDiv.appendChild(cardBody);
  const h5 = document.createElement('h5');
  h5.className = 'card-title';
  h5.innerText = pizza.name;
  const veg = document.createElement('img');
  veg.src = 'Screenshot 2023-07-30 at 4.16.16 PM.png';
  veg.className = 'siz';
  const pTag = document.createElement('p');
  pTag.className = 'card-text';
  pTag.innerText = pizza.desc;
  cardBody.appendChild(h5);
  cardBody.appendChild(veg);
  cardBody.appendChild(pTag);
  const cardBody2 = document.createElement('div');
  cardBody2.className = 'card-body';
  cardDiv.appendChild(cardBody2);
  const row1 = document.createElement('div');
  row1.className = 'row';
  cardBody2.appendChild(row1);
  const crust = document.createElement('span');
  crust.className = 'crust position-absolute bottom-0 start-20';
  crust.style = 'width: 14rem; text-align:left; margin-bottom: 110px; margin-left: 10px;';
  crust.innerText = 'Select your crust';
  row1.appendChild(crust);
  const col = document.createElement('row');
  col.innerHTML=`
  <button class="btn btn-light dropdown-toggle justify-content-evenly position-absolute bottom-0 start-20" style="width: 12rem; margin-bottom: 65px; margin-left: 5px; background-color:lightgray; text-align:left"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Medium Pan
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Cheese Burst</a></li>
    <li><a class="dropdown-item" href="#">Whole Wheat</a></li>
    <li><a class="dropdown-item" href="#">Stuffed Crust</a></li>
  </ul>`;
  cardBody2.appendChild(col);
  const row2 = document.createElement('div');
  row2.className = 'row';
  cardBody2.appendChild(row2);
  const button = document.createElement('button');
  button.innerText = `Add to Basket $${pizza.price}`;
  button.className = 'btn btn-success justify-content-evenly position-absolute bottom-0 start-20';
  button.style = 'width: 12rem; text-align:center; margin-bottom: 15px; margin-left: 16.7px;';
  button.setAttribute('product-id', pizza.id);
  button.setAttribute('product-price',pizza.price);
  button.addEventListener('click',addPizzaToCart);
  row2.appendChild(button);
  output.appendChild(colDiv);
}

function printCartTotal(){
  const cartProducts = productOperations.getProductsINCart();
  let len = cartProducts.length;
  if(len==1){
    const output = document.querySelector('#cart-total');
    const output2 = document.querySelector('#cart-tax');
    const output3 = document.querySelector('#cart-checkout');
    if(output==null){
      const newDiv = document.querySelector('#cart-total');
      const myDiv = document.getElementById('sub');
      newDiv.appendChild(myDiv);
    }
    else{
      output.id = 'out';
      output2.id = 'out2';
      output3.id = 'out3';
      const subTotal =  document.createElement('row');
      subTotal.id = 'sub';
      subTotal.className = 'row';
      subTotal.style = 'height: 10px; width: 325px; margin-left: 15px; margin-top: 5px';
      const col1 = document.createElement('col');
      col1.className = 'col-9 myCartPizza';
      col1.style = 'height: 10px;';
      const span1 = document.createElement('span');
      span1.innerText = `Subtotal`;
      const col2 = document.createElement('col');
      col2.className = 'col-3 myCartPizza';
      col2.style = 'height: 10px;';
      const span2 = document.createElement('span');
      span2.innerText = `$${parseFloat(subTotalValue).toFixed(2)}`;
      span2.id = 'span-id';
      col2.appendChild(span2);
      col1.appendChild(span1);
      subTotal.appendChild(col1);
      subTotal.appendChild(col2);
      const subTotal2 =  document.createElement('row');
      subTotal2.id = 'sub2';
      subTotal2.className = 'row';
      subTotal2.style = 'height: 10px; width: 325px; margin-left: 15px; margin-top: 5px';
      const col3 = document.createElement('col');
      col3.className = 'col-9 myCartPizza';
      const span3 = document.createElement('span');
      span3.innerText = `Total Tax`;
      const col4 = document.createElement('col');
      col4.className = 'col-3 myCartPizza';
      const span4 = document.createElement('span');
      span4.innerText = `$${parseFloat(totalTax).toFixed(2)}`;
      span4.id = 'span-id2';
      col3.appendChild(span3);
      col4.appendChild(span4);
      subTotal2.appendChild(col3);
      subTotal2.appendChild(col4);
      const subTotal3 =  document.createElement('row');
      subTotal3.id = 'sub3';
      subTotal3.className = 'row';
      subTotal3.style = 'height: 10px; width: 325px; margin-left: 15px; margin-top: 5px';
      const col6 = document.createElement('col');
      col6.className = 'col-9 myCartPizza';
      const span6 = document.createElement('span');
      span6.innerText = `Amount payable`;
      const col7 = document.createElement('col');
      col7.className = 'col-3 myCartPizza';
      const span7 = document.createElement('span');
      span7.innerText = `$${parseFloat(amount).toFixed(2)}`;
      span7.id = 'span-id3';
      col6.appendChild(span6);
      col7.appendChild(span7);
      subTotal3.appendChild(col6);
      subTotal3.appendChild(col7);
      output.appendChild(subTotal);
      output2.appendChild(subTotal2);
      output3.appendChild(subTotal3);
    }
  }
  console.log('@@@@@@@@');
}

function eraseCartTotal(){
  const cartProducts = productOperations.getProductsINCart();
  let len = cartProducts.length;
  if(len==0){
    const myDiv = document.getElementById('sub');
    const myDiv2 = document.getElementById('sub2');
    const myDiv3 = document.getElementById('sub3');
    // myDiv.remove();
    const output = document.getElementById('out');
    const output2 = document.getElementById('out2');
    const output3 = document.getElementById('out3');
    output.removeChild(myDiv);
    output2.removeChild(myDiv2);
    output3.removeChild(myDiv3);
  }
}

function printCart(){
  const cartProducts = productOperations.getProductsINCart();
  console.log('-------------cartproducts',cartProducts);
  const Basket = document.querySelector('#basket');
  Basket.innerHTML = ``;
  for(let product of cartProducts ){
    const element = document.createElement('row');
    element.className = 'row myElement';
    element.style = 'height: 100px; width: 315px; margin-left: 10px; margin-bottom: 10px; margin-top: 10px; background-color: azure;';
    const col1 = document.createElement('col');
    col1.className = 'col-7 myCartPizza';
    col1.style = 'margin-left: 0px';
    const span1 = document.createElement('span');
    span1.innerText = `${product.name}`;
    col1.appendChild(span1);
    const col2 = document.createElement('col');
    col2.className = 'col-3 myCartPizza';
    col2.style = 'margin-left: 0px';
    const span2 = document.createElement('span');
    span2.innerText = `$${product.price}`;
    col2.appendChild(span2);
    const col3 = document.createElement('col');
    col3.className = 'col-1 myCartPizza';
    col3.style = 'margin-left: 0px';
    const remove = document.createElement('button');
    remove.className = 'myBtn text-center';
    remove.style = 'height: 3px; width: 3px; margin-top: 0px';
    remove.innerText = 'X';
    remove.setAttribute('remove-id',product.id);
    remove.setAttribute('remove-price',product.price);
    remove.addEventListener('click',removePizzaFromCart);
    col3.appendChild(remove);
    element.appendChild(col1);
    element.appendChild(col2);
    element.appendChild(col3);
    Basket.appendChild(element);
  }
}

function addPizzaToCart(){
  const pizzaId = this.getAttribute('product-id');
  const pizzaPrice = this.getAttribute('product-price');
  subTotalValue = subTotalValue + parseFloat(pizzaPrice);
  totalTax = totalTax + 0.18*(parseFloat(pizzaPrice));
  amount = subTotalValue + totalTax;
  console.log('Current Button Clicked ', pizzaId);
  const addedPizza = productOperations.searchProducts(pizzaId);
  productOperations.addToCart(addedPizza);
  count[pizzaId] = count[pizzaId]+1;
  console.log('count is ',count[pizzaId]);
  console.log('*******',addedPizza);
  // if(this.isAddedInCart){
  //   console.log('danger');
  //   this.className = 'btn btn-danger justify-content-evenly position-absolute bottom-0 start-20';
  //   this.style = 'width: 12rem; text-align:center; margin-bottom: 15px; margin-left: 16.7px;';
  //   this.innerText = 'Remove from Basket';
  //   productOperations.addToCart(pizza);
  // }
  // else{
  //   console.log('success');
  //   this.className = 'btn btn-success justify-content-evenly position-absolute bottom-0 start-20';
  //   this.style = 'width: 12rem; text-align:center; margin-bottom: 15px; margin-left: 16.7px;';
  //   console.log(pizza.price);
  //   this.innerText = `Add to Basket`;
  //   productOperations.removeFromCart(pizza);
  // }
  printCart();
  printCartTotal();
  const valueChange = document.getElementById('span-id');
  valueChange.innerText = `$${parseFloat(subTotalValue).toFixed(2)}`;
  const valueChange2 = document.getElementById('span-id2');
  valueChange2.innerText = `$${parseFloat(totalTax).toFixed(2)}`;
  const valueChange3 = document.getElementById('span-id3');
  valueChange3.innerText = `$${parseFloat(amount).toFixed(2)}`;
}

function removePizzaFromCart(){
  const pizzaId = this.getAttribute('remove-id');
  const pizzaPrice = this.getAttribute('remove-price');
  subTotalValue = subTotalValue - parseFloat(pizzaPrice);
  totalTax = totalTax - 0.18*(parseFloat(pizzaPrice));
  amount = subTotalValue + totalTax;
  console.log('Current Button Clicked ', pizzaId);
  const addedPizza = productOperations.searchProducts(pizzaId);
  console.log('++++++',addedPizza);
  count[pizzaId] = count[pizzaId]-1;
  productOperations.removeFromCart(addedPizza,count);
  console.log('count is ',count[pizzaId]);
  printCart();
  eraseCartTotal();
  const valueChange = document.getElementById('span-id');
  valueChange.innerText = `$${parseFloat(subTotalValue).toFixed(2)}`;
  const valueChange2 = document.getElementById('span-id2');
  valueChange2.innerText = `$${parseFloat(totalTax).toFixed(2)}`;
  const valueChange3 = document.getElementById('span-id3');
  valueChange3.innerText = `$${parseFloat(amount).toFixed(2)}`;
}
    

