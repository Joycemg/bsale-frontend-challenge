const GETProducts = async (API, search) => {
  try {
    const res = await API.get(
      `/API/products${search ? `?search=${search}` : "/"}`,
      {
        responseType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
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
    return err;
  }
};

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
    console.log(data);
    return data;
  } catch (err) {
    return err.response.status;
  }
};

export default { GETProducts, GETProduct, GETCategories };
