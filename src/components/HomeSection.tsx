import React, { useState, useEffect } from 'react';
import '../styles/homeSection.css';

// Import images
import lakePalace from '../assets/rajasthan/Lake-Palace-Udaipur.jpg';
import rajasthanImage from '../assets/rajasthan/rajasthan-image.webp';
import kusumSarovar from '../assets/rajasthan/Kusum-Sarover-Mathura.webp';
import rajasthanTravel from '../assets/rajasthan/rajasthan-travel.jpg';
import tajMahal from '../assets/rajasthan/TAJ-MAHAL-INDIA-FAMILY-CHILDREN.webp';

const HomeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const slides = [
    {
      image: lakePalace,
      title: 'Royal',
      subtitle: 'Udaipur',
      description: 'Experience the grandeur of the Lake Palace in Udaipur, a majestic white marble wonder floating on Lake Pichola, where Rajasthani royalty meets timeless luxury and romance.'
    },
    {
      image: rajasthanImage,
      title: 'Majestic',
      subtitle: 'Jodhpur',
      description: 'Discover the magnificent Mehrangarh Fort rising above the blue city of Jodhpur, where ancient sandstone walls tell tales of Rajput valor and architectural brilliance.'
    },
    {
      image: tajMahal,
      title: 'Eternal',
      subtitle: 'Agra',
      description: 'Witness the iconic Taj Mahal at sunset, where silhouettes dance and stories of eternal love come alive against the backdrop of architectural perfection.'
    },
    {
      image: rajasthanTravel,
      title: 'Regal',
      subtitle: 'Udaipur',
      description: 'Marvel at the City Palace of Udaipur, where ornate architecture meets serene waters, creating a testament to Rajasthan\'s royal heritage and artistic mastery.'
    },
    {
      image: kusumSarovar,
      title: 'Serene',
      subtitle: 'Mathura',
      description: 'Experience the tranquil beauty of Kusum Sarovar, where ancient architecture reflects in still waters, creating a perfect harmony of heritage and natural splendor.'
    }
  ];

  useEffect(() => {
    // Preload images
    Promise.all(
      slides.map((slide) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = resolve;
        });
      })
    ).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isLoading, slides.length]);

  if (isLoading) {
    return <div className="home-section loading"></div>;
  }

  return (
    <div className="home-section">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <div className="text-content">
                <h1>
                  {slide.title}
                  <span className="subtitle">{slide.subtitle}</span>
                </h1>
                <p>{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;