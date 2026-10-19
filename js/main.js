const BOOKS=[
{id:1,t:"The Alchemist",a:"Paulo Coelho",c:"novels",p:12,r:5,tag:"Bestseller",e:"🧭",bg:"#e8c27a"},
{id:2,t:"To Kill a Mockingbird",a:"Harper Lee",c:"novels",p:11,r:5,tag:"Classic",e:"🕊️",bg:"#a9c4bd"},
{id:3,t:"Pride and Prejudice",a:"Jane Austen",c:"novels",p:9,r:4,tag:"Student pick",e:"🌹",bg:"#e5b5b5"},
{id:4,t:"The Sealed Nectar",a:"Safiur Rahman Mubarakpuri",c:"islamic",p:15,r:5,tag:"Seerah",e:"🕌",bg:"#9fd0c4"},
{id:5,t:"Riyad as-Salihin",a:"Imam al-Nawawi",c:"islamic",p:18,r:5,tag:"Hadith",e:"📖",bg:"#c9d9a4"},
{id:6,t:"Fortress of the Muslim",a:"Sa'id al-Qahtani",c:"islamic",p:7,r:5,tag:"Pocket size",e:"🤲",bg:"#bcd3e8"},
{id:7,t:"Atomic Habits",a:"James Clear",c:"selfhelp",p:16,r:5,tag:"Bestseller",e:"⚛️",bg:"#f0d58c"},
{id:8,t:"The 7 Habits of Highly Effective People",a:"Stephen R. Covey",c:"selfhelp",p:14,r:4,tag:"Growth",e:"🎯",bg:"#d4c1e6"},
{id:9,t:"Matilda",a:"Roald Dahl",c:"kids",p:8,r:5,tag:"Kids",e:"🧒",bg:"#f2b8a2"},
{id:10,t:"Oxford Student Atlas",a:"Oxford University Press",c:"kids",p:13,r:4,tag:"Academic",e:"🌍",bg:"#a8d5e0"}];
const CATS={novels:"Novels & Fiction",islamic:"Islamic Studies",selfhelp:"Self-Help",kids:"Children & Academic"};
const PAGES=[["index.html","Home"],["books.html","Books & Products"],["about.html","About Us"],["contact.html","Contact Us"]];
const $=s=>document.querySelector(s);
let cart={};try{cart=JSON.parse(localStorage.getItem("ansCart")||"{}")}catch(e){}
const stars=n=>"★".repeat(n)+"☆".repeat(5-n);
const money=n=>"$"+n.toFixed(2);

