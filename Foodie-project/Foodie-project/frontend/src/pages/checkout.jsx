
import React, { useState } from "react";
import "./Checkout.css";

function Checkout({ cart, grandTotal, onOrderSuccess }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

const handleOrder = async (e) => {
  e.preventDefault();

const orderData = {
  customerName: name,
  mobile: mobile,
  address: address,
  payment: payment,
  foodItems: cart,
  totalAmount: grandTotal
};

  try {
    const response = await fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error("Order failed");
    }

 const result = await response.json();

onOrderSuccess();
console.log(result);

  } catch (error) {
    alert("Order failed! Please try again.");
    console.error(error);
  }
};

  return (
    <div className="checkout-page">

      <div className="checkout-card">
        <h1>Complete Your Order 🛒</h1>
        <p>Please enter your delivery details.</p>

        <form onSubmit={handleOrder}>
          <label>Customer Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            pattern="[0-9]{10}"
            maxLength="10"
            required
          />

          <label>Delivery Address</label>
          <textarea
            placeholder="Enter your full address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label>Payment Method</label>
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option>Cash on Delivery</option>
          </select>

          <button type="submit">
            Place Order →
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
