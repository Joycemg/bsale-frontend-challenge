/**
 * It takes a product object and a selector, and then it inserts a pattern of HTML into the selector
 * @param product - is the product object that we are going to use to create the HTML.
 * @param select - The element where the product will be inserted.
 */
const Product = async (product, select) => {
  const Pk = `${product.productId}`;
  const pattern = /*html*/ `
    <article data-id=${Pk} class="product">
    <div class="img-container">
        
              ${
                product.discount
                  ? `<div class="discount-container">
                        <h5>OFERTA! </h5>
                        <h5>${product.discount}%</h5>
                    </div>`
                  : ""
              }
     
                <img src=${product.url_image}
                    alt="Product image"
                    class="product-img">
                <button class="bag-btn"
                        data-id=${Pk}><i class="fas fa-shopping-cart"></i>Agregar al carrito</button>
        </div>
        <div class="description">
        <h3>${product.name}</h3>
        ${
          product.discount
            ? `<h5 style='text-decoration: line-through; font-size: 1.5rem';>$${
                product.price
              } <h4>$${((100 - product.discount) * product.price) / 100}</h4>`
            : `<h4>$${product.price}</h4>`
        }


        </div>
    </article>`;

  select.insertAdjacentHTML("beforeend", pattern);
};

/**
 * It takes an item, an array of items, and a selector object as arguments, and then inserts a pattern of HTML into the cartContent element of the selector object
 * @param item - the item that we want to add to the cart
 * @param arrCart - the array of objects that contains the cart items
 * @param select - is an object that contains all the selectors of the cart.
 */
const addCartItem = (item, arrCart, select) => {
  const pattern = /*html*/ `
  <div class="cart-item" data-id=${item.productId}>
      <img src=${item.url_image}
           alt="product image">
      <div>
            <h4>${item.name}</h4>
                    ${
                      item.discount
                        ? `<h5>$${
                            ((100 - item.discount) * item.price) / 100
                          }</h5>`
                        : `<h5>$${item.price}</h5>`
                    }
 
            <span class="remove-item"
                  data-id=${item.productId}>Eliminar</span>
      </div>

      <div>
            <i class="fas fa-chevron-up"
               data-id=${item.productId}></i>
            <p class="item-amount">1</p>
            <i class="fas fa-chevron-down"
               data-id=${item.productId}></i>
      </div>;
 </div>`;

  select.cartContent.insertAdjacentHTML("beforeend", pattern);
  setCartValues(arrCart, select.amount);
};

/**
 * It takes an array of products and a selector, and returns the total amount of the products in the array.
 * @param arrCart - the array of products in the cart
 * @param select - the select element
 */
const setCartValues = (arrCart, select) => {
  const amount = arrCart.reduce((sum, product) => {
    return product.discount
      ? sum + ((100 - product.discount) * product.price) / 100
      : sum + product.price;
  }, 0);

  select.textContent = amount;
};

/**
 * It removes the item from the cart, updates the cart values, and enables the add to cart button
 * @param arrCart - The array of items in the cart.
 * @param id - The id of the product that we want to remove from the cart.
 * @param select - is the object that contains the cart, the amount and the products
 * @returns The items array.
 */
const removeCartItem = (arrCart, id, select) => {
  select.master.remove();
  const items = arrCart.filter(item => item.productId != id);
  setCartValues(items, select.amount);
  const product = [...select.products.children].find(
    product => product.dataset.id === id
  );
  const btn = product.firstElementChild.lastElementChild;
  btn.disabled = false;
  btn.textContent = "Agregar al carrito";
  return items;
};

/**
 * When the user clicks on the cart icon, the overlay, cart, and container will all be displayed.
 * @param select - is the object that contains select the cart, overlay, container
 */
const Cart = select => {
  select.overlay.classList.add("transparentBcg");
  select.cart.classList.add("showCart");
  select.container.classList.add("blur");
};

/**
 * When the user clicks on the close button, remove the transparent background, remove the showCart class, and remove the blur class.
 * @param select - is the object that contains select the cart, overlay, container
 */
const hideCart = select => {
  select.overlay.classList.remove("transparentBcg");
  select.cart.classList.remove("showCart");
  select.container.classList.remove("blur");
};

export default {
  Product,
  Cart,
  hideCart,
  addCartItem,
  removeCartItem,
};
