// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";

//  filter imports
import setupSearch from "../filters/search.js";
import setupCompanies from "../filters/companies.js";
import setupPrice from "../filters/price.js";

// specific imports
import { store, setupStore } from "../store.js";
import display from "../displayProducts.js";
import { getElement } from "../utils.js";

// //once i am successful i want to hide page loading
// const loading=getElement(".page-loading")

// //fullstoreu buraya geçeceksin sadece featured değil
// display(store,getElement(".products-container"))
// setupSearch(store)
// setupCompanies(store)
// setupPrice(store)

// loading.style.display="none"

//sayfa ziyaretinde indexe uğramadan  doğrudan products a giden bir ziyaretçi problemle karşılaşıyordu bunu halledelim

// import fetch products
import fetchProducts from "../fetchProducts.js";

const init = async () => {
  //start of 26
  const loading = getElement(".page-loading");
  // loading.style.display="none"
  if (store.length < 1) {
    const products = await fetchProducts();
    setupStore(products);
  }
  //end of 26
  //start of 24
  display(store, getElement(".products-container"));
  //end of 24
  // start of 28
  setupSearch(store);
  //end of 28
  //start of 30
  setupCompanies(store);
 // end of 30
 //start of 32
  setupPrice(store);
  //end of 32 
  loading.style.display = "none";
};

init();
