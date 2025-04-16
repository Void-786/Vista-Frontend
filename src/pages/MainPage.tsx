import HomeSection from '../components/HomeSection';
import QueryForm from '../components/QueryForm';
import CarsPage from './CarsPage';
import PackagesPage from './PlacesPage';
import ContactPage from './ContactPage';

const MainPage = () => {
  return (
    <>
      {/* 1. Home */}
      <div id="home">
        <HomeSection />
      </div>

      {/* 4. Packages */}
      <div id="packages">
        <PackagesPage />
      </div>

      {/* 3. Cars */}
      <div id="cars">
        <CarsPage />
      </div>

      {/* 2. Query Form from Contact Page */}
      <div id="query" className="query-section">
        <div className="form-section">
          <h2 className="main-title">CUSTOMIZED FOR YOU, <span>SERVED BY US</span></h2>
          <QueryForm />
        </div>
      </div>

      {/* 5. Contact */}
      <div id="contact">
        <ContactPage />
      </div>
    </>
  );
};

export default MainPage;
