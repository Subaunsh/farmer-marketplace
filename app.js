
const crops = [
  {
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 30,
    unit: "kg",
    farmer: "Ramesh Patil",
    location: "Nashik, Maharashtra",
    emoji: "🍅"
  },
  {
    name: "Organic Potatoes",
    category: "Vegetables",
    price: 25,
    unit: "kg",
    farmer: "Suresh More",
    location: "Pune, Maharashtra",
    emoji: "🥔"
  },
  {
    name: "Sweet Mangoes",
    category: "Fruits",
    price: 80,
    unit: "kg",
    farmer: "Anita Deshmukh",
    location: "Ratnagiri, Maharashtra",
    emoji: "🥭"
  },
  {
    name: "Fresh Bananas",
    category: "Fruits",
    price: 40,
    unit: "dozen",
    farmer: "Vijay Shinde",
    location: "Jalgaon, Maharashtra",
    emoji: "🍌"
  },
  {
    name: "Premium Rice",
    category: "Grains",
    price: 55,
    unit: "kg",
    farmer: "Sunil Jadhav",
    location: "Kolhapur, Maharashtra",
    emoji: "🌾"
  },
  {
    name: "Whole Wheat",
    category: "Grains",
    price: 35,
    unit: "kg",
    farmer: "Mahesh Pawar",
    location: "Ahmednagar, Maharashtra",
    emoji: "🌿"
  }
];

const productsElement = document.getElementById("products");
const searchElement = document.getElementById("search");
const categoryElement = document.getElementById("category");
const resultsMessage = document.getElementById("results-message");
const cartCount = document.getElementById("cart-count");

const basket = new Map();

function renderCrops() {
  const searchTerm = searchElement.value.trim().toLowerCase();
  const category = categoryElement.value;

  const filtered = crops
    .map((crop, index) => ({ ...crop, index }))
    .filter(crop => {
      const matchesSearch =
        crop.name.toLowerCase().includes(searchTerm) ||
        crop.farmer.toLowerCase().includes(searchTerm) ||
        crop.location.toLowerCase().includes(searchTerm);

      const matchesCategory =
        category === "All" || crop.category === category;

      return matchesSearch && matchesCategory;
    });

  resultsMessage.textContent =
    `${filtered.length} crop listing(s) found.`;

  productsElement.innerHTML = filtered.map(crop => `
    <article class="product-card">
      <div class="crop-art" aria-hidden="true">${crop.emoji}</div>
      <p class="eyebrow">${crop.category}</p>
      <h3>${crop.name}</h3>
      <p class="farmer">👨‍🌾 ${crop.farmer}</p>
      <p class="farmer">📍 ${crop.location}</p>
      <p class="price">₹${crop.price} / ${crop.unit}</p>
      <button class="add-btn" data-index="${crop.index}">
        Add to Basket
      </button>
    </article>
  `).join("");

  productsElement.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      basket.set(index, (basket.get(index) || 0) + 1);
      updateBasket();
    });
  });
}

function updateBasket() {
  let count = 0;
  let total = 0;

  basket.forEach((quantity, index) => {
    count += quantity;
    total += quantity * crops[index].price;
  });

  cartCount.textContent = count;
  cartCount.title = `Basket total: ₹${total}`;
  cartCount.setAttribute(
    "aria-label",
    `${count} items, total ₹${total}`
  );
}

searchElement.addEventListener("input", renderCrops);
categoryElement.addEventListener("change", renderCrops);

renderCrops();
updateBasket();
