import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Onboarding.css";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide33.png";
import slide4 from "../assets/slide4.jpg";
import slide5 from "../assets/slide5.png";

const slides = [
  {
    title: "One Profile. Two Realities.",
    //text: "Take back control online.",
    image: slide1,
    background: "#dbdada",//"linear-gradient(to right, #838b96 50%, #242c74 50%)",
    textColor: "#000",
  },
  {
    title: "Social Networking, Re-Architected.",
    text: "Privacy-first by design.",
    image: slide2,
    background: "#dbdada",
    textColor: "#000",
  },
  {
    title: "Connect Freely. Share Selectively.",
    image: slide3,
    background: "#dbdada",
    textColor: "#000",
  },
  {
    background: slide5,
    textColor: "#f3f3f3",
  },
  {
    title: "Take Back Your Digital Identity.",
    image: slide4,
    background: "#041122",
    textColor: "#f3f3f3",
  },
];

function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const timerRef = useRef(null);
  const isInteracting = useRef(false);

  const startAutoSlide = () => {
    stopAutoSlide();

    timerRef.current = setInterval(() => {
      if (!isInteracting.current) {
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 3000); // smooth onboarding speed
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  // swipe helpers
  const startX = useRef(0);
  const endX = useRef(0);

  const handleTouchStart = (e) => {
    isInteracting.current = true;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX.current - endX.current;

    if (diff > 50) {
      setCurrent((prev) => (prev + 1) % slides.length);
    } else if (diff < -50) {
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }

    setTimeout(() => {
      isInteracting.current = false;
    }, 1000);
  };

  return (
    <div
      className="onboarding-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="onboarding-track"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`onboarding-slide ${
              index === slides.length - 1 ? "last-slide" : ""
            }`}
            style={{
              ...(slide.background
                ? slide.background.startsWith("linear-gradient") ||
                  slide.background.startsWith("#")
                  ? { background: slide.background }
                  : {
                      backgroundImage: `url(${slide.background})`,
                      backgroundSize: "cover",
                      backgroundPosition: "75% center",
                    }
                : {}),
              color: slide.textColor || "#0f1f3d",
            }}
          >
            <h1>{slide.title}</h1>

            {slide.image && (
              <img
                src={slide.image}
                alt={slide.title}
                className="slide-image"
              />
            )}

            {slide.text && <p>{slide.text}</p>}

            {index === slides.length - 3 && (
              <button
                className="onboarding-btn"
                onClick={() => navigate("/identityguide")}
              >
                Learn How Privacy Works
              </button>
            )}

            {index === slides.length - 1 && (
              <button
                className="onboarding-btn"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Onboarding;
