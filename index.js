import axios from "./node_modules/axios";

const API_URL = "https://api.ecommerce.com/products";
const MAX_PRODUCTS_PER_REQUEST = 1000;
const MAX_PRICE = 100000;
const MIN_PRICE = 0;

// This function fetches products within a specific price range from the API.
async function fetchProductsInRange(minPrice, maxPrice) {
  try {
    // We make a GET request to the API with minPrice and maxPrice as query parameters.
    const response = await axios.get(API_URL, {
      params: { minPrice, maxPrice },
    });
    return response.data; // If successful, the function returns the data from the API.
  } catch (error) {
    // If there is an error, it is logged to the console, and the function returns null.
    console.error(`Error fetching range ${minPrice}-${maxPrice}:`, error);
    return null;
  }
}

// This function splits the price range if needed and collects all products.
async function splitAndFetch(minPrice, maxPrice, products) {
  const data = await fetchProductsInRange(minPrice, maxPrice);

  if (!data) return; // If no data is returned, stop the function.

  if (data.total > MAX_PRODUCTS_PER_REQUEST) {
    // If the number of products is greater than the maximum allowed per request,
    // we split the price range into two halves and fetch products for each half.
    const midPrice = Math.floor((minPrice + maxPrice) / 2);
    await splitAndFetch(minPrice, midPrice, products); // Fetch products in the first half.
    await splitAndFetch(midPrice + 1, maxPrice, products); // Fetch products in the second half.
  } else {
    // If the number of products is within the allowed limit,
    // we add them to the products array.
    products.push(...data.products);
  }
}

// This function orchestrates the process of fetching all products.
async function fetchAllProducts() {
  const products = [];
  // Start fetching products from the entire price range.
  await splitAndFetch(MIN_PRICE, MAX_PRICE, products);
  return products; // Return the final array of all products.
}

// The main execution block that starts the process and logs the results.
fetchAllProducts()
  .then((allProducts) => {
    console.log(`Total products fetched: ${allProducts.length}`);
    // Further processing of allProducts can be done here.
  })
  .catch((err) => {
    console.error("Error fetching all products:", err);
  });
