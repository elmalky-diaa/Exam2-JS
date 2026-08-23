export async function getApi(query = "chicken") {
  try {
    const res = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/search?q=${query}&page=1&limit=25`,
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return { results: [], error: true, message: error.message };
  }
}

export async function allAreas() {
  try {
    const res = await fetch("https://nutriplan-api.vercel.app/api/meals/areas");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // dispalyAllAreas(data);
    return data;
  } catch (error) {
    console.log(error);
    return { results: [], error: true, message: error.message };
  }
}
export async function allCategories() {
  try {
    const res = await fetch(
      "https://nutriplan-api.vercel.app/api/meals/categories",
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return { results: [], error: true, message: error.message };
  }
}

export async function getByarea(currentArea) {
  try {
    const res = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/filter?a=${currentArea}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { results: [], error: true, message: error.message };
  }
}

export async function getByCategory(currentCategory) {
  try {
    const res = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/filter?c=${currentCategory}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { results: [], error: true, message: error.message };
  }
}

export async function getById(currentId) {
  try {
    const res = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/${currentId}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { results: [], error: true, message: error.message };
  }
}

export async function getProduct(query = "nutella") {
  try {
    const res = await fetch(
      `https://nutriplan-api.vercel.app/api/products/search?q=${query}&page=1&limit=25`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return { results: [], error: true, message: error.message };
  }
}

export async function getProductByBarcode(query) {
  try {
    const res = await fetch(
      `https://nutriplan-api.vercel.app/api/products/barcode/${query}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return { results: [], error: true, message: error.message };
  }
}
