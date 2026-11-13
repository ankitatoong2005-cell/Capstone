
import { useState } from "react";

import {
  Search,
  ShoppingBag,
  MapPin,
  Clock3,
  Star,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  X
} from "lucide-react";

import "./App.css";

import Checkout from "./pages/checkout";
const foods = [
  {
    id: 1,
    name: "Cheese Pizza",
    category: "Pizza",
    price: 249,
    rating: 4.8,
    time: "25 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
  },
  {
    id: 2,
    name: "Classic Burger",
    category: "Burger",
    price: 149,
    rating: 4.7,
    time: "20 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    id: 3,
    name: "Creamy Pasta",
    category: "Pasta",
    price: 199,
    rating: 4.9,
    time: "30 min",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600"
  },
  {
    id: 4,
    name: "French Fries",
    category: "Snacks",
    price: 99,
    rating: 4.6,
    time: "15 min",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600"
  },
  {
    id: 5,
    name: "Fresh Salad",
    category: "Healthy",
    price: 129,
    rating: 4.8,
    time: "15 min",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600"
  },
  {
    id: 6,
    name: "Chocolate Cake",
    category: "Dessert",
    price: 179,
    rating: 4.9,
    time: "20 min",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
  }
];

const categories = [
  "All", "Pizza", "Burger", "Pasta",
  "Snacks", "Healthy", "Dessert"
];

