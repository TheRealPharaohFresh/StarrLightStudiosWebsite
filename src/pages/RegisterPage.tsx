// RegisterPage.tsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Register.module.css"; // import your CSS here

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      await setDoc(doc(db, "users", uid), {
        name,
        email,
        uid,
        orders: [],
      });

      navigate("/booking");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed. Check console for details.");
    }
  };

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.container}>
        <h2>Member Registration</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email address"
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
            <button type="submit" className={styles.button}>Register</button>
            <button
              type="button"
              className={styles.button}
              onClick={() => navigate("/")}
            >
              Im Just A Guest
            </button>
          </div>
        </form>
        <div className={styles.form}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;


