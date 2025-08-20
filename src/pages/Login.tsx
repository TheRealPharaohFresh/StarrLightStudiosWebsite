import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setDoc,doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { createUserIfNotExists } from "../utils/createUserIfNotExist";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(""); // Assuming you want to capture the user's name as well

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await createUserIfNotExists(firebaseUser);
      await fetchUserData(firebaseUser.uid);

      alert("Login successful!");
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Create the user document if it doesn't exist
        await setDoc(userDocRef, {
          name: name, // <-- store the full name here
          email: email
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.container}>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={styles.buttonRow}>
            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.formFooter}>
            <span>Forgot your password? </span>
            <a href="/reset">Reset it</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

