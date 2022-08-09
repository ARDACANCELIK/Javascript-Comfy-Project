//   ATTENTION!!!!!!!!!!!
//   I SWITCHED TO PERMANENT DOMAIN
//   DATA IS THE SAME JUST A DIFFERENT URL,
//   DOES NOT AFFECT PROJECT FUNCTIONALITY

const allProductsUrl = "https://course-api.com/javascript-store-products";
// temporary single product
// 'https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog'
const singleProductUrl =
  "https://course-api.com/javascript-store-single-product";

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};
//alternative to price rounding  ${price/100} yerine gidip ${formattedPrice(price)} yazıyorsun  display products.js te
//start of 20
const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return formattedPrice;
};
//end of 20
//start of 16
const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = []; //if the item  is not in local storage orada değilse
  }
  return storageItem;
};
//end of 16
//start of 13 
const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item)); //then go to store.js and setStore
};
//end of 13 
export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
};
