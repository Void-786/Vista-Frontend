import { FaUser } from 'react-icons/fa';
import '../styles/feedback.css';

const FeedbackSection = () => {
  const feedbacks = [
    {
      id: 1,
      avatar: <FaUser />,
      rating: 5,
      date: 'Vishal Kukreja',
      text: "I booked a Rajasthan trip through Safar, and it was one of the best travel experiences I've had! From Jaipur's grand forts to Jaisalmer's golden sand dunes, everything was well-planned. The car was comfortable, the driver was polite, and there were no hidden charges. Highly recommend for a smooth and tension-free trip!",
      readMore: "#"
    },
    {
      id: 2,
      rating: 5,
      date: 'Pooja Kumari ',
      text: "We recently traveled to Manali and Shimla with Safar, and it was a fantastic experience! The itinerary was perfect, covering all the must-visit spots. The driver knew the best local food joints and scenic routes, which made the trip even better. Definitely booking with them again!",
      readMore: "#"
    },
    {
      id: 3,
      avatar: <FaUser />,
      date: 'Amit Sharma',
      rating: 4,
      text: "Our Uttarakhand trip was a dream come true! We explored Rishikesh, Mussoorie, and Nainital without any worries. The car was in great condition, and our driver was knowledgeable and friendly. The best part? We could customize our trip as per our schedule. Hassle-free and worth every penny!",
      readMore: "#"
    }
    
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : 'empty'}`}>★</span>
    ));
  };

  return (
    <div id="feedback-section" className="feedback-section">
      <h2>Thanks for giving us your feedback online.</h2>
      {/* <p> </p> */}
      {/* <p className="feedback-subtitle">Below are a few of the reviews that brought some recent issues to light for our business.</p> */}
      
      <div className="feedback-container">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="feedback-card">
            <div className="feedback-header">
              <div className="avatar">
                {feedback.avatar || <FaUser />}
              </div>
              <div className="rating">
                {renderStars(feedback.rating)}
              </div>
              <div className="date">{feedback.date}</div>
            </div>
            <div className="feedback-content">
              <p>{feedback.text}</p>
              {/* <a href={feedback.readMore} className="read-more">Read more</a> */}
            </div>
          </div>
        ))}
      </div>
      
      <div className="feedback-navigation">
        <span className="nav-dot active"></span>
        <span className="nav-dot"></span>
      </div>
    </div>
  );
};

export default FeedbackSection;
