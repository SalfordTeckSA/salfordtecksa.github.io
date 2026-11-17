const grid = document.getElementById("productGrid");
function renderProducts(category="All"){
  const shown = category==="All" ? products : products.filter(p=>p[0]===category);
  document.getElementById("productTitle").innerHTML = category==="All" ? "Popular <em>products.</em>" : category.replace(" "," ")+" <em>products.</em>";
  grid.innerHTML = shown.map(p=>`<article class="product-card"><div class="product-visual">${p[2]}</div><div class="product-tag">${p[0].toUpperCase()}</div><h3>${p[1]}</h3><p>${p[3]}</p><button onclick="requestProduct('${p[1].replace(/'/g,"\\'")}')">Request a quote →</button></article>`).join("");
}
function showProducts(){renderProducts("All");document.getElementById("products").scrollIntoView({behavior:"smooth"});}
function filterProducts(category){renderProducts(category);document.getElementById("products").scrollIntoView({behavior:"smooth"});}
function requestProduct(name){document.querySelector('[name="products"]').value=name+" - Quantity: ";document.querySelector('[name="category"]').value=products.find(p=>p[1]===name)[0];document.getElementById("quote").scrollIntoView({behavior:"smooth"});}
document.getElementById("quoteForm").addEventListener("submit",function(e){
  e.preventDefault();
  const d=new FormData(this);
  const subject=encodeURIComponent("SalfordTeck Quote Request - "+d.get("name"));
  const body=encodeURIComponent(
`Hello SalfordTeck,

I would like to request a quotation.

Name: ${d.get("name")}
Company: ${d.get("company")||"Not supplied"}
Email: ${d.get("email")}
Phone: ${d.get("phone")}
Product category: ${d.get("category")}

Products and quantities:
${d.get("products")}

Kind regards,
${d.get("name")}`
  );
  window.location.href=`mailto:salfordteck@gmail.com?subject=${subject}&body=${body}`;
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();
