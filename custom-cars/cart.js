const cartContainer = document.querySelector('.cart-items');
const emptyState = document.querySelector('.empty-state');
const itemCount = document.querySelector('.item-count');
const totalPrice = document.querySelector('.total-price');
const clearBtn = document.querySelector('.clear-cart');
const deliveryFee = 500;
const form = document.querySelector('.payment-form');
const paymentMessage = document.querySelector('.payment-message');
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const getCart = () => JSON.parse(localStorage.getItem('customCarsCart') || '[]');
const saveCart = (cart) => localStorage.setItem('customCarsCart', JSON.stringify(cart));

const updateSummary = (cart) => {
  const items = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = items > 0 ? subtotal + deliveryFee : 0;

  itemCount.textContent = `${items} item${items === 1 ? '' : 's'}`;
  totalPrice.textContent = formatter.format(finalTotal);
};

const renderCart = () => {
  const cart = getCart();
  cartContainer.innerHTML = '';

  if (!cart.length) {
    emptyState.style.display = 'block';
    updateSummary(cart);
    return;
  }

  emptyState.style.display = 'none';

  cart.forEach((item) => {
    const row = document.createElement('article');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.brand} ${item.name}" />
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p class="brand">${item.brand}</p>
        <p>${formatter.format(item.price)} each</p>
        <p class="car-spec">Top speed: ${item.speed || 'Premium performance'}</p>
      </div>
      <div class="quantity-box">
        <button class="qty-btn decrease">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn increase">+</button>
      </div>
      <div class="line-price">${formatter.format(item.price * item.quantity)}</div>
      <button class="remove-btn">Remove</button>
    `;

    row.querySelector('.increase').addEventListener('click', () => {
      item.quantity += 1;
      saveCart(cart);
      renderCart();
    });

    row.querySelector('.decrease').addEventListener('click', () => {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        const nextCart = cart.filter((cartItem) => cartItem.id !== item.id);
        saveCart(nextCart);
      } else {
        saveCart(cart);
      }
      renderCart();
    });

    row.querySelector('.remove-btn').addEventListener('click', () => {
      const nextCart = cart.filter((cartItem) => cartItem.id !== item.id);
      saveCart(nextCart);
      renderCart();
    });

    cartContainer.appendChild(row);
  });

  updateSummary(cart);
};

clearBtn.addEventListener('click', () => {
  saveCart([]);
  renderCart();
  paymentMessage.textContent = '';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const cart = getCart();

  if (!cart.length) {
    paymentMessage.textContent = 'Please add at least one car before payment.';
    paymentMessage.classList.add('error');
    return;
  }

  paymentMessage.textContent = 'Payment completed successfully. Your order has been placed.';
  paymentMessage.classList.remove('error');
  form.reset();
  saveCart([]);
  renderCart();
});

renderCart();
