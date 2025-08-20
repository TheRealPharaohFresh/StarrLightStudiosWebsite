import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { createOrder } from "../services/orderServices";
import type { RootState } from "../redux/store";
import styles from '../styles/CheckoutPage.module.css';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector((state: RootState) => state.cart.items);
  const totalPrice = bookings.reduce((total, booking) => total + booking.price, 0);

  // ✅ Add state for form fields
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleConfirmBooking = async (event: React.FormEvent) => {
    event.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to confirm a booking.");
      navigate("/login");
      return;
    }

    const orderData = {
      userId: user.uid,
      bookings: bookings.map((booking) => ({
        id: booking.id,
        title: booking.title,
        description: booking.description,
        price: booking.price,
      })),
      totalPrice,
      fullName,
      address,
      city,
      stateProvince,
      postalCode,
      phoneNumber,
    };

    await createOrder(user.uid, orderData);
    dispatch(clearCart());
    alert("Booking confirmed!");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>
      <p>Review your bookings and confirm your order.</p>

      <h3>Your Bookings</h3>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <img src={booking.imageUrl} alt={booking.title} className={styles.image} />
            <div>
              <h3>{booking.title}</h3>
              <p>${booking.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

      <form className={styles.form} onSubmit={handleConfirmBooking}>
        <label>
          Full Name
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label>
          Address
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State/Province
          <input
            type="text"
            placeholder="State/Province"
            value={stateProvince}
            onChange={(e) => setStateProvince(e.target.value)}
            required
          />
        </label>
        <label>
          Postal Code
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default CheckoutPage;

