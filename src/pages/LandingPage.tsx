// src/components/LandingPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import leila from "../assets/photos/leila.jpg";
import neko from "../assets/photos/neko.jpg";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(true);

  const handleBookMeClick = () => {
    navigate("/booking");
  };

  const handleGalleryClick = () => {
    navigate("/gallery");
  };

  const handleCloseToast = () => {
    setShowToast(false);
  }

  const handleRegisterClick = () => {

    navigate("/register");

  }
  useEffect(() => {
    // Set a timer to hide the toast after 15 seconds (15000ms)
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, [showToast]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
  };

  return (
    <div>
      {/* Toast Notification Centered */}
      {showToast && (
        <div
          className="toast-container position-fixed top-50  p-3"
          style={{ zIndex: 9999 }}
        >
          <div
            className="toast fade show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body">
              Would You Like To Register With Us?
              <div className="mt-2 pt-2 border-top">
                <button type="button" className="btn btn-primary btn-sm"
                onClick={handleRegisterClick}
                >
                  Register
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleCloseToast}
                >
                  No Thank You!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* First Section */}
      <div className="row g-0">
        <div className="col-sm-6 col-md-8">
          <div
            style={{
              padding: "20px",
              background: "linear-gradient(to right, #f5f3e7, #b497d6)",
              height: "400px",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              About Starr Light Studios
            </h1>
            <p style={{ fontFamily: "'Playfair Display', serif" }}>
              Nastassja Colbert’s fascination with photography and film began at
              the age of 13, driven by a passion for storytelling through the
              lens. Over the years, she refined her craft, blending an eye for
              composition with a deep appreciation for human connection. In 2018,
              Nastassja founded Starr Light Studios, channeling her creative
              vision into capturing life’s most captivating moments.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif" }}>
              Through Starr Light Studios, Nastassja offers more than just
              photographs—she creates timeless narratives. Each image reflects
              her unwavering commitment to authenticity, artistry, and technical
              excellence. She believes photography isn’t just about preserving
              memories; it’s about capturing the magic in every frame—the
              fleeting light, the hidden emotions, and the subtle moments often
              missed by the naked eye.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif" }}>
              For Nastassja, the camera is a tool for connection and discovery.
              Every session is an invitation to explore the beauty and wonder of
              the world, one click at a time. Her mission is simple yet profound:
              to reveal the light within every story, crafting images that
              resonate long after the shutter closes.
            </p>
          </div>
        </div>

        <div className="col-6 col-md-4 p-0">
          <img
            className="img-fluid w-100 h-100"
            src={leila}
            alt="Leila"
            style={{
              maxHeight: "400px",
              objectFit: "cover",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              borderRadius: "2px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="container-fluid py-5" style={{ background: "#f5f3e7" }}>
        <h2
          className="text-center mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Explore Our Work
        </h2>
        <p
          className="text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Discover the artistry and passion behind every photograph. From
          weddings to portraits, our work captures the essence of life’s most
          cherished moments.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              outline: "none",
              border: "none",
              backgroundColor: "transparent",
              padding: "0",
              transition: "transform 0.2s, box-shadow 0.2s",
              borderRadius: "8px",
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
            <a
              href="/gallery"
              className="btn btn-lg"
              style={{
                backgroundColor: "#b497d6",
                color: "#fff",
                fontFamily: "'Playfair Display', serif",
              }}
              onClick={handleGalleryClick}
            >
              Explore Gallery
            </a>
          </button>
        </div>
      </div>

      {/* New Section */}
      <div
        className="container-fluid py-5"
        style={{
          background: "linear-gradient(to bottom, #f5f3e7, #b497d6)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          {/* Text Section */}
          <div style={{ flex: 1, padding: "20px" }}>
            <h2
              className="text-center"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Our Mission
            </h2>
            <p
              className="text-center"
              style={{
                fontFamily: "'Playfair Display', serif",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              At Starr Light Studios, our mission is to capture the essence of
              every story and preserve it in timeless frames that radiate power
              and authenticity. We believe that photography is not just an art
              — it’s a force that can transform lives. By blending our innate
              talent with a deep respect for family and community, we create
              images that inspire connection and celebrate the moments that
              matter most. We are committed to using our lens as a bridge
              between generations, turning fleeting moments into lifelong
              memories, and empowering every client to see their own unique
              light shine brightly.
            </p>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                className="btn btn-lg"
                style={{
                  background: "#f5f3e7",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.1)",
                  border: "none",
                  cursor: "pointer",
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
                onClick={handleBookMeClick}
              >
                Book Us
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
            <img
              src={neko}
              alt="cat"
              style={{
                width: "100%",
                height: "auto",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;







