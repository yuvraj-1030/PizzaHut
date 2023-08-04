// Contains the Logic for Fetching ,
// Adding, Sorting, Searching,
 // Deletion , Updation
 /*
  It talk to Network Layer to Bring the JSON, and
  convert JSON into Objects vice-versa

 */
 
// function bindevents(){
//     document.getElementById('clickme').addEventListener(
//         'click',
//         ()=>{
//            alert("hello");
//         }
//     )
// }
import Product from '../models/product.js';
import makeNetworkCall from './api-client.js';

const productOperations = {
    pizzas:[],
    carts:[],
    addToCart(product){
        this.carts.push(product);
    },
    removeFromCart(product,count){
        console.log('&&&&&&&&',product);
        let remain = this.carts.filter(newPizza=>newPizza.id != product.id);
        let len = this.carts.length;
        if(count[product.id]<=0){
            //do nothing
        }
        // else if(len==0){
            
        // }
        else{
            for(let i=0; i<count[product.id]; i++){
                remain.push(product);
            }
        }
        this.carts = remain;

        // this.carts.pop(product);
    },
    getProductsINCart(){
        const cartProducts = this.carts;
        return cartProducts;
    },
    async loadProducts(){
        const pizzas = await makeNetworkCall();
        const pizzaArray = pizzas['Vegetarian'];
        const productsArray = pizzaArray.map(pizza=>{
            const currentPizza = new Product(pizza.id, pizza.name,
                pizza.menu_description, pizza.price, pizza.assets.product_details_page[0].url);
                return currentPizza;
                })
                console.log('PPPPPPPPPPPPPPPPP',this.pizzas);
                console.log('Product Array ', productsArray);
                this.pizzas = productsArray;
                return productsArray;  // Wrap in Promise
            },
    sortProducts(){

    },
    searchProducts(id){
       
        const searchedProduct = this.pizzas.find(pizza=>pizza['id']==id);
        //const searchedProduct = this.pizzas.find(pizza=>pizza[id]===id);
        //searchedProduct.isAddedInCart = true;
        return searchedProduct;
    }
}
export default productOperations;

