import { getStorageItem, setStorageItem } from "./utils.js";
//start of 15
let store = getStorageItem("store"); //// empty arrayi kaldırıp get storage item yap
//end of 15
//start of 12 
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { featured, name, price, company, colors, image: img },
    } = product;
    const image = img[0].thumbnails.large.url;
    return { id, featured, name, price, company, colors, image };
  });
  //end of 12
  //start of 14
  //senkronize ediyor storage ile
  setStorageItem("store", store); // utilsden geldim ve bunu yazdım.
  //end of 14
};

//start of 40
//if the item is not in the cart it is in the products,,  sana id yi veriyorum store da bana producutu bul
const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  return product;
};
//end of  of 40
export { store, setupStore, findProduct };

// export let store
// export const setupStore
