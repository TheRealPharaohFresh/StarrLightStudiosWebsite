import StarrLightStudiosLogo from "../assets/StarrLightStudiosLogo.png";
import styles from "../styles/NavBar.module.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCurrentUser } from "./DisplayData";
import { selectCartItemsCount } from "../redux/cartSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const NavBar: React.FC = () => {
  const cartItemsCount = useSelector((state: RootState) => selectCartItemsCount(state));
  const navigate = useNavigate();
  const user = useCurrentUser();

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src={StarrLightStudiosLogo}
            alt="StarrLight Studios Logo"
            className={styles.logo}
          />
          <span className={styles.brandName}>StarrLight Studios</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <button
              className={`nav-link active ${styles.navLink}`}
              onClick={() => navigate("/home")}
            >
              Home
            </button>
            <button
              className={`nav-link ${styles.navLink}`}
              onClick={() => navigate("/booking")}
            >
              Booking
            </button>
            <button
              className={`nav-link ${styles.navLink}`}
              onClick={() => navigate("/gallery")}
            >
              Gallery
            </button>
            <button
              className={`nav-link ${styles.navLink}`}
              onClick={() => navigate("/login")}
              >
              Login
              </button>
              <button
                className={`nav-link ${styles.navLink}`}
                onClick={() => navigate("/cart")}
              >
                Cart ({cartItemsCount})
              </button>
          </div>
        </div>
              {user && <span className={styles.welcomeMessage}>Welcome, {user.name}</span>}
      </div>
    </nav>
  );
};

export default NavBar;

