import { getElement } from "../utils.js";
 //start of 5 
const cartOverlay = getElement(".cart-overlay");
const closeCartBtn = getElement(".cart-close");
const toggleCartBtn = getElement(".toggle-cart");

toggleCartBtn.addEventListener("click", () => {
  cartOverlay.classList.add("show");
});
closeCartBtn.addEventListener("click", () => {
  cartOverlay.classList.remove("show");
});

// unutma shopping yaparken cart icona basınca hem shop liste ekliyor hem cart list sidebarı açıyor

export const openCart = () => {
  // cartın açılması birçok işlevinden biri ama bunu açcak kodu şimdilik buraya yazalım
  cartOverlay.classList.add("show");
};
 //end of 5 