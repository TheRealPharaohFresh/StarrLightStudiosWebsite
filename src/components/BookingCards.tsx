import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styles from '../styles/BookingCard.module.css';
import { addToCart } from '../redux/cartSlice';
import { openCartDrawer } from '../utils/cartDrawerEvents';

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
        openCartDrawer();
    }; // Added closing brace

    return (
        <Card className={styles.card}>
            <Card.Img className={styles.cardImage} variant="top" src={imageUrl} alt={title} />
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>{title}</Card.Title>

                <ol className={styles.descriptionList} aria-label="Package details">
                    {description
                        .split('. ')
                        .filter((sentence) => sentence.trim() !== '')
                        .map((sentence, index) => (
                            <li key={index} className={styles.descriptionItem}>
                                {sentence.trim()}
                            </li>
                        ))}
                </ol>

                <div className={styles.cardFooter}>
                    <Card.Text className={styles.priceText}>
                        ${price.toFixed(2)}
                    </Card.Text>
                    <Button
                        className={styles.addButton}
                        variant="primary"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default BookingCard;
