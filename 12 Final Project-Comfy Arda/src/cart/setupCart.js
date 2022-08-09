// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items
// start of 37
const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");

let cart = getStorageItem("cart");
// end of 37
export const addToCart = (id) => {
  // console.log(id); //do ı have that item in the cart if no add if yes update
  // start of 39
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    // find that item from products
    // end of 39
    //start of 41
    let product = findProduct(id);
    //add item to the cart
    product = { ...product, amount: 1 }; // spread out and copy producta ne varsa onu bana ver ve amount bir yap öncesinde kartta bu item yoktu çünkü sonra bu productu carta ekliyor
    cart = [...cart, product]; // get me all the cart items  and add this new product
    //add item to the DOM
    addToCartDOM(product);
    //end of 41
  } else {
    // 442bölüm
    //start of 51
    //if item is in the cart  update values regardless
    const amount = increaseAmount(id);
    // şimdi increase amountu hallettikten sonra domda bu işlemi gösterecek
    // const items = cartItemsDOM.querySelectorAll("cart-item-amount") // bu bize bir nodelist verdi, bunu spread operator ile arraya çeviriyor çünkü spesifik artışın hangi itemde olduğunu bulup onu arttıracak yeni hali bu oluyor
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")]; // now find  the specific one for updating // bu noktaya kadar herhangi bir ürünün üzerine anasayfa ve product kısmında sepet tıklaması yapınca bu artış init ten kaynaklanıyor ve refreshsiz cart içi amount artışı mümkün değil  specific ve id eşleştirici bir atama ile refreshsiz cart için amount artırımı ancak bu aşağıdaki kod ile mümkün.
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
    //end of 51
  }
  //1-add one to the item count(ana sepet sayımı)
  //start of 46
  displayCartItemCount();
  //2-display cart totals
  displayCartTotal();
  //3- set cart in local storage (sayfa yenilemede değiştirmede yeni itemi dom- local storage arası senkronizasyon önemli)
  //end of  46
  //start of 45
  setStorageItem("cart", cart);
  //end of 45
  // 37 başında var open cart dğerlerinden önce bile -more stuff coming up

  openCart();
};
/////
/////
/////
////////
//start of 47
function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}
////////
function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  //update total
  cartTotalDOM.textContent = ` Total:${formatPrice(total)}`;
}
//end of 47
/////////
//start of 50
function displayCartItemsDOM() {
  //  it will just iterate over our cart and will  call  add tocartDOM - we call this function if the product wasnt in the cart
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}
//end of 50
/////
//start of 51.5
function increaseAmount(id) {
  let newAmount;
  // update Data,update cart,update dom
  cart = cart.map((cartItem) => {
    
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      //overwrite the value increase the amount
      cartItem = { ...cartItem, amount: newAmount }; /// yok bunun için new Amount oluşturdu. ve { ...cartItem, amount: cartItem.amount + 1 } kısmı //new amount olmadan önce sadace cart kısmı local storageta çalışıyordu yeni artan item orada gözüküyordu ama sayfada domda bir artış gözükmüyordu  ana sepet iconunda artış gözükmesine rağmen ama cart içi  görüntüde bir artış yoktu // new amount sonrası böylece local storageda gördük,baskette gördük hatta total da gördük ama ok kısmında artışın spesifik kimden kaynaklandığı ve domda verisi önemli  yukarıda find ile arıyor.// ayrıca refreshsiz güncelleme kart içinde yukarıdaki increase amount ile mümkün
    }
    return cartItem; //olduğu gibi döndür kart itemi
  });
  return newAmount; // sonra domu etkilyecek şekilde yukarıda invoke ettiği yere gidiyor
}
////
//end of 51.5
//start of 53
function removeItem(id) {
  cart = cart.filter((cartItem) => 
    cartItem.id !== id
  ); //this removes the item from the cart now we need to remove it from the dom below
}
//end of 53
////
//start of 55
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;

      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
//end of 55
////
////
//start of 49 -end of 49 
function setupCartFunctionality() {
  //start of 52
  cartItemsDOM.addEventListener("click", function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;

    // remove
    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(id);
      parent.parentElement.remove();
      // element.parentElement.parentElement(remove)
    }
    //end  of 52
    //start of 54
    // increase
    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    //end of 54
    //start of 56
    // decrease
    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID); //bu data
        parent.parentElement.parentElement.remove(); // domdan atıyor
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    //end of 56
    //start of 52- these 3 run regardless what happens
    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
    //end of 52
  });
}

////////////
// start of 38
const init = () => {
  //start of 48 içlerini dolduruyor
  //display amount of  cart items
  displayCartItemCount();
  //display total
  displayCartTotal();
  //add all cart items to the dom- display items in cart
  displayCartItemsDOM();
  //set up functionality (buttons,remove,increase ) sayfadan sayfaya geçerken korunacak şekilde
  setupCartFunctionality();
  //end of 48 içlerini dolduruyor
};

init();
//// end of 38 - içindekiler yok boş şu an 