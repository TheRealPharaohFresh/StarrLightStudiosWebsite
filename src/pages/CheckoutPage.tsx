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
  const hasItems = bookings.length > 0;
  const formatCurrency = (value: number) => value.toFixed(2);

  // ✅ Add state for form fields
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleConfirmBooking = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!hasItems) {
      setSubmitError("Your cart is empty. Please add a booking before checking out.");
      return;
    }
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to confirm a booking.");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

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

    try {
      await createOrder(user.uid, orderData);
      dispatch(clearCart());
      alert("Booking confirmed!");
      navigate("/");
    } catch (error) {
      console.error("Failed to create order", error);
      setSubmitError("We could not confirm your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Checkout</h1>
        <p>Review your bookings and confirm your order.</p>
      </header>

      {!hasItems ? (
        <div className={styles.emptyState}>
          <p>Your cart is empty. Add a booking to continue.</p>
          <button className={styles.primaryButton} onClick={() => navigate("/booking")}>
            Back to Services
          </button>
        </div>
      ) : (
        <>
          <h2 className={styles.sectionTitle}>Your Bookings</h2>
          <ul className={styles.list} aria-label="Bookings">
            {bookings.map((booking) => (
              <li key={booking.id} className={styles.item}>
                <img src={booking.imageUrl} alt={booking.title} className={styles.image} />
                <div className={styles.itemDetails}>
                  <h3>{booking.title}</h3>
                  <p>${formatCurrency(booking.price)}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.totalRow}>
            <span>Total</span>
            <span>${formatCurrency(totalPrice)}</span>
          </div>
        </>
      )}

      {hasItems && (
        <form className={styles.form} onSubmit={handleConfirmBooking}>
          <label>
            Full Name
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
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
              autoComplete="street-address"
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
              autoComplete="address-level2"
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
              autoComplete="address-level1"
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
              autoComplete="postal-code"
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
              autoComplete="tel"
              required
            />
          </label>
          {submitError && (
            <p className={styles.error} role="alert">
              {submitError}
            </p>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Confirming..." : "Confirm Booking"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;

