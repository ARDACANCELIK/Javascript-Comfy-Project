// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js"; // cart functionality when you open the cart it works
// specific
import { addToCart } from "../cart/setupCart.js";
import { singleProductUrl, getElement, formatPrice } from "../utils.js";
// start of 35
// selections
const loading = getElement(".page-loading");
const centerDOM = getElement(".single-product-center");
const pageTitleDOM = getElement(".page-hero-title");
const imgDOM = getElement(".single-product-img");
const titleDOM = getElement(".single-product-title");
const companyDOM = getElement(".single-product-company");
const priceDOM = getElement(".single-product-price");
const colorsDOM = getElement(".single-product-colors");
const descDOM = getElement(".single-product-desc");
const cartBtn = getElement(".addToCartBtn");
// cart product
let productID;

//end of 35
// show product when page loads
//this is gonna be asyncronous because we will perform a fetch request
// start of 36
window.addEventListener("DOMContentLoaded", async function () {
  
  
  const urlID = window.location.search; //search tab taki her ürünün unique olan idsini alıyor
  // console.log(urlID);
  //now we want a fetch request we already have a async- dynamic ekleme ile
  try {
    const response = await fetch(`${singleProductUrl}${urlID}`);
    //   console.log(response);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json(); // 404 eroru gibi düşün sadece bu koşulllar altında jsonu alıyor kullanmak için  responsa bakıyor
      //   console.log(product);
      //grab data
      const { id, fields } = product;
      productID = id; //buna daha sonra event listener koyacak o yuzden yukarıda let id oluşuturdu
      const { name, company, price, colors, description } = fields;
      const image = fields.image[0].thumbnails.large.url;
      // set values dynamic
      document.title = `${name.toUpperCase()} | Comfy`;
      pageTitleDOM.textContent = `Home/${name}`;
      imgDOM.src = image;
      titleDOM.textContent = name;
      companyDOM.textContent = `by ${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = description;
      //colors array olduğu için
      colors.forEach((color) => {
        const span = document.createElement("span");
        span.classList.add("product-color");
        span.style.backgroundColor = `${color}`;
        colorsDOM.appendChild(span);
        //dont forget to add event listener to addto cart button inside the page
      });
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `<div>
  <h3 class="error">sorry something went wrong</h3>
  <a href="index.html" class="btn">back home</a>
</div> `;
    }
  } catch (error) {
    console.log(error); //this is network error
  }
  loading.style.display = "none"; // sayfa yükleyince loadingi kapatıyor
});
//dont forget to add event listener to addto cart button inside the page
cartBtn.addEventListener("click", function () {
  addToCart(productID);
});
// end of 36
