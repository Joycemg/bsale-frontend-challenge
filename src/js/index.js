import productsContainer from "./selectors.js";
import method from "./method.js";
import render from "./render.js";

const API = axios.create({
  baseURL: "https://apibsale0.herokuapp.com/",
  timeout: 5000,
});

document.addEventListener("DOMContentLoaded", async () => {
  const res = await method.GETProducts(API);
  if (res.status === 200) {
    const products = await res.data;
    products.forEach(product => {
      render.Product(product, productsContainer);
    });
  }
});
