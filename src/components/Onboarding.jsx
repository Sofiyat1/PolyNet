import { useState, useEffect } from "react";
import "./Onboarding.css";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";
import slide5 from "../assets/slide5.jpg";

const slides = [
  {
    title: "One Profile. Two Realities.",
    image: slide1,
    background: "linear-gradient(to right, #999999 50%, #0f1f3d 50%)",
  },
  {
    title: "Social Networking, Re-Architected.",
    text: "Privacy-first by design.",
    image: slide2,
    background: "#dbdada",
  },
  {
    title: "Connect Freely. Share Selectively.",
    text: "You decide what’s visible.",
    image: slide3,
    background: "#dbdada",
  },
  {
    title: "Take Back Your Digital Identity.",
    text: "Take back control online.",
    image: slide4,
    background: "#0f1f3d",
  },
  {
    title: "Your Circle. Your Terms.",
    text: "No noise. No pressure.",
    background: slide5,
  },
];

function Onboarding() {
  const [current, setCurrent] = useState(0);

  // auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="onboarding-container">
      <div
        className="onboarding-track"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`onboarding-slide ${index === slides.length - 1 ? "last-slide" : ""}`}
            style={
              slide.background
                ? slide.background.startsWith("linear-gradient") ||
                  slide.background.startsWith("#")
                  ? { background: slide.background } // gradient or solid color
                  : {
                      backgroundImage: `url(${slide.background})`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                    } // image
                : {}
            }
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
              <button className="onboarding-btn">Get Started</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Onboarding;
