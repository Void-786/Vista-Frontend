import React, { useState, useEffect } from "react";
import "../styles/faq.css";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const FAQsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Add effect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems: FaqItem[] = [
    {
      question: "How do I book a travel package on Safar?",
      answer: (
        <>
          <p>
            Booking with Safar is quick and easy! You can choose from three
            simple options:
          </p>
          <ol>
            <li>
              <strong>Select a Ready-Made Package:</strong> Browse our available
              packages, pick the one you like, and review the itinerary. Click
              "Book Now," and our team will reach out to confirm your booking.
            </li>
            <li>
              <strong>Customize Your Package:</strong> Want something unique?
              Customize your own package based on your preferences, and we'll
              tailor everything to fit your needs.
            </li>
            <li>
              <strong>Chat with Us on WhatsApp:</strong> For a more personalized
              experience, message us directly on WhatsApp, and our team will
              guide you through the booking process.
            </li>
          </ol>
        </>
      ),
    },
    {
      question:
        "Can I customize my travel package, including the car and driver?",
      answer: (
        <p>
          Yes, you can easily customize your package! You can choose a car from
          our available fleet to match your preferences. However, the driver
          will be provided by us. Rest assured, we'll assign you the best driver
          with extensive experience to ensure a smooth and enjoyable journey.
        </p>
      ),
    },
    {
      question:
        "What cities and destinations do you currently offer packages for?",
      answer: (
        <p>
          We currently offer a wide range of packages across popular
          destinations like Uttarakhand, Himachal, Rajasthan, and more.
          Additionally, we are continuously working to add more itineraries and
          destinations to our collection. You can also customize any package to
          suit your travel needs.
        </p>
      ),
    },
    {
      question: "How far in advance should I book my trip?",
      answer: (
        <p>
          It's always better to book in advance! While you can book at any time,
          we recommend booking at least 15 days ahead of your trip for the best
          experience. Plus, booking earlier often means you can enjoy extra
          discounts!
        </p>
      ),
    },
    {
      question: "What payment methods do you accept?",
      answer: (
        <p>
          We accept a variety of payment methods including online payments, net
          banking, and UPI. Additionally, we offer a flexible payment option
          where you can pay 50% in cash at the start of your trip and the
          remaining 50% as a pre-booking advance.
        </p>
      ),
    },
    {
      question: "Are there any hidden charges apart from the package price?",
      answer: (
        <p>
          No, we believe in transparency. Our goal is to offer the best and most
          reasonable prices for everything. There are no hidden charges—what you
          see is what you pay.
        </p>
      ),
    },
    {
      question: "What types of cars are available for booking?",
      answer: (
        <p>
          We offer a wide range of vehicles to suit your needs, including
          sedans, MUVs, five-seater cars, seven-seater cars, and more.
        </p>
      ),
    },
    {
      question: "Are the drivers experienced and licensed?",
      answer: (
        <p>
          Yes, all of our drivers are experienced, licensed, and highly skilled.
          They are carefully selected to ensure the highest standards of safety
          and professionalism, so you can travel with complete peace of mind.
        </p>
      ),
    },
    {
      question: "Can I request an English/Hindi-speaking driver?",
      answer: (
        <p>
          Yes, you can request a driver who speaks English or Hindi. We will do
          our best to accommodate your preference based on availability.
        </p>
      ),
    },
    {
      question:
        "Is there any way to include hotels and accommodations for travelers?",
      answer: (
        <p>
          Yes, you can choose to include hotels and accommodations in your
          package. However, please note that the charges for accommodation will
          be added to the package price as an extra cost.
        </p>
      ),
    },
  ];

  return (
    <div className="faqs-container">
      <div className="faqs-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to the most common questions about our services.</p>
      </div>

      <div className="faqs-content">
        {faqItems.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
          >
            <h3 onClick={() => toggleFaq(index)}>
              {faq.question}
              <span className="faq-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </h3>
            <div
              className="faq-answer"
              style={{
                display: activeIndex === index ? "block" : "none",
              }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsPage;
