import select from './selectors.js';
import method from './methods.js';
import render from './renders.js';
/**
 * Creating an empty array that will be used to store the products that are added to the cart. */
let inCart = [];

/* Creating an axios instance with the baseURL and timeout. */
const API = axios.create({
  baseURL: 'https://apibsale0.herokuapp.com/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});

setTimeout(() => {
  document.body.style.opacity = 1;
}, '1000');

/**
 * GetProducts() is an asynchronous function that calls the GETProducts() method of the method.js file,
 * which returns a promise. If the promise is not rejected, the function creates a container of products.
 * and renders the products in the container
 */
const GetProducts = async () => {
  const products = await method.GETProducts(API);
  if (products !== 404) {
    const productsContainer = render.createProductContainer(
      select.productContainer,
    );

    render.Product(products, productsContainer);
  } else {
    console.log('problem loading products ', products);
  }
};

/**
 * This is an event listener that listens for the DOMContentLoaded event. When the event
event is triggered, it will call the GETCategories() method of the method.js file and GetProducts() of the main file, which return a promise.
If the promises are not rejected, it will render in their specified containers.
*/
document.addEventListener('DOMContentLoaded', async () => {
  const categories = await method.GETCategories(API);
  if (categories !== 404) {
    render.category(categories, {
      categoriesContainer: select.categoriesContainer,
      banner: select.banner,
    });
  } else {
    console.log('problem loading categories ', categories);
  }
  GetProducts();
});

/**
 * This is an event listener that listens for a click on the category container. Clicking on a category will fetch the products in that category and display them in the product container. */
select.categoriesContainer.addEventListener('click', async (event) => {
  const { target } = event;
  if (target.tagName !== 'LI') return;
  const products = await method.GETProductsByCategory(API, target.dataset.id);
  if (products === 404) return;
  select.allCategory.style.visibility = 'visible';
  render.Search(products, select.productContainer);
});

/**
 * This is an event listener that listens for a button click in all categories. When clicked, it will hide the button and call the GetProducts() function. */
select.allCategory.addEventListener('click', () => {
  select.allCategory.style.visibility = 'collapse';
  GetProducts();
});

/**
 * This is an event listener that listens for an entry in the search entry. When an input is detected, it will get the value of the input and then call the GETProducts() method of the method.js file. If the promise is not rejected, it will display the products in the products container. */
select.inputSearch.addEventListener('input', async () => {
  const search = select.inputSearch.value;
  const products = await method.GETProducts(API, search);
  if (products === 404) return;

  render.Search(products, select.productContainer);
});

/**
 * Adding an event listener to the cart button. When the button is clicked, it will render the cart. */
select.cartBtn.addEventListener('click', () => {
  render.Cart({
    overlay: select.cartOverlay,
    cart: select.cart,
    container: select.allContainer,
  });
});

/**
 * This is an event listener that is listening for a click on the product container. If the click is on the bag-btn, it will get the product id and then get the product from the API. It will then add the product to the inCart array and display the cart. */
select.productContainer.addEventListener('click', async (event) => {
  if (event.target.className !== 'bag-btn') return;
  const bagBtn = event.target;
  const { id } = bagBtn.dataset;
  bagBtn.textContent = 'En el carrito';
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

/**
 * This is an event listener that is listening for a click on the cart overlay. If the click is on the fas fa-window-close or the cart-overlay, it will hide the cart. If the click is on the remove-item, it will remove the item from the cart. */
select.cartOverlay.addEventListener('click', (event) => {
  if (
    event.target.className === 'fas fa-window-close'
    || event.target.className === 'cart-overlay transparentBcg'
  ) {
    render.hideCart({
      overlay: select.cartOverlay,
      cart: select.cart,
      container: select.allContainer,
    });
  }

  if (event.target.className === 'remove-item') {
    const btnRemove = event.target;
    const { id } = btnRemove.dataset;
    const productsContainer = document.querySelector('.products-center');

    inCart = render.removeCartItem(inCart, id, {
      cartContent: select.cartContent,
      amount: select.cartAmount,
      master: btnRemove.parentNode.parentNode,
      products: productsContainer,
      itemValue: select.cartItemValue,
    });
  }
});
