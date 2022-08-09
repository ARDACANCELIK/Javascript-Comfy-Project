import { getElement } from "./utils.js";
// start of 3
const toggleNav = getElement(".toggle-nav");
const sidebarOverlay = getElement(".sidebar-overlay");
const closeBtn = getElement(".sidebar-close");

toggleNav.addEventListener("click", () => {
  sidebarOverlay.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  sidebarOverlay.classList.remove("show");
});
// end  of 3
//bu sayfa ekran küçükken close btn ile sidebarı kapatmayı ve toggle butonu ile sidebarı açmaya yarıyor
//  bu sayfada bir fonksiyon ve specific bir eylem olmadığı için export yazmaya gerek yok  çünkü zaten tüm sayfa total olarak import ediliyor index js'e