function layout(){
 const here=location.pathname.split("/").pop()||"index.html";
 const links=PAGES.map(([h,l])=>`<li class="nav-item"><a class="nav-link ${h===here?"active":""}" href="${h}">${l}</a></li>`).join("");
 document.body.insertAdjacentHTML("afterbegin",`<nav class="navbar navbar-expand-lg sticky-top"><div class="container">
 <a class="navbar-brand brand" href="index.html">📚 ANS Book Store</a>
 <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-label="Toggle menu"><span class="navbar-toggler-icon"></span></button>
 <div class="collapse navbar-collapse" id="nav"><ul class="navbar-nav me-auto">${links}</ul>
 <button id="theme" class="btn btn-outline-secondary btn-sm me-2" aria-label="Toggle theme">🌓</button>
 <button class="btn btn-ans btn-sm position-relative" data-bs-toggle="offcanvas" data-bs-target="#cartDrawer">🛒 Cart
 <span id="badge" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">0</span></button></div></div></nav>`);
 document.body.insertAdjacentHTML("beforeend",`<footer><div class="container d-flex flex-wrap justify-content-between gap-2">
 <span>© 2026 ANS Book Store — books for every student.</span><span>ans342347@gmail.com</span></div></footer>
 <div class="offcanvas offcanvas-end" id="cartDrawer"><div class="offcanvas-header"><h5 class="offcanvas-title">Your cart</h5>
 <button class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button></div>
 <div class="offcanvas-body d-flex flex-column"><div id="cartItems" class="flex-grow-1"></div>
 <div class="d-flex justify-content-between fw-bold border-top pt-3"><span>Subtotal</span><span id="subtotal">$0.00</span></div>
 <button id="checkout" class="btn btn-ans mt-3">Check out</button></div></div>
 <div class="toast-container position-fixed bottom-0 end-0 p-3"><div id="toast" class="toast text-bg-success" role="status"><div class="toast-body" id="toastMsg"></div></div></div>`);
}
function toast(m){$("#toastMsg").textContent=m;bootstrap.Toast.getOrCreateInstance($("#toast"),{delay:2500}).show()}
function saveCart(){try{localStorage.setItem("ansCart",JSON.stringify(cart))}catch(e){}renderCart()}
function renderCart(){
 const rows=Object.entries(cart).map(([id,q])=>{const b=BOOKS.find(x=>x.id==id);return `<div class="d-flex align-items-center gap-2 mb-3">
 <span class="fs-3">${b.e}</span><div class="flex-grow-1"><div class="fw-semibold">${b.t}</div><small class="muted">${money(b.p)} each</small></div>
 <button class="btn btn-sm btn-outline-secondary" data-dec="${id}" aria-label="Remove one">−</button><span>${q}</span>
 <button class="btn btn-sm btn-outline-secondary" data-add="${id}" aria-label="Add one">+</button></div>`}).join("");
 $("#cartItems").innerHTML=rows||'<p class="muted">Your cart is empty. Add a book to get started.</p>';
 const qty=Object.values(cart).reduce((a,b)=>a+b,0);
 $("#badge").textContent=qty;
 $("#subtotal").textContent=money(Object.entries(cart).reduce((s,[id,q])=>s+BOOKS.find(x=>x.id==id).p*q,0));
}
function card(b){return `<div class="col-sm-6 col-lg-3"><div class="card h-100"><div class="cover" style="background:${b.bg}">${b.e}</div>
 <div class="card-body d-flex flex-column"><span class="badge text-bg-warning align-self-start mb-2">${b.tag}</span>
 <h3 class="h6">${b.t}</h3><p class="muted small mb-1">${b.a}</p><div class="stars mb-2" aria-label="${b.r} out of 5">${stars(b.r)}</div>
 <div class="mt-auto d-flex justify-content-between align-items-center"><strong>${money(b.p)}</strong>
 <button class="btn btn-ans btn-sm" data-add="${b.id}">Add to cart</button></div></div></div></div>`}

document.addEventListener("click",e=>{
 const a=e.target.closest("[data-add]"),d=e.target.closest("[data-dec]");
 if(a){const id=a.dataset.add;cart[id]=(cart[id]||0)+1;saveCart();toast(BOOKS.find(x=>x.id==id).t+" added to cart")}
 if(d){const id=d.dataset.dec;cart[id]--;if(cart[id]<=0)delete cart[id];saveCart()}
 if(e.target.id==="checkout"){if(!Object.keys(cart).length)return toast("Your cart is empty.");cart={};saveCart();toast("Order placed! We'll email your confirmation.")}
 if(e.target.id==="theme"){const h=document.documentElement,n=h.dataset.bsTheme==="dark"?"light":"dark";h.dataset.bsTheme=n;try{localStorage.setItem("ansTheme",n)}catch(x){}}
});

document.addEventListener("DOMContentLoaded",()=>{
 try{document.documentElement.dataset.bsTheme=localStorage.getItem("ansTheme")||"light"}catch(e){}
 layout();renderCart();
 const feat=$("#featured");if(feat)feat.innerHTML=BOOKS.filter(b=>b.tag==="Bestseller"||b.id===4||b.id===9).slice(0,4).map(card).join("");
 const grid=$("#bookGrid");
 if(grid){let cat="all",q="";
  $("#pills").innerHTML=[["all","All Books"],...Object.entries(CATS)].map(([k,l])=>`<button class="pill ${k==="all"?"active":""}" data-cat="${k}">${l}</button>`).join("");
  const draw=()=>{const list=BOOKS.filter(b=>(cat==="all"||b.c===cat)&&(b.t+" "+b.a).toLowerCase().includes(q));
   grid.innerHTML=list.map(card).join("");$("#empty").classList.toggle("d-none",list.length>0)};
  $("#search").addEventListener("input",e=>{q=e.target.value.trim().toLowerCase();draw()});
  $("#pills").addEventListener("click",e=>{const p=e.target.closest("[data-cat]");if(!p)return;cat=p.dataset.cat;
   document.querySelectorAll(".pill").forEach(x=>x.classList.toggle("active",x===p));draw()});
  draw()}
 const f=$("#contactForm");
 if(f)f.addEventListener("submit",e=>{e.preventDefault();f.classList.add("was-validated");
  if(f.checkValidity()){toast("Thanks! Your message has been sent.");f.reset();f.classList.remove("was-validated")}});
});
