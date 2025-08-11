import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styles from '../styles/BookingCard.module.css';
import { addToCart } from '../redux/cartSlice';

interface BookingCardProps {
    id: string; // Changed from number to string
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

const BookingCard: React.FC<BookingCardProps> = ({ id, title, description, price, imageUrl }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ id , title, description, price, imageUrl }));
    }; // Added closing brace

    return (
        <Card
            className={styles["custom-card"]}
            style={{ height: "1000px", transition: "all 0.3s ease-in-out" }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.1)";
            }}
        >
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <div style={{ fontSize: "15px", fontFamily: "'Libre Baskerville', serif" }}>
                    <ol>
                        {description
                            .split('. ')
                            .filter((sentence) => sentence.trim() !== '')
                            .map((sentence, index) => (
                                <li key={index}>{sentence.trim()}</li>
                            ))}
                    </ol>
                </div>
                <Card.Text>Price: ${price.toFixed(2)}</Card.Text>
                <Button className={styles["btn-lavender"]} variant="primary" onClick={handleAddToCart}>
                Add to Cart 🛒
                </Button>
            </Card.Body>
        </Card>
    );
};

export default BookingCard;
