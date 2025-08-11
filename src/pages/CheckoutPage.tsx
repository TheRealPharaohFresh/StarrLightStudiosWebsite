import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { createOrder } from "../services/orderServices";
import type { RootState } from "../redux/store";
import styles from '../styles/CheckoutPage.module.css';// Assuming you saved the CSS as a module

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector((state: RootState) => state.cart.items);

  const totalPrice = bookings.reduce((total, booking) => total + booking.price, 0);

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
          <input type="text" placeholder="Enter your full name" required />
        </label>
        <label>
          Address
          <input type="text" placeholder="Enter your address" required />
        </label>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
