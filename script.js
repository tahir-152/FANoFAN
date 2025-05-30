// Product data (10 fans, with premium and offer flags)
const products = [
  {
    name: "Modern Ceiling Fan",
    price: 5599,
    img: "https://modernfan.com/wp-content/uploads/mfc-product-images/ARB-FM-DB-54-GY-NL.jpg",
    desc: "Silent, energy-efficient, and stylish for any room. Remote control included.",
    rating: 4.7,
    reviews: 124,
    premium: false,
    offer: true
  },
  {
    name: "Classic Table Fan",
    price: 4500,
    img: "https://m.media-amazon.com/images/I/41CaXFx0ycL.jpg",
    desc: "Portable, powerful, and perfect for your desk or bedside.",
    rating: 4.3,
    reviews: 89,
    premium: false,
    offer: false
  },
  {
    name: "Tower Fan",
    price: 6700,
    img: "https://philipsappliances.pk/wp-content/uploads/2025/01/vrs_abdd85208a72ea51f3413ce2c244aa891cae33cf-600x600.webp",
    desc: "Sleek design, remote control, and multiple speed settings.",
    rating: 4.5,
    reviews: 102,
    premium: false,
    offer: false
  },
  {
    name: "Vintage Pedestal Fan",
    price: 4999,
    img: "https://i5.walmartimages.com/asr/32d3653f-f84d-48cd-82be-32863166cee1.a9f5136e5f54c5c980d3faf2640406e7.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    desc: "Retro look with modern performance. Adjustable height and tilt.",
    rating: 4.2,
    reviews: 67,
    premium: false,
    offer: true
  },
  {
    name: "Smart WiFi Fan",
    price: 10000,
    img: "https://static-01.daraz.pk/p/63e9e68f0f592f44bc4ca4c5e892ccd4.jpg",
    desc: "Control from your phone or voice assistant. Ultra-quiet operation.",
    rating: 4.8,
    reviews: 210,
    premium: true,
    offer: false
  },
  {
    name: "Mini USB Desk Fan",
    price: 3999,
    img: "https://i5.walmartimages.com/asr/b2c37199-e460-424a-af76-61b49b519558.79aef705be7dfa09261b5162a8686a59.jpeg",
    desc: "Compact and portable. Perfect for office or travel.",
    rating: 4.1,
    reviews: 54,
    premium: false,
    offer: false
  },
  {
    name: "Industrial Wall Fan",
    price: 8500,
    img: "https://i5.walmartimages.com/seo/Hyper-Tough-24-2-Speed-Metal-High-Velocity-Tiltable-Drum-Fan_1624caf0-46a7-41f0-9591-a9114afe2a91.6c0bb07c740c21624eada41b93051423.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    desc: "High airflow for large spaces. Durable and reliable.",
    rating: 4.4,
    reviews: 76,
    premium: false,
    offer: false
  },
  {
    name: "Bladeless Tower Fan",
    price: 7999,
    img: "https://perysmith.com.my/wp-content/uploads/2022/06/website_T11-1.png",
    desc: "Safe for kids and pets. Modern, minimalist design.",
    rating: 4.6,
    reviews: 98,
    premium: true,
    offer: false
  },
  {
    name: "Outdoor Misting Fan",
    price: 99.99,
    img: "https://royalfans.com/cdn/shop/products/Majestic.jpg?v=1586779339&width=500",
    desc: "Beat the heat outdoors with a cooling mist. Weather-resistant.",
    rating: 4.3,
    reviews: 45,
    premium: false,
    offer: true
  },
  {
    name: "Luxury Chandelier Fan",
    price: 6999,
    img: "https://s.alicdn.com/@sc04/kf/Hdc51df0b202f4cf8afe1d156a0e8f6b13.jpg_720x720q50.jpg",
    desc: "Elegant lighting and cooling in one. Adds luxury to any room.",
    rating: 4.9,
    reviews: 32,
    premium: true,
    offer: false
  }
];

// Cart logic
let cart = [];

function addToCart(productName) {
  const product = products.find(p => p.name === productName);
  const cartItem = cart.find(item => item.name === productName);
  if (cartItem) {
    cartItem.qty += 1;
  } else {
    cart.push({ name: product.name, price: product.price, qty: 1 });
  }
  updateCartCount();
}

function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.qty, 0);
}

