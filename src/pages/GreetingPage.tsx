import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import styles from "../styles/GreetingPage.module.css"; // Adjust the path as necessary


const GreetingPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home");
        }, 8000); // Redirect after 8 seconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [navigate]);
    
    return (
        <div className={styles["page-container"]}>
            <h1 className={styles["text-flicker-in-glow"]}>Welcome To StarrLight Studios</h1>

        </div>
    )
}

export default GreetingPage;