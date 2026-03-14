const cars = [
  {
    id: 1,
    brand: 'Lamborghini',
    name: 'Revuelto',
    price: 285000,
    image: './assets/images/revuelto.webp',
    description: 'Flagship hybrid supercar with futuristic styling, V12 power, and an advanced digital cockpit.',
    speed: '350 km/h',
    fuel: 'Hybrid V12',
  },
  {
    id: 2,
    brand: 'Lamborghini',
    name: 'Temerario',
    price: 248000,
    image: './assets/images/temerario.webp',
    description: 'Aggressive performance coupe designed for sharp acceleration, premium comfort, and road presence.',
    speed: '343 km/h',
    fuel: 'Twin Turbo Hybrid',
  },
  {
    id: 3,
    brand: 'Audi',
    name: 'R8 Performance',
    price: 182000,
    image: './assets/images/audi1.jpg',
    description: 'A high-performance sports car that mixes everyday comfort with powerful track-inspired engineering.',
    speed: '331 km/h',
    fuel: '5.2L V10',
  },
  {
    id: 4,
    brand: 'BMW',
    name: 'M4 Competition',
    price: 96000,
    image: './assets/images/bmw1.jpg',
    description: 'Luxury sport coupe with muscular styling, strong performance, and a rich technology package.',
    speed: '290 km/h',
    fuel: '3.0L Twin Turbo',
  },
  {
    id: 5,
    brand: 'Mercedes-Benz',
    name: 'AMG GT',
    price: 171000,
    image: './assets/images/benz1.jpg',
    description: 'Elegant grand tourer with bold power delivery, refined suspension, and a premium luxury cabin.',
    speed: '315 km/h',
    fuel: '4.0L V8',
  },
  {
    id: 6,
    brand: 'Bentley',
    name: 'Continental GT',
    price: 245000,
    image: './assets/images/bentley1.jpg',
    description: 'Premium coupe built for smooth highway comfort, beautiful interiors, and effortless performance.',
    speed: '333 km/h',
    fuel: '4.0L V8',
  },
  {
    id: 7,
    brand: 'Ferrari',
    name: '296 GTB',
    price: 322000,
    image: './assets/images/fer2.jpg',
    description: 'Exotic Italian supercar offering dramatic styling, precise response, and thrilling hybrid performance.',
    speed: '330 km/h',
    fuel: 'Hybrid V6',
  },
  {
    id: 8,
    brand: 'Ferrari',
    name: 'SF90 Stradale',
    price: 524000,
    image: './assets/images/fer3.jpg',
    description: 'A flagship Ferrari with extreme speed, race-inspired aerodynamics, and cutting-edge technology.',
    speed: '340 km/h',
    fuel: 'Hybrid V8',
  },
  {
    id: 9,
    brand: 'Ferrari',
    name: 'Roma',
    price: 247000,
    image: './assets/images/fer4.jpg',
    description: 'Stylish grand tourer that blends elegant luxury with modern Ferrari performance and comfort.',
    speed: '320 km/h',
    fuel: '3.9L Twin Turbo',
  },
  {
    id: 10,
    brand: 'Lamborghini',
    name: 'Huracan EVO',
    price: 261000,
    image: './assets/images/lam3.jpg',
    description: 'Sharp V10 supercar with vivid design, race-inspired handling, and an exciting driver-focused cockpit.',
    speed: '325 km/h',
    fuel: '5.2L V10',
  },
  {
    id: 11,
    brand: 'Lamborghini',
    name: 'Urus',
    price: 238000,
    image: './assets/images/lam4.jpg',
    description: 'Luxury performance SUV with supercar attitude, strong practicality, and everyday comfort.',
    speed: '305 km/h',
    fuel: '4.0L Twin Turbo',
  },
  {
    id: 12,
    brand: 'Land Rover',
    name: 'Range Rover',
    price: 156000,
    image: './assets/images/rr1.jpg',
    description: 'Premium SUV with commanding road presence, a smooth ride, and a very upscale interior experience.',
    speed: '250 km/h',
    fuel: '3.0L Diesel / Petrol',
  }
];

const products = document.querySelector('.products');
const count = document.querySelector('.product-count');
const totalCars = document.getElementById('totalCars');
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const getCart = () => JSON.parse(localStorage.getItem('customCarsCart') || '[]');
const saveCart = (cart) => localStorage.setItem('customCarsCart', JSON.stringify(cart));

const addToCart = (car) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === car.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...car, quantity: 1 });
  }

  saveCart(cart);
};

cars.forEach((car) => {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-image-wrap">
      <img class="product-image" src="${car.image}" alt="${car.brand} ${car.name}" />
      <span class="badge">${car.brand}</span>
    </div>
    <div class="product-details">
      <div class="title-row">
        <div>
          <h3>${car.name}</h3>
          <p class="brand-name">${car.brand}</p>
        </div>
        <p class="price">${formatter.format(car.price)}</p>
      </div>
      <p class="description">${car.description}</p>
      <div class="specs">
        <span>Top Speed: ${car.speed}</span>
        <span>Engine: ${car.fuel}</span>
      </div>
      <div class="product-actions">
        <button class="add-btn">Add to Cart</button>
        <a class="details-btn" href="cart.html">Buy Now</a>
      </div>
    </div>
  `;

  const addBtn = card.querySelector('.add-btn');
  addBtn.addEventListener('click', () => {
    addToCart(car);
    addBtn.textContent = 'Added to Cart';
    addBtn.classList.add('added');

    setTimeout(() => {
      addBtn.textContent = 'Add to Cart';
      addBtn.classList.remove('added');
    }, 1200);
  });

  products.appendChild(card);
});

if (count) {
  count.textContent = `${cars.length} premium cars are ready for you.`;
}

if (totalCars) {
  totalCars.textContent = cars.length;
}