function openCart() {
  renderCart();
  document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCart() {
  document.getElementById('cart-modal').classList.add('hidden');
}

function formatPKR(amount) {
  return 'PKR ' + amount.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cart-total').innerText = '';
    return;
  }
  cartItemsDiv.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-title">${item.name}</span>
      <span class="cart-item-qty">x${item.qty}</span>
      <span>${formatPKR(item.price * item.qty)}</span>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    </div>
  `).join('');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById('cart-total').innerText = `Total: ${formatPKR(total)}`;
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  renderCart();
  updateCartCount();
}

function checkoutCart() {
  if (cart.length === 0) return;
  const paymentMethod = document.getElementById('cart-payment-method')?.value || 'card';
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (paymentMethod === 'card') {
    // For demo, just show payment modal for the first item
    const firstItem = cart[0];
    closeCart();
  } else if (paymentMethod === 'cod') {
    closeCart();
    showCODConfirmation(total);
  }
}

function showCODConfirmation(total) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'cod-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeCODModal()">&times;</span>
      <h2>Order Placed!</h2>
      <div style="margin: 18px 0; font-size: 1.1rem; color: var(--brown-dark);">Your order has been placed with <b>Cash on Delivery</b>.<br>Total: ${formatPKR(total)}</div>
      <div class="success-message">Thank you for shopping with FAN O FAN!</div>
      <button class="pay-btn" onclick="closeCODModal()">Close</button>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => { modal.classList.remove('hidden'); }, 10);
}

function closeCODModal() {
  const modal = document.getElementById('cod-modal');
  if (modal) modal.remove();
}

// Product rendering
function renderProducts() {
  console.log("renderProducts function called.");
  // All
  document.getElementById('products').innerHTML = products.map(p => productCardHTML(p)).join('');
  // Premium
  document.getElementById('premium-products').innerHTML = products.filter(p => p.premium).map(p => productCardHTML(p)).join('');
  // Offers
  document.getElementById('offers-products').innerHTML = products.filter(p => p.offer).map(p => productCardHTML(p)).join('');
}

function productCardHTML(p) {
  return `
    <div class="product-card">
      <div class="fanofanfan-logo"><span>FAN O FAN</span></div>
      <img src="${p.img}" alt="${p.name}" onerror="console.error('Image failed to load: ${p.img}'); this.onerror=null;this.src='https://placehold.co/220x180?text=Fan+Image'" onload="console.log('Image loaded successfully: ${p.img}');">
      <h2>${p.name}</h2>
      <div class="desc">${p.desc}</div>
      <div class="stars">${renderStars(p.rating)} <span class="reviews">(${p.reviews} reviews)</span></div>
      <div class="price">${formatPKR(p.price)}</div>
      <button class="add-cart-btn" onclick="addToCart('${p.name.replace(/'/g, "\\'")}')">Add to Cart</button>
      <button class="buy-btn">Buy Now</button>
      <button class="details-btn" onclick="showDetails('${p.name.replace(/'/g, "\\'")}')">Details</button>
    </div>
  `;
}

// Render star rating
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars += '<span class="star">&#9733;</span>';
    } else if (i === full && half) {
      stars += '<span class="star">&#189;</span>';
    } else {
      stars += '<span class="star empty">&#9733;</span>';
    }
  }
  return stars;
}

let selectedProduct = '';
let selectedPrice = 0;

function showCategory(cat) {
  document.getElementById('all-section').style.display = cat === 'all' ? '' : 'none';
  document.getElementById('premium-section').style.display = cat === 'premium' ? '' : 'none';
  document.getElementById('offers-section').style.display = cat === 'offers' ? 'none' : 'none';
  // Highlight active button
  document.querySelectorAll('.sidebar-nav .nav-btn').forEach(btn => btn.classList.remove('active'));
  if (cat === 'all') document.querySelector('.sidebar-nav .nav-btn.all').classList.add('active');
  if (cat === 'premium') document.querySelector('.sidebar-nav .nav-btn.premium').classList.add('active');
  if (cat === 'offers') document.querySelector('.sidebar-nav .nav-btn.offers').classList.add('active');
}

// Product details modal logic
function showDetails(productName) {
  const p = products.find(prod => prod.name === productName);
  if (!p) return;
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'details-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeDetailsModal()">&times;</span>
      <img src="${p.img}" alt="${p.name}" style="width: 100%; max-width: 250px; border-radius: 12px; margin-bottom: 1rem;" onerror="this.onerror=null;this.src='https://placehold.co/250x180?text=Fan+Image'">
      <h2>${p.name}</h2>
      <div class="desc">${p.desc}</div>
      <div class="stars">${renderStars(p.rating)} <span class="reviews">(${p.reviews} reviews)</span></div>
      <div class="price">${formatPKR(p.price)}</div>
      <button class="add-cart-btn" onclick="addToCart('${p.name.replace(/'/g, "\\'")}')">Add to Cart</button>
      <button class="buy-btn">Buy Now</button>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => { modal.classList.remove('hidden'); }, 10);
}

function closeDetailsModal() {
  const modal = document.getElementById('details-modal');
  if (modal) modal.remove();
}

// On page load
renderProducts();
showCategory('all');
updateCartCount(); 