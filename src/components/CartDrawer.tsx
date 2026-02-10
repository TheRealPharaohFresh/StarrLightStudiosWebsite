import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { clearCart, removeFromCart } from "../redux/cartSlice";
import styles from "../styles/CartDrawer.module.css";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const formatCurrency = (value: number) => value.toFixed(2);

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const hasItems = cart.length > 0;

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const goTo = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className={styles.root} aria-hidden={!isOpen}>
      <button
        className={styles.backdrop}
        aria-label="Close cart"
        onClick={onClose}
      />

      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <header className={styles.header}>
          <div>
            <h2 className={styles.title}>Your Cart</h2>
            <p className={styles.subtitle}>
              {hasItems ? `${cart.length} item(s)` : "No items yet"}
            </p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className={styles.content}>
          {!hasItems ? (
            <div className={styles.emptyState}>
              <p>Browse services to add your first booking.</p>
              <button
                className={styles.primaryButton}
                onClick={() => goTo("/booking")}
              >
                View Services
              </button>
            </div>
          ) : (
            <ul className={styles.list} aria-label="Cart items">
              {cart.map((item) => (
                <li key={item.id} className={styles.item}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className={styles.image}
                    loading="lazy"
                  />
                  <div className={styles.itemDetails}>
                    <div className={styles.itemTopRow}>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      <span className={styles.price}>
                        ${formatCurrency(item.price)}
                      </span>
                    </div>
                    <p className={styles.itemDescription}>{item.description}</p>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className={styles.footer}>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${formatCurrency(totalPrice)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Total</span>
            <span>${formatCurrency(totalPrice)}</span>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => dispatch(clearCart())}
              disabled={!hasItems}
            >
              Clear Cart
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => goTo("/checkout")}
              disabled={!hasItems}
            >
              Checkout
            </button>
            <button
              type="button"
              className={styles.tertiaryButton}
              onClick={() => goTo("/cart")}
              disabled={!hasItems}
            >
              View Full Cart
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
};

export default CartDrawer;
