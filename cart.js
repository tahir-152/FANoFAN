// Product data (10 fans, with premium and offer flags)
const products = [
  {
    name: "Modern Ceiling Fan",
    price: 89.99,
    img: "",
    desc: "Silent, energy-efficient, and stylish for any room. Remote control included.",
    rating: 4.7,
    reviews: 124,
    premium: false,
    offer: true
  },
  {
    name: "Classic Table Fan",
    price: 39.99,
    img: "",
    desc: "Portable, powerful, and perfect for your desk or bedside.",
    rating: 4.3,
    reviews: 89,
    premium: true,
    offer: false
  },
  {
    name: "Tower Fan",
    price: 59.99,
    img: "",
    desc: "Sleek design, remote control, and multiple speed settings.",
    rating: 4.5,
    reviews: 102,
    premium: false,
    offer: true
  },
  {
    name: "Vintage Pedestal Fan",
    price: 49.99,
    img: "",
    desc: "Retro look with modern performance. Adjustable height and tilt.",
    rating: 4.2,
    reviews: 67,
    premium: false,
    offer: true
  },
  {
    name: "Smart WiFi Fan",
    price: 129.99,
    img: "",
    desc: "Control from your phone or voice assistant. Ultra-quiet operation.",
    rating: 4.8,
    reviews: 210,
    premium: true,
    offer: false
  },
  {
    name: "Mini USB Desk Fan",
    price: 19.99,
    img: "",
    desc: "Compact and portable. Perfect for office or travel.",
    rating: 4.1,
    reviews: 54,
    premium: false,
    offer: true
  },
  {
    name: "Industrial Wall Fan",
    price: 79.99,
    img: "",
    desc: "High airflow for large spaces. Durable and reliable.",
    rating: 4.4,
    reviews: 76,
    premium: false,
    offer: false
  },
  {
    name: "Bladeless Tower Fan",
    price: 149.99,
    img: "",
    desc: "Safe for kids and pets. Modern, minimalist design.",
    rating: 4.6,
    reviews: 98,
    premium: true,
    offer: false
  },
  {
    name: "Outdoor Misting Fan",
    price: 99.99,
    img: "",
    desc: "Beat the heat outdoors with a cooling mist. Weather-resistant.",
    rating: 4.3,
    reviews: 45,
    premium: false,
    offer: true
  },
  {
    name: "Luxury Chandelier Fan",
    price: 199.99,
    img: "",
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
      <span>$${(item.price * item.qty).toFixed(2)}</span>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    </div>
  `).join('');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  renderCart();
  updateCartCount();
}

function checkoutCart() {
  if (cart.length === 0) return;
  // For demo, just show payment modal for the first item
  const firstItem = cart[0];
  openPaymentModal(firstItem.name, firstItem.price * firstItem.qty);
  closeCart();
}

// Product rendering
function renderProducts() {
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
      <img src="${p.img}" alt="${p.name}">
      <h2>${p.name}</h2>
      <div class="desc">${p.desc}</div>
      <div class="stars">${renderStars(p.rating)} <span class="reviews">(${p.reviews} reviews)</span></div>
      <div class="price">$${p.price.toFixed(2)}</div>
      <button class="add-cart-btn" onclick="addToCart('${p.name.replace(/'/g, "\\'")}')">Add to Cart</button>
      <button class="buy-btn" onclick="openPaymentModal('${p.name.replace(/'/g, "\\'")}', ${p.price})">Buy Now</button>
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

function openPaymentModal(product, price) {
  selectedProduct = product;
  selectedPrice = price;
  document.getElementById('product-summary').innerText = `Product: ${product}\nTotal: $${price.toFixed(2)}`;
  document.getElementById('payment-modal').classList.remove('hidden');
  document.getElementById('payment-form').reset();
  document.getElementById('payment-success').classList.add('hidden');
  document.getElementById('payment-form').classList.remove('hidden');
}

function closePaymentModal() {
  document.getElementById('payment-modal').classList.add('hidden');
}

function handlePayment(event) {
  event.preventDefault();
  // Simulate payment processing
  setTimeout(() => {
    document.getElementById('payment-success').classList.remove('hidden');
    document.getElementById('payment-form').classList.add('hidden');
    setTimeout(() => {
      closePaymentModal();
    }, 1800);
  }, 800);
  return false;
}

// Category filtering
function showCategory(cat) {
  document.getElementById('all-section').style.display = cat === 'all' ? '' : 'none';
  document.getElementById('premium-section').style.display = cat === 'premium' ? '' : 'none';
  document.getElementById('offers-section').style.display = cat === 'offers' ? '' : 'none';
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
      <img src="${p.img}" alt="${p.name}" style="width: 100%; max-width: 250px; border-radius: 12px; margin-bottom: 1rem;">
      <h2>${p.name}</h2>
      <div class="desc">${p.desc}</div>
      <div class="stars">${renderStars(p.rating)} <span class="reviews">(${p.reviews} reviews)</span></div>
      <div class="price">$${p.price.toFixed(2)}</div>
      <button class="add-cart-btn" onclick="addToCart('${p.name.replace(/'/g, "\\'")}')">Add to Cart</button>
      <button class="buy-btn" onclick="openPaymentModal('${p.name.replace(/'/g, "\\'")}', ${p.price})">Buy Now</button>
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