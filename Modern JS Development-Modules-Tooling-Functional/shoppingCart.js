
//exporting module
console.log(`exporting module`)

const cart = [];
//named export 
// export const addToCart = function(product, quantity) {
//     cart.push({product, quantity})
//     console.log(`${quantity} ${product} added to cart`)
// }

const totalPrice = 200;
const totalQuantity = 3;

export {totalPrice as price, totalQuantity}

//default export
export default function(product, quantity) {
    cart.push({product, quantity})
    console.log(`${quantity} ${product} added to cart`)
}