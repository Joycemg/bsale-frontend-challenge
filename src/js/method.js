const GETProducts = async API => {
  try {
    const res = await API.get("/API/products/", {
      responseType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export default { GETProducts };
