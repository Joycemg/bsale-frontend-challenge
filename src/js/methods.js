/**
 *  * Gets all products from the API, and if the product has no image, it will get the image of another product with the same name if possible.
 * @param API - The API object that was created in the previous step.
 * @param search - search,
 * @returns An array of objects.
 */
const GETProducts = async (API, search) => {
  try {
    const res = await API.get(`/API/products`, {
      params: {
        search: search,
      },
      responseType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = res.data;
    const newData = data.map((currentValue, index, array) => {
      if (!currentValue.url_image) {
        array.forEach(product => {
          if (product.name === currentValue.name && product.url_image) {
            currentValue.url_image = product.url_image;
          }
        });
      }
      return currentValue;
    });
    return newData;
  } catch (err) {
    return err.response.status;
  }
};

/**
 * It takes an API object and an id, and returns the product with that id
 * @param API - The API object that you created in the previous step.
 * @param id - The id of the product you want to get.
 * @returns The product with the id that was passed in.
 */
const GETProduct = async (API, id) => {
  try {
    const res = await API.get(`/API/products/${id}`, {
      responseType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    return err.response.status;
  }
};

/**
 * It makes a GET request to the API endpoint /API/category/ and returns the data
 * @returns The data from the API call.
 */
const GETCategories = async API => {
  try {
    const res = await API.get(`/API/category/`, {
      responseType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = res.data;
    return data;
  } catch (err) {
    return err.response.status;
  }
};

/**
 * Takes an API and an id as parameters, then makes a GET request to the API with the id as parameter, then returns the response data.
 * @param API - The API object that was created in the previous step.
 * @param id - the id of the category
 * @returns An array of products
 */
const GETProductsByCategory = async (API, id) => {
  try {
    const res = await API.get(`/API/category/${id}`, {
      responseType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = res.data;
    const newData = data.map((currentValue, index, array) => {
      if (!currentValue.url_image) {
        array.forEach(product => {
          if (product.name === currentValue.name && product.url_image) {
            currentValue.url_image = product.url_image;
          }
        });
      }
      return currentValue;
    });

    return newData;
  } catch (err) {
    return err.response.status;
  }
};

export default {
  GETProducts,
  GETProduct,
  GETCategories,
  GETProductsByCategory,
};