function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [flyingFood, setFlyingFood] = useState(null);

  const filteredFoods = foods.filter((food) => {
    const matchCategory =
      category === "All" || food.category === category;

    const matchSearch =
      food.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

const handleAddToCart = (food, event) => {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();

  const cartButton = document.querySelector(".cart-btn");
  const cartRect = cartButton.getBoundingClientRect();

  setFlyingFood({
    image: food.image,
    startX: rect.left,
    startY: rect.top,
    moveX: cartRect.left - rect.left,
    moveY: cartRect.top - rect.top
  });

  addToCart(food);

  setTimeout(() => {
    setFlyingFood(null);
  }, 800);
};

const addToCart = (food) => {
  setCart((previous) => {
    const existing = previous.find(
      (item) => item.id === food.id
    );

    if (existing) {
      return previous.map((item) =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...previous, { ...food, quantity: 1 }];
  });
};

const updateQuantity = (id, amount) => {
  setCart((previous) =>
    previous
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeItem = (id) => {
  setCart((previous) =>
    previous.filter((item) => item.id !== id)
  );
};

const cartCount = cart.reduce(
  (total, item) => total + item.quantity, 0
);

const subtotal = cart.reduce(
  (total, item) => total + item.price * item.quantity, 0
);

const deliveryFee = subtotal > 0 ? 30 : 0;
const grandTotal = subtotal + deliveryFee;
if (showOrderSuccess) {
  return (
    <div className="success-overlay">
      <div className="success-popup">
        <div className="success-circle">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Your order has been placed successfully.</p>
        <div className="success-message">
          Thank you for ordering with HungryHub ❤️
        </div>
        <button onClick={() => setShowOrderSuccess(false)}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
  return (
    <div className="app">

      {flyingFood && (
  <img
    src={flyingFood.image}
    className="flying-food"
    alt="Flying food"
   style={{
  left: flyingFood.startX,
  top: flyingFood.startY,
  "--move-x": `${flyingFood.moveX}px`,
  "--move-y": `${flyingFood.moveY}px`
}}
  />
)}
 
 {showCheckout && (
  <Checkout
    cart={cart}
    grandTotal={grandTotal}
  onOrderSuccess={() => {
  setCart([]);
  setShowCheckout(false);
  setShowOrderSuccess(true);
}}
  />
)}

      {/* Navbar */}
      <nav className="navbar">
        <a href="#home" className="logo">
          <span className="logo-icon">🍔</span>
          HungryHub<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-actions">
          <div className="location">
            <MapPin size={17} />
            <span>Deliver to <b>My Location</b></span>
          </div>

<button
  className={`cart-btn ${flyingFood ? "cart-bounce" : ""}`}
  onClick={() => setShowCart(true)}
>
  <ShoppingBag size={19} />
  Cart
  <span className="cart-count">{cartCount}</span>
</button>
        </div>
      </nav>
      {/* Shopping Cart */}
{showCart && (
  <div className="cart-overlay">
    <div className="cart-panel">

      <div className="cart-header">
        <div>
          <h2>My Shopping Cart 🛒</h2>
          <p>{cartCount} items in your cart</p>
        </div>

        <button
          className="close-cart"
          onClick={() => setShowCart(false)}
        >
          <X size={22} />
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <span>🛒</span>
          <h3>Your cart is empty!</h3>
          <p>Add some delicious food to get started.</p>
          <button
            className="primary-btn"
            onClick={() => setShowCart(false)}
          >
            Explore Food
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} each</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus size={14} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <b>₹{item.price * item.quantity}</b>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div>
              <span>Subtotal</span>
              <b>₹{subtotal}</b>
            </div>

            <div>
              <span>Delivery Fee</span>
              <b>₹{deliveryFee}</b>
            </div>

            <div className="grand-total">
              <span>Total Amount</span>
              <b>₹{grandTotal}</b>
            </div>

            <button
              className="checkout-btn"
             onClick={() => {
  setShowCart(false);
  setShowCheckout(true);
}}
            >
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}

    </div>
  </div>
)}

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="offer-tag">
            ✨ Delicious food, happy mood!
          </div>

          <h1>
            Good Food.
            <br />
            <span>Good Mood.</span>
          </h1>

          <p>
            Discover delicious meals delivered fresh
            to your doorstep. Your favourite food is
            just one click away!
          </p>

          <div className="hero-buttons">
            <a href="#menu" className="primary-btn">
              Order Now <ArrowRight size={18} />
            </a>
            <a href="#menu" className="secondary-btn">
              Explore Menu
            </a>
          </div>

          <div className="hero-info">
            <div>
              <Clock3 size={20} />
              <span><b>30 min</b><small>Fast Delivery</small></span>
            </div>
            <div>
              <Star size={20} fill="#f5a623" />
              <span><b>4.8/5</b><small>Customer Rating</small></span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900"
            alt="Delicious pizza"
          />
          <div className="floating-card">
            <span>🔥</span>
            <div>
              <b>Special Offer</b>
              <small>Get 20% OFF today!</small>
            </div>
          </div>
          <div className="image-label">Fresh & Delicious ❤️</div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div>
            <span className="sub-heading">OUR MENU</span>
            <h2>Explore Our <span>Delicious Food</span></h2>
            <p>Choose your favourite meal and enjoy every bite.</p>
          </div>
        </div>

        {/* Search */}
        <div className="menu-controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search your favourite food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Food Cards */}
        <div className="food-grid">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <div className="food-card" key={food.id}>
                <div className="food-image">
                  <img src={food.image} alt={food.name} />
                  <span className="food-rating">
                    <Star size={14} fill="#f5a623" />
                    {food.rating}
                  </span>
                </div>

                <div className="food-details">
                  <span className="food-category">
                    {food.category}
                  </span>
                  <h3>{food.name}</h3>

                  <div className="food-meta">
                    <span><Clock3 size={14} /> {food.time}</span>
                    <b>₹{food.price}</b>
                  </div>

                  <button
  className="add-btn"
  onClick={(event) => handleAddToCart(food, event)}
>
  <Plus size={17} /> Add to Cart
</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-food">No food found. Try another search!</p>
          )}
        </div>
      </section>

{/* Special Offers */}
<section className="offer-section">
  <div className="offer-content">
    <span>🎉 LIMITED TIME OFFER</span>
    <h2>Hungry? Get 20% OFF!</h2>
    <p>
      Enjoy your favourite meals with amazing discounts.
      Order today and make your day delicious!
    </p>
    <a href="#menu" className="primary-btn">
      Order Now <ArrowRight size={18} />
    </a>
  </div>

  <div className="offer-emoji">🍕🍔🍟</div>
</section>

{/* Customer Reviews */}
<section className="reviews-section" id="about">
  <div className="reviews-heading">
    <span className="sub-heading">CUSTOMER FEEDBACK</span>
    <h2>What Our Customers <span>Say</span></h2>
    <p>Real happiness comes from great food and great service.</p>
  </div>

  <div className="review-grid">
    <div className="review-card">
      <div className="stars">★★★★★</div>
      <p>
        "Amazing food quality! The pizza was fresh and
        delivered on time. Highly recommended!"
      </p>
      <div className="review-user">
        <div className="user-avatar">R</div>
        <div>
          <h4>Rahul Sharma</h4>
          <small>Happy Customer</small>
        </div>
      </div>
    </div>

    <div className="review-card">
      <div className="stars">★★★★★</div>
      <p>
        "I really love the burger and pasta. The website
        is easy to use and ordering is simple."
      </p>
      <div className="review-user">
        <div className="user-avatar">P</div>
        <div>
          <h4>Priya Das</h4>
          <small>Happy Customer</small>
        </div>
      </div>
    </div>

    <div className="review-card">
      <div className="stars">★★★★★</div>
      <p>
        "Great experience! Delicious meals, affordable
        prices and quick delivery. Loved it!"
      </p>
      <div className="review-user">
        <div className="user-avatar">A</div>
        <div>
          <h4>Arjun Roy</h4>
          <small>Happy Customer</small>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <a href="#home" className="logo">
          🍔 HungryHub<span>.</span>
        </a>
        <p>Made with ❤️ for food lovers.</p>
        <small>© 2026 HungryHub. All Rights Reserved.</small>
      </footer>

    </div>
  );
}

export default App;
