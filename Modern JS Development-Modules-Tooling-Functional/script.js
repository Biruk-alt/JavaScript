
//importing module
// import {addToCart, price, totalQuantity} from "./shoppingCart.js"
// console.log(price, totalQuantity)
// addToCart(`pc`, 3)

import * as ShoppingCart from './shoppingCart.js'

console.log(`importing module`)
ShoppingCart.addToCart('iphone', 10)

// import add from './shoppingCart.js'
// add('breead', 90)