/**
 * It takes a product object and a selector, and then it inserts a pattern of HTML into the selector
 * @param product - is the product object that we are going to use to create the HTML.
 * @param select - The element where the product will be inserted.
 */
const Product = async (products, select) => {
  if (products === 404) return;
  products.forEach(product => {
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
     
                <img src=${
                  product.url_image ? `${product.url_image}` : "img/nofound.png"
                }
                    alt="Product image"
                    class="product-img">
                <button class="bag-btn"
                        data-id=${Pk}><i class="fas fa-shopping-cart"></i>Agregar al carrito</button>
        </div>
        <div class="description">
        ${product.category ? `<h5>${product.category.name}</h5>` : ""}
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
  });
};

/**
 * Removes the existing product container, creates a new one and inserts it into the DOM.
 * @returns the productContainer element.
 */
const createProductContainer = select => {
  document.querySelector(".products-center")?.remove();
  const productContainer = document.createElement("div");
  productContainer.className = "products-center";
  select.insertAdjacentElement("beforeend", productContainer);
  return document.querySelector(".products-center");
};

/**
 * It takes in an array of categories and a select object, and then it inserts the categories into the DOM
 * @param categories - The categories array from the API.
 * @param select - This is the object that contains all the selectors.
 */
const category = async (categories, select) => {
  if (categories === 404) return;
  select.banner.style.visibility = "visible";
  categories.forEach(category => {
    const pattern = /*html*/ `
      <li data-id=${category.id}>${category.name}</li>
    `;

    select.categoriesContainer.insertAdjacentHTML("beforeend", pattern);
  });
};

/**
 * Takes an array of products and a selection element, creates a product container, and then passes the products and the product container to the Product function for rendering.
 * @param products - an array of objects that contain the product information
 * @param select - the selector of the div that will have the product container
 */
const Search = (products, select) => {
  const productsContainer = createProductContainer(select);
  Product(products, productsContainer);
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
      <img src=${item.url_image ? `${item.url_image}` : "img/nofound.png"}
      }
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
  setCartValues(arrCart, {
    amount: select.amount,
    itemValue: select.itemValue,
  });
};

/**
 * Takes an array of products and a selector object, and sets the number of items in the cart and the value of the cart quantity.
 * @param arrCart - is an array of objects containing the products in the cart
 * @param select - is the object containing the selectors for the cart
 */
const setCartValues = (arrCart, select) => {
  const amount = arrCart.reduce((sum, product) => {
    return product.discount
      ? sum + ((100 - product.discount) * product.price) / 100
      : sum + product.price;
  }, 0);
  select.itemValue.textContent = arrCart.length;
  select.amount.textContent = amount;
};

/**
 * Removes the item from the cart, updates the cart values and re-enables the add to cart button.
 * @param arrCart - The array of items in the cart.
 * @param id - The id of the product to remove from the cart.
 * @param select - The object containing the cart, amount and quantity of the item.
 * @returns - The array of items.
 */
const removeCartItem = (arrCart, id, select) => {
  select.master.remove();
  const items = arrCart.filter(item => item.productId != id);
  setCartValues(items, {
    amount: select.amount,
    itemValue: select.itemValue,
  });
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
  Search,
  Cart,
  hideCart,
  addCartItem,
  removeCartItem,
  category,
  createProductContainer,
};
