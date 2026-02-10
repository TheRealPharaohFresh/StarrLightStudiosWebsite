import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import styles from "../styles/ShoppingCartPage.module.css";
import { useNavigate } from "react-router-dom";

const ShoppingCart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItemsCount = cart.length;
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const hasItems = cartItemsCount > 0;
  const formatCurrency = (value: number) => value.toFixed(2);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Shopping Cart</h1>
        <p>{hasItems ? `${cartItemsCount} item(s) in your cart` : "Your cart is empty"}</p>
      </header>

      {!hasItems ? (
        <div className={styles.emptyState}>
          <p>Browse our services to add your first booking.</p>
          <button className={styles.primaryButton} onClick={() => navigate("/booking")}>
            View Services
          </button>
        </div>
      ) : (
        <div className={styles.layout}>
          <ul className={styles.list} aria-label="Cart items">
            {cart.map((item) => (
              <li key={item.id} className={styles.item}>
                <img src={item.imageUrl} alt={item.title} className={styles.image} />
                <div className={styles.itemDetails}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className={styles.price}>${formatCurrency(item.price)}</p>
                  <button
                    className={styles.removeButton}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className={styles.summary}>
            <h2>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${formatCurrency(totalPrice)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Total</span>
              <span>${formatCurrency(totalPrice)}</span>
            </div>
            <div className={styles.actions}>
              <button className={styles.secondaryButton} onClick={() => dispatch(clearCart())}>
                Clear Cart
              </button>
              <button className={styles.primaryButton} onClick={() => navigate("/checkout")}>
                Checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

