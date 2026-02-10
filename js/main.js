// ==========================
// GLOBAL CONFIG
// ==========================
console.log("Grace Clothing website loaded successfully");
const whatsappNumber = "2348133813733";

// ==========================
// LOAD PRODUCTS FROM SUPABASE
// ==========================
async function loadProducts() {
  console.log("Starting to load products...");
  console.log("supabaseClient exists:", typeof supabaseClient);
  
  try {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*');

    console.log("Supabase response - data:", data);
    console.log("Supabase response - error:", error);

    if (error) throw error;

    console.log("Number of products loaded:", data.length);
    
    populateHome(data);
    populateShop(data);
    
    console.log("Products populated successfully!");
  } catch (err) {
    console.error("Product load error:", err.message);
    console.error("Full error:", err);
  }
}

// ==========================
// POPULATE HOME PAGE (FIRST 14)
// ==========================
function populateHome(products) {
  const homeProductGrid = document.getElementById("homeProductGrid");
  if (!homeProductGrid) return;

  // Clear existing content first to prevent duplicates
  homeProductGrid.innerHTML = '';

  products.slice(0, 14).forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p class="price">₦${product.price.toLocaleString()}</p>
    `;
    homeProductGrid.appendChild(card);
  });

  // Banner under home products (only add if it doesn't exist)
  if (!document.querySelector('.home-banner')) {
    const banner = document.createElement("div");
    banner.className = "home-banner";
    banner.innerHTML = `
      <h3>Luxury, Quality & Style in Every Stitch</h3>
      <p>Discover our curated selection of clothes designed to make you stand out.</p>
    `;
    homeProductGrid.parentNode.insertBefore(banner, homeProductGrid.nextSibling);
  }
}

// ==========================
// POPULATE SHOP PAGE (ALL)
// ==========================
function populateShop(products) {
  const productGrid = document.getElementById("productGrid");
  if (!productGrid) return;

  // Clear existing content first to prevent duplicates
  productGrid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p class="price">₦${product.price.toLocaleString()}</p>
      <p class="stock">Stock: ${product.stock}</p>
      <div class="product-buttons">
        <button class="btn-negotiate"
          onclick="sendWhatsApp('${product.name}','${product.price}','${product.image}')">
          Negotiate Price
        </button>
        <a href="payment.html?name=${encodeURIComponent(product.name)}&price=${product.price}&image=${product.image}&stock=${product.stock}"
          class="btn-make-payment">
          Make Payment
        </a>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// ==========================
// RUN ONLY ONCE WHEN PAGE LOADS
// ==========================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadProducts);
} else {
  loadProducts();
}

// ==========================
// IMAGE MODAL (PREVIEW)
// ==========================
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("product-image")) {
    if (modal && modalImg) {
      modal.style.display = "block";
      modalImg.src = e.target.src;
    }
  }
});

if (closeBtn) {
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };
}

if (modal) {
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
}

// ==========================
// WHATSAPP NEGOTIATION
// ==========================
function sendWhatsApp(name, price, image) {
  const message = `Hello Grace Clothing 👋
I am interested in this item:
Name: ${name}
Price: ₦${Number(price).toLocaleString()}
Image: ${window.location.origin}/${image}
Can we negotiate the price?`;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ==========================
// PAYMENT PAGE DATA
// ==========================
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get("name");
const productPrice = urlParams.get("price");
const productImage = urlParams.get("image");
const productStock = urlParams.get("stock");

const paymentSection = document.querySelector(".payment");
if (paymentSection && productName && productPrice) {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.gap = "20px";
  container.style.marginBottom = "20px";
  container.style.flexWrap = "wrap";

  const img = document.createElement("img");
  img.src = productImage;
  img.style.width = "120px";
  img.style.height = "120px";
  img.style.objectFit = "cover";
  img.style.borderRadius = "8px";

  const info = document.createElement("p");
  info.innerHTML = `
    <strong>Product:</strong> ${productName}<br>
    <strong>Price:</strong> ₦${Number(productPrice).toLocaleString()}<br>
    <strong>Stock:</strong> ${productStock}
  `;

  container.appendChild(img);
  container.appendChild(info);
  paymentSection.insertBefore(container, paymentSection.querySelector(".instructions"));
}

// ==========================
// PAYMENT WHATSAPP BUTTON
// ==========================
function sendPaymentWhatsApp() {
  let message = `Hello Grace Clothing 👗
I have completed my payment for the following item:
`;

  if (productName && productPrice) {
    message += `Name: ${productName}
Price: ₦${Number(productPrice).toLocaleString()}
`;
  }

  if (productImage) {
    message += `Image: ${window.location.origin}/${productImage}
`;
  }

  message += `Here is my payment screenshot. Please confirm my order.`;

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
}