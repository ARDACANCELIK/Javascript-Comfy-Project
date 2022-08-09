import { formatPrice } from "./utils.js";
import { addToCart } from "./cart/setupCart.js";
//start of 19 - 57 (filters bug)
const display = (products, element, filters) => {
  //console.log(products, element);
  //display products
  element.innerHTML = products
    .map((product) => {
      const { id, name, image, price } = product;
      return ` <article class="product">
          <div class="product-container">
            <img src="${image}" class="product-img img"
            alt="${name}">
            
            <div class="product-icons">
              <a href="product.html?id=${id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article>`;
    })
    .join("");
  //end of 19
  if (filters) return; // 57  bug fix- search,companies,price js lerede  a de true koydu  displaylere ()
  //start of 21
  element.addEventListener("click", function (e) {
    const parent = e.target.parentElement; //icon gelmesin button gelsin tıklayınca
    if (parent.classList.contains("product-cart-btn")) {
      //grab me the dataset and pass it to cart
      addToCart(parent.dataset.id); // en azından resim üzerindeki sepete tıklayınca  homepage featured kısmında  consolda id görüyoruz.
    }
  });
};
//end of 21
export default display;
