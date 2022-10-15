import select from "./selectors.js";
import method from "./methods.js";
import render from "./renders.js";

/* Creating an empty array that will be used to store the products that are added to the cart. */
let inCart = [];

/* Creating an axios instance with the baseURL and timeout. */
const API = axios.create({
  baseURL: "https://apibsale0.herokuapp.com/",
  timeout: 5000,
});

/* Waiting for the DOM to be loaded and then it is calling the GETProducts method from the methods.js
file. */
document.addEventListener("DOMContentLoaded", async () => {
  const res = await method.GETProducts(API);
  if (res.status === 200) {
    const products = await res.data;
    products.forEach(product => {
      render.Product(product, select.productsContainer);
    });
  }
});

/* Adding an event listener to the cart button. When the button is clicked, it will render the cart. */
select.cartBtn.addEventListener("click", event => {
  render.Cart({
    overlay: select.cartOverlay,
    cart: select.cart,
    container: select.allContainer,
  });
});

/* This is an event listener that is listening for a click on the product container. If the click is on the bag-btn, it will get the id of the product and then it will get the product from the API. Then it will add the product to the inCart array and render the cart. */
select.productContainer.addEventListener("click", async event => {
  if (event.target.className !== "bag-btn") return;
  const bagBtn = event.target;
  const id = bagBtn.dataset.id;
  bagBtn.textContent = "En el carrito";
  bagBtn.disabled = true;
  const cartItem = await method.GETProduct(API, id);
  inCart = [...inCart, cartItem];
  render.Cart({
    overlay: select.cartOverlay,
    cart: select.cart,
    container: select.allContainer,
  });

  render.addCartItem(cartItem, inCart, {
    cartContent: select.cartContent,
    amount: select.cartAmount,
    itemValue: select.cartItemValue,
  });
});

/* This is an event listener that is listening for a click on the cart overlay. If the click is on the
fas fa-window-close or the cart-overlay transparentBcg, it will hide the cart. If the click is on the remove-item, it will remove the item from the cart. */
select.cartOverlay.addEventListener("click", event => {
  if (
    event.target.className === "fas fa-window-close" ||
    event.target.className === "cart-overlay transparentBcg"
  ) {
    render.hideCart({
      overlay: select.cartOverlay,
      cart: select.cart,
      container: select.allContainer,
    });
  }

  if (event.target.className === "remove-item") {
    const btnRemove = event.target;
    const id = btnRemove.dataset.id;
    console.log(btnRemove);

    inCart = render.removeCartItem(inCart, id, {
      cartContent: select.cartContent,
      amount: select.cartAmount,
      master: btnRemove.parentNode.parentNode,
      products: select.productsContainer,
      itemValue: select.cartItemValue,
    });
  }
});
