import select from "./selectors.js";
import method from "./methods.js";
import render from "./renders.js";

/* Creating an empty array that will be used to store the products that are added to the cart. */
let inCart = [];
/* Creating an axios instance with the baseURL and timeout. */
const API = axios.create({
  baseURL: "https://apibsale0.herokuapp.com/",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

setTimeout(() => {
  document.body.style.opacity = 1;
}, "1000");

/* Waiting for the DOM to be loaded and then it is calling the GETProducts method from the methods.js
file. */
const products = async () => {
  const products = await method.GETProducts(API);
  if (products !== 404) {
    const containerAllProduct = document.createElement("div");
    containerAllProduct.className = "products-center";
    select.productContainer.insertAdjacentElement(
      "beforeend",
      containerAllProduct
    );
    const productsContainer = document.querySelector(".products-center");
    render.Product(products, productsContainer);
  } else {
    console.log("problem loading products ", products);
  }
};
document.addEventListener("DOMContentLoaded", async () => {
  const categories = await method.GETCategories(API);
  if (categories !== 404) {
    render.category(categories, {
      categoriesContainer: select.categoriesContainer,
      banner: select.banner,
    });
  } else {
    console.log("problem loading categories ", categories);
  }
  products();
});

select.categoriesContainer.addEventListener("click", async event => {
  const target = event.target;
  if (target.tagName !== "LI") return;
  const products = await method.GETProductsByCategory(API, target.dataset.id);
  if (products === 404) return;
  const productsContainer = document.querySelector(".products-center");
  select.allCategory.style.visibility = "visible";
  render.Search(products, {
    productsContainer: productsContainer,
    containerAllproduct: select.productContainer,
  });
});
select.allCategory.addEventListener("click", () => {
  select.allCategory.style.visibility = "collapse";
  const productsContainer = document.querySelector(".products-center");
  productsContainer.remove();
  products();
});
select.inputSearch.addEventListener("input", async () => {
  const search = select.inputSearch.value;
  const products = await method.GETProducts(API, search);
  if (products === 404) return;

  const productsContainer = document.querySelector(".products-center");
  render.Search(products, {
    productsContainer: productsContainer,
    containerAllproduct: select.productContainer,
  });
});

/* Adding an event listener to the cart button. When the button is clicked, it will render the cart. */
select.cartBtn.addEventListener("click", () => {
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
fas fa-window-close or the cart-overlay, it will hide the cart. If the click is on the remove-item, it will remove the item from the cart. */
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
    const productsContainer = document.querySelector(".products-center");

    inCart = render.removeCartItem(inCart, id, {
      cartContent: select.cartContent,
      amount: select.cartAmount,
      master: btnRemove.parentNode.parentNode,
      products: productsContainer,
      itemValue: select.cartItemValue,
    });
  }
});
