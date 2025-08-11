import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

// Import local images
import Photo1 from '../assets/Photo1.jpg';
import Photo2 from '../assets/Photo2.jpeg';
import Photo3 from '../assets/Photo3.jpeg';
import Photo4 from '../assets/Photo4.jpg';
import Photo5 from '../assets/Photo5.jpeg';
import Photo6 from '../assets/Photo6.jpeg';
import Photo7 from '../assets/Photo7.jpg';
import Photo8 from '../assets/Photo8.jpg';
import Photo9 from '../assets/Photo9.jpg';
import Photo10 from '../assets/Photo10.jpeg';

interface Photo {
  id: number;
  src: string;
  alt?: string;
}

const photos: Photo[] = [
  { id: 1, src: Photo1, alt: 'Beautiful Mastiff Butter Ball' },
  { id: 2, src: Photo2, alt: 'Shades Of Love' },
  { id: 3, src: Photo3, alt: 'Awkward Attention' },
  { id: 4, src: Photo4, alt: 'Atlanta Kid Pharaoh' },
  { id: 5, src: Photo5, alt: 'Little Smiles' },
  { id: 6, src: Photo6, alt: 'Artist Elewa In Her Element' },
  { id: 7, src: Photo7, alt: 'Ultimate Guard Dog' },
  { id: 8, src: Photo8, alt: 'The Look Of Love' },
  { id: 9, src: Photo9, alt: 'A Moment Of Reflection' },
  { id: 10, src: Photo10, alt: 'The Power Of A Smile' }
];

const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      const newIndex = selectedPhotoIndex - 1;
      setSelectedPhoto(photos[newIndex]);
      setSelectedPhotoIndex(newIndex);
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      const newIndex = selectedPhotoIndex + 1;
      setSelectedPhoto(photos[newIndex]);
      setSelectedPhotoIndex(newIndex);
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ background: "#f5f3e7", minHeight: "100vh" }}
    >
      <div className="container">
        {/* Back Button */}
        <div className="mb-4 text-start">
          <button
            onClick={() => navigate('/home')}
            className="btn btn-lg"
            style={{
              backgroundColor: "#b497d6",
              color: "#fff",
              fontFamily: "'Playfair Display', serif",
              padding: "10px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
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
            ← Back to Home
          </button>
        </div>

        {/* Header */}
        <h2
          className="text-center mb-3"
          style={{ fontFamily: "'Playfair Display', serif", color: "#333" }}
        >
          Photo Gallery
        </h2>
        <p
          className="text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#444",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Browse through our curated gallery of moments captured with heart, artistry, and purpose.
        </p>

        {/* Image Grid */}
        <div className="row g-4">
          {photos.map((photo, index) => (
            <div key={photo.id} className="col-6 col-md-4 col-lg-3">
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "12px",
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  onClick={() => {
                    setSelectedPhoto(photo);
                    setSelectedPhotoIndex(index);
                  }}
                  style={{
                    objectFit: "cover",
                    height: "325px",
                    width: "100%",
                    borderRadius: "12px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0, 0, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0, 0, 0, 0.2)";
                  }}
                />
                <div
                  className="position-absolute bottom-0 start-0 w-100 text-white text-center py-2"
                  style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "14px",
                  }}
                >
                  {photo.alt}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && selectedPhotoIndex !== null && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex flex-column align-items-center justify-content-center"
            style={{ zIndex: 1050 }}
            onClick={() => {
              setSelectedPhoto(null);
              setSelectedPhotoIndex(null);
            }}
          >
            <div className="position-relative">
              {/* Prev Button */}
              {selectedPhotoIndex > 0 && (
                <button
                  className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
                  style={{ zIndex: 1060 }}
                  onClick={goToPrevious}
                >
                  ⬅
                </button>
              )}
              {/* Next Button */}
              {selectedPhotoIndex < photos.length - 1 && (
                <button
                  className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
                  style={{ zIndex: 1060 }}
                  onClick={goToNext}
                >
                  ➡
                </button>
              )}
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                style={{
                  maxWidth: "90vw",
                  maxHeight: "80vh",
                  borderRadius: "12px",
                  border: "6px solid #f5f3e7",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.5)",
                }}
              />
            </div>
            <p
              style={{
                color: "#f5f3e7",
                marginTop: "12px",
                fontSize: "18px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {selectedPhoto.alt} — Photo {selectedPhotoIndex + 1} of {photos.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
