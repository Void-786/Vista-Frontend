import React, { useEffect, useRef } from "react";
import {
  FaHandshake,
  FaUsers,
  FaRoute,
  FaHeart,
  FaMountain,
  FaMoneyBillWave,
  FaHistory,
  FaCarSide,
} from "react-icons/fa";
import "../styles/whoWeAre.css";

const WhoWeAre = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-section");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const coreValues = [
    {
      icon: <FaUsers />,
      title: "Family First",
      description:
        "As a family business, we treat every customer like our own, providing personalized service that makes your journey special.",
      color: "#ff6b6b",
    },
    {
      icon: <FaHandshake />,
      title: "Trust & Reliability",
      description:
        "We believe in building lasting relationships through honest pricing and dependable service every step of the way.",
      color: "#ff9f43",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Best Price Guarantee",
      description:
        "We're committed to offering the most competitive prices without compromising on quality or service.",
      color: "#36ae7c",
    },
    {
      icon: <FaRoute />,
      title: "Seamless Experience",
      description:
        "From booking to drop-off, we ensure a smooth journey with our easy-to-use platform and professional service.",
      color: "#7D0A0A",
    },
  ];

  const milestones = [
    {
      year: "1999",
      title: "Humble Beginnings",
      description:
        "Started as a small family business with just 1 cars, driven by a passion for travel and quality service.",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
    {
      year: "2005",
      title: "Growing Together",
      description:
        "Expanded our fleet from 1 to 5 vehicles and started offering specialized tour packages across popular destinations.",
      image:
        "https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
    {
      year: "2016",
      title: "Expansion",
      description:
        "Expanded our work to various cities to cater the mass audience with best and affordable car rentals",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
    {
      year: "2025",
      title: "Looking Forward",
      description:
        "Taking our buisness online for everyone to acces the best services availabke online ",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="who-we-are-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="content">
          <h1 >Our Story</h1>
          <p className="tagline">
            A Family Journey of Passion, Service, and Excellence
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section
        className="story-section"
        ref={(el) => (sectionRefs.current[0] = el)}
      >
        <div className="container">
          <div className="section-header">
            <h2>The Vista Family</h2>
            <div className="accent-line"></div>
          </div>
          <div className="story-content">
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Family business"
              />
            </div>
            <div className="story-text">
              <p>
                <strong>Vista Tour & Travel</strong> began as a humble family venture in
                2005, born from our deep love for travel and our home's
                breathtaking landscapes. What started with just two cars and
                endless enthusiasm has blossomed into one of the region's most
                trusted travel companies.
              </p>
              <p>
                As a family-owned business, we understand the importance of
                creating meaningful connections and unforgettable experiences.
                Every journey we facilitate is infused with the same care and
                attention we would offer our own family members.
              </p>
              <p>
                Over the years, our mission has remained consistent: to make
                exceptional travel experiences accessible to everyone through
                personalized service, transparent pricing, and genuine
                hospitality that reflects our family values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section
        className="mission-section"
        ref={(el) => (sectionRefs.current[1] = el)}
      >
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <div className="section-header">
                <h2>Our Mission</h2>
                <div className="accent-line"></div>
              </div>
              <p>
                We believe travel should be{" "}
                <strong>effortless, enriching, and economical</strong>. Our
                mission is to simplify your journey while maximizing your
                experience through:
              </p>
              <ul className="mission-list">
                <li>
                  <span className="icon">
                    <FaHeart />
                  </span>
                  Providing personalized travel experiences that connect you
                  with the heart of each destination
                </li>
                <li>
                  <span className="icon">
                    <FaMountain />
                  </span>
                  Showcasing the natural beauty and cultural richness of our
                  incredible landscapes
                </li>
                <li>
                  <span className="icon">
                    <FaMoneyBillWave />
                  </span>
                  Offering transparent, competitive pricing without hidden
                  charges
                </li>
                <li>
                  <span className="icon">
                    <FaCarSide />
                  </span>
                  Ensuring comfort and safety with our well-maintained fleet and
                  experienced drivers
                </li>
              </ul>
            </div>
            <div className="mission-image">
              <img
                src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Our mission"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section
        className="values-section"
        ref={(el) => (sectionRefs.current[2] = el)}
      >
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <div className="accent-line"></div>
          </div>
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="value-card"
                style={{ "--card-color": value.color } as React.CSSProperties}
              >
                <div className="icon-wrapper">
                  <div className="icon">{value.icon}</div>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section
        className="timeline-section"
        ref={(el) => (sectionRefs.current[3] = el)}
      >
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <div className="accent-line"></div>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="year">{milestone.year}</div>
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-image">
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                  </div>
                  <div className="timeline-info">
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision for the Future */}
      <section
        className="vision-section"
        ref={(el) => (sectionRefs.current[4] = el)}
      >
        <div className="container">
          <div className="vision-content">
            <div className="vision-text">
              <div className="section-header">
                <h2>Our Vision</h2>
                <div className="accent-line"></div>
              </div>
              <p>
                As we continue to grow, our vision is to become the most trusted
                name in travel services across India while staying true to our
                family roots. We aim to:
              </p>
              <ul className="vision-list">
                <li>
                  <span className="number">01</span>Expand our reach to more
                  breathtaking destinations while maintaining our personalized
                  approach
                </li>
                <li>
                  <span className="number">02</span>Make package booking simpler
                  and more accessible through technological innovation
                </li>
                <li>
                  <span className="number">03</span>Continue offering the best
                  prices without compromising on quality or experience
                </li>
                <li>
                  <span className="number">04</span>Contribute to sustainable
                  tourism practices that protect the places we love
                </li>
              </ul>
            </div>
            <div className="vision-image">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Our vision"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeAre;
