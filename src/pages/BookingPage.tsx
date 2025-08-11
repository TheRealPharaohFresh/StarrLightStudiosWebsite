import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BookingCard from '../components/BookingCards';
import { services } from '../services/bookingServices';
import styles from '../styles/BookingPage.module.css';

const BookingPage: React.FC = () => {
  const hasServices = services && services.length > 0;

  return (
    <main className={styles.body}>
      <Container className="py-5">
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Book Your Session</h1>
          <p className={styles.subtitle}>
            Select the service that best suits your needs and reserve your spot today.
          </p>
        </header>

        {hasServices ? (
          <Row className="g-4">
            {services.map((service) => (
              <Col key={service.id} md={6} lg={3}>
                <BookingCard
                  {...{ ...service, id: String(service.id) }}
                  price={service.price ?? 0}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <p className={styles.emptyMessage} role="status">
            No services available at the moment. Please check back later.
          </p>
        )}
      </Container>
    </main>
  );
};

export default BookingPage;


  