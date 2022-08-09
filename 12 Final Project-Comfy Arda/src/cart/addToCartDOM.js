import { formatPrice, getElement } from "../utils.js";



//start  of 43
const cartItemsDOM=getElement(".cart-items")
//end of 43
//start  of 42
const addToCartDOM = ({ id, name, price, image, amount }) => {
  const article = document.createElement("article");
  article.classList.add("cart-item");
  article.setAttribute("data-id", id); // atrribute of id
  article.innerHTML = `<img
              src="${image}"
              class="cart-item-img"
              alt="${name}"
            />
             
            <div>
              <h4 class="cart-item-name">${name}</h4>
              <p class="cart-item-price">${formatPrice(price)}</p>
              <button class="cart-item-remove-btn" data-id="${id}">remove</button>
            </div>
             
            <div>
              <button class="cart-item-increase-btn" data-id="${id}">
                <i class="fas fa-chevron-up"></i>
              </button>
              <p class="cart-item-amount" data-id="${id}">${amount}</p>
              <button class="cart-item-decrease-btn"data-id="${id}" >
                <i class="fas fa-chevron-down"></i>
              </button>
            </div> `;
            //end  of 42
            //start of 44
            cartItemsDOM.appendChild(article)
            //end of 44
};
export default addToCartDOM;
