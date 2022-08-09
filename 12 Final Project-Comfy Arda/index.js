// global imports - for all the pages
import "./src/toggleSidebar.js";
import "./src/cart/toggleCart.js";
import "./src/cart/setupCart.js"; //sayfadan sayfaya geçerken
// alışveriş kartı dediğimiz araba iconu yani card list içindeki özellikleri, datayı bilgiyi  diğer sayfalardada etkin kılmak isyoruz örnek  HTMLModElement,about,productsta
// specific imports
import fetchProducts from "./src/fetchProducts.js";
import { setupStore, store } from "./src/store.js";
import display from "./src/displayProducts.js";
import { getElement } from "./src/utils.js";

// 1- ilk önce  toggle side barı yaptı
//2- daha sonra toogle cart
//3-about page
//4-featured products html
//5-fetch products için  a- index jse sayfa yükleyince ona fonsksiyon ekle init sonra fetch products sayfasına git
//6- sonra setup our store
//7-local storage ( now all we want to
// deal with a local storage and you might be wondering, OK, why do we need this local storage since I can access my store nicely in the index js And you're correct.However, you need to keep in mind that essentially in order to get those products in the product page,we will have to use the local storage) thus go to utils for storage setting and getting for using local storage and passing it to products page
//8- store js de // empty arrayi kaldırıp get storage item yap
//daha sonra utils'e gidip get storage itemda çalış
// daha sonra ana sayfada featured product kısmına bakıyor
//display products (init indexe display(featured,getElement(".featured-center" yazıyoruz sonra display products'a gidip orayı halettik
//format price
//add to cart setupunu daha da önemlisi homepage içindeki featured kısmında resim üzerindeki sepete tıklayınca id almayı tamamladı display product kısmında
//şimdi products (product değil) html
//now display all products  - products.js içine
// bu kodu yazdık  display(store, getElement(".products-container"));
// ardından page loading -  products sayfasını local storagedan alıp hızlı açıyor olabiliriz ama içinde single product tıklarken zaman alıyor
// en iyisi tüm sayfaya bir loading koymak  -products html page loading kısmı devam
///HTML FOR THE FİLTERS
//now search filter--setupSearch.jsproducts sayfasında arama inputu yapacak ilk önce gitti products kısmını setupSearch(store) invoke etti sonra searchjs de yazdı kodu
//şimdi companies filter- products js e gidiyoruz ve setupCompanies(store) yazdık ve oradan companies js dosyasına gidiyoruz
//price filter - products içinde gidip setupprice invoke ediyor önce sonra price.js e geçiyoruz
//single product html
//product.js e gidiyoruz - first once the page loads we hide loading
//__single product and we will fetch -we'll have to start by figuring out, well, how we can grab that I.D. from the URL.
// And it's actually much more easier than you think.
// We can get it by going to window object and then we're looking for location and then the property is
// search.
//network erroru yakalama ok ya bazı productlar yoksa  try catchden daha farklı
//___now grab the data out of object
// We are grabbing the data out of the object.
// And then, of course, we're accessing those items in the dom and then we're just updating to the values
// that we're getting from the product.

// now product js de single product ile ilgili düzenlemelri yapıp dinamic olarak yerleştirdik sıra  setup carta geldi
// set aup cart için önemli olan husus local storage da item data olabilir ama saydan sayfaya taşınan boş bir cart array yok onu yaratıyoruz  set up carta git

// her halukarda open cart açık ilk önce cart itemi bulup id ile eşleştiriyoruz(tabi store jse gidip find product fonksiyonunu yaratıyoruz ) sonra bu item cart içinde var mı yoksa ürünü bul ve bulduğun ürünü yeni bir speard operatörü ile miktarını güncelleyerek oluştur daha sonra bunu karta ekle daha sonra ise görüntüsü için doma ekleyeceksin(x1)  daha sonra totals kısmını güncellyeceksin
//___So keep that in mind, where once we click on Add to CART, we have two options.

// If the item is not there, then we'll add a brand new item to the cart.However, if the item is already in the cart, we'll just update the values in the cart.So in the data and then we'll synchronize it to a local storage and also will right away update on dom___________________________
// x1- doma ekleme add cart to dom
// dinamik olarak cart items içinde article yaratıyor
//now addto cart  totals-  setupa gelip
//cartta ürün ekleme ve eklenen ürün sayısını sepette görme
// kart içinde total fiyat tamam ama bunlar update olup sayfalar arası taşınmıyor sayfa yenilenince durmuyor local storage da array olarak duruyor bunu görsele init ile çevireceğiz  set up cart init
//şimdi ise  init bittikten sonra (yani sayfadan sayfaya dolaşırken verilerin kaybolmadan güncellenmesi basket teki rakamın güncel kalması, eklediğimiz ürünün sayfa değiştirince ve refreshte güncel kaldıığı toplam fiyatın gösterilmesi halloldu sıra halihazırda kart içinde itemslara geldi
// karta ekleme tamam ama cart içindeki eklenmiş ürünlerin sayısını arttırma, azaltma remove bunları yapacağız ) eklenmiş bir ürünü tekrar ekleyince ürün sayısı artmıyor sayfaya eklenmiyor.  bunları halledeceiğiz update items ile .-  setup cart js kısmındayız yine diğerlerinde olduğu gibi
// cart update items
// start of 10
const init = async () => {
  const products = await fetchProducts();
  if (products) {
    // add products to the store
    setupStore(products);
    //start of 17
    const featured = store.filter((product) => product.featured === true);
    //end of 17
    //start of 18
    display(featured, getElement(".featured-center"));
    //end of 18
  }
};
// end  of 10
// start of 9
window.addEventListener("DOMContentLoaded", init);
// end of 9
//init is callback function
