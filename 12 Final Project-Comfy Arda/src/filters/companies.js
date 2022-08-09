import { getElement } from "../utils.js";
import display from "../displayProducts.js";
//start of 31
const setupCompanies = (store) => {
  let companies = [
    "all",
    ...new Set(
      store.map((product) => 
        product.company
        // repeating values here we should fix it with new Set  method, now we have unique values  fakat it gives back object bunu spread ile arraya çeviriyoruz, bu all bütün firmalar.
      )
    ),
  ];
  const companiesDOM = getElement(".companies");
  companiesDOM.innerHTML = companies
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join("");
  //   console.log(companies);
  companiesDOM.addEventListener("click", function (e) {
    const element = e.target;
    if (element.classList.contains("company-btn")) {
      let newStore = [];
      if (element.textContent === "all") {
        newStore = [...store];
      } else {
          // all butonuna tıklamazsak 
          newStore=store.filter((product)=>product.company===e.target.textContent);
      }
      display(newStore,getElement(".products-container"),true)
    }
  });
  //icon değil text olduğu için companies dom childrena tıklayınca bubble up yapıyor event
};
//end of 31

export default setupCompanies;
