import { useState, useEffect } from "react";
import berriesImg from "../assets/carousel_berries.png";
import saladImg from "../assets/carousel_salad.png";
import smoothieImg from "../assets/carousel_smoothie.png";

const slides = [
  {
    image: berriesImg,
    quote: "Let food be the medicine and medicine be the food.",
    author: "Hippocrates",
    category: "Nutrition"
  },
  {
    image: saladImg,
    quote: "To eat is a necessity, but to eat intelligently is an art.",
    author: "François de La Rochefoucauld",
    category: "Mindful Eating"
  },
  {
    image: smoothieImg,
    quote: "It is health that is real wealth and not pieces of gold and silver.",
    author: "Mahatma Gandhi",
    category: "Vitality"
  }
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000); // 6 seconds for comfortable reading

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setIsTransitioning(false);
    }, 400);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 400);
  };

  const setSlide = (index) => {
    if (index === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div style={containerStyle}>
      {/* Background Image Layer with Blend Gradients */}
      <div
        style={{
          ...backgroundImageStyle,
          backgroundImage: `url(${slides[currentIndex].image})`,
          opacity: isTransitioning ? 0 : 0.8,
          transition: "opacity 0.4s ease-in-out"
        }}
      />
      {/* Horizontal & Vertical Blending Overlays */}
      <div style={leftOverlayStyle} />
      <div style={rightOverlayStyle} />
      <div style={bottomOverlayStyle} />
      <div style={topOverlayStyle} />

      {/* Main Content Area - Left-aligned Editorial Layout */}
      {/* React key={currentIndex} forces re-render on slide change, triggering animations */}
      <div key={currentIndex} style={contentContainerStyle}>
        <div style={editorialColStyle}>
          <div style={badgeContainerStyle}>
            <span style={badgeDotStyle} />
            <span style={badgeTextStyle}>{slides[currentIndex].category}</span>
          </div>

          <div style={quoteWrapperStyle}>
            <span style={largeQuoteMarkStyle}>“</span>
            <blockquote style={quoteStyle}>
              {slides[currentIndex].quote}
            </blockquote>
          </div>

          <div style={dividerStyle} />

          <cite style={authorStyle}>
            {slides[currentIndex].author}
          </cite>
        </div>
      </div>

      {/* Premium Sleek Arrow Controls */}
      <button onClick={handlePrev} style={leftArrowStyle} aria-label="Previous slide" className="carousel-nav-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "20px", height: "20px" }}>
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button onClick={handleNext} style={rightArrowStyle} aria-label="Next slide" className="carousel-nav-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "20px", height: "20px" }}>
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Dot Indicators */}
      <div style={dotsContainerStyle}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            style={{
              ...dotStyle,
              backgroundColor: index === currentIndex ? "#10b981" : "rgba(255, 255, 255, 0.2)",
              width: index === currentIndex ? "28px" : "8px",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Embedded CSS for animations and hover effects */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .carousel-nav-btn:hover {
          background: rgba(16, 185, 129, 0.15) !important;
          border-color: rgba(16, 185, 129, 0.4) !important;
          color: #10b981 !important;
          transform: translateY(-50%) scale(1.08) !important;
        }
        .carousel-nav-btn:active {
          transform: translateY(-50%) scale(0.95) !important;
        }
      `}</style>
    </div>
  );
}

// Styles
const containerStyle = {
  position: "relative",
  width: "100%",
  height: "520px",
  backgroundColor: "#060907",
  overflow: "hidden",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
};

const backgroundImageStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "60%", // Image takes right side of the screen
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: 1,
  maskImage: "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
  WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
};

// Blending Gradients to blend image natively into background
const leftOverlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "50%",
  height: "100%",
  background: "linear-gradient(to right, #060907 80%, rgba(6, 9, 7, 0) 100%)",
  zIndex: 2,
};

const rightOverlayStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "15%",
  height: "100%",
  background: "linear-gradient(to left, #060907 0%, rgba(6, 9, 7, 0) 100%)",
  zIndex: 2,
};

const bottomOverlayStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "30%",
  background: "linear-gradient(to top, #060907 0%, rgba(6, 9, 7, 0) 100%)",
  zIndex: 2,
};

const topOverlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "20%",
  background: "linear-gradient(to bottom, #060907 0%, rgba(6, 9, 7, 0) 100%)",
  zIndex: 2,
};

// Content Container
const contentContainerStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  padding: "0 8% 0 10%",
  boxSizing: "border-box",
};

const editorialColStyle = {
  maxWidth: "540px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
};

// Category Badge
const badgeContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "rgba(16, 185, 129, 0.1)",
  border: "1px solid rgba(16, 185, 129, 0.2)",
  padding: "6px 14px",
  borderRadius: "99px",
  marginBottom: "24px",
};

const badgeDotStyle = {
  width: "6px",
  height: "6px",
  backgroundColor: "#10b981",
  borderRadius: "50%",
  display: "inline-block",
};

const badgeTextStyle = {
  color: "#34d399",
  fontSize: "0.78rem",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

// Quote Elements
const quoteWrapperStyle = {
  position: "relative",
  width: "100%",
  marginBottom: "16px",
};

const largeQuoteMarkStyle = {
  position: "absolute",
  top: "-36px",
  left: "-28px",
  fontSize: "6.5rem",
  fontFamily: "Georgia, serif",
  color: "rgba(16, 185, 129, 0.15)",
  lineHeight: 1,
  userSelect: "none",
};

const quoteStyle = {
  fontSize: "2rem",
  fontWeight: "700",
  color: "#ffffff",
  lineHeight: "1.4",
  margin: 0,
  fontFamily: "var(--font-family)",
  letterSpacing: "-0.01em",
  position: "relative",
  zIndex: 2,
};

const dividerStyle = {
  width: "48px",
  height: "3px",
  backgroundColor: "#10b981",
  borderRadius: "2px",
  marginBottom: "16px",
};

const authorStyle = {
  fontSize: "1.1rem",
  color: "#a0b299",
  fontWeight: "600",
  fontStyle: "normal",
};

// Navigation Arrows
const arrowStyleCommon = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(12, 19, 15, 0.4)",
  backdropFilter: "blur(4px)",
  webkitBackdropFilter: "blur(4px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  color: "rgba(255, 255, 255, 0.6)",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 4,
  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  outline: "none",
};

const leftArrowStyle = {
  ...arrowStyleCommon,
  left: "3%",
};

const rightArrowStyle = {
  ...arrowStyleCommon,
  right: "3%",
};

// Indicators
const dotsContainerStyle = {
  position: "absolute",
  bottom: "32px",
  left: "10%", // Align with left-aligned content
  display: "flex",
  gap: "8px",
  zIndex: 4,
};

const dotStyle = {
  height: "8px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  padding: 0,
};

export default Carousel;
