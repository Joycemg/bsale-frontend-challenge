const Product = async (product, selector) => {
  const pattern = /*html*/ `
    <article class="product">
        <div class="img-container">
                <img src=${product.url_image}
                    alt="Product image"
                    class="product-img">
                <button class="bag-btn"
                        data-id="1"><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>
        </div>
        <h3>${product.name}/h3>
        <h4>${product.price}</h4>
    </article>`;

  selector.insertAdjacentHTML("beforeend", pattern);
};

export default { Product };
