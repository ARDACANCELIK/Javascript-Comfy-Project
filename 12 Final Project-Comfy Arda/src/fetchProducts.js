import { allProductsUrl } from "./utils.js"; //url yi impot etmiş zaten

const fetchProducts = async () => {
  // start of 11
  const response = await fetch(allProductsUrl).catch((err) => console.log(err));
  
  if (response) {
    return response.json();
  }
  return response;
};
// end of 11

export default fetchProducts;