import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import WhoWeArePage from "./pages/WhoWeArePage";
import CarsPage from "./pages/CarsPage";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import PackagesPage from "./pages/PlacesPage";
import PackageItinerary from "./pages/PackageItinerary";
import AdminPanel from "./admin/AdminPanel";
import Car from "./admin/car/Car";
import Place from "./admin/package/Place";
import AddCar from "./admin/car/AddCar";
import "./App.css";
import "./styles/colorTheme.css";
import CarList from "./admin/car/CarList";
import MainPage from "./pages/MainPage";
import AddPlace from "./admin/package/AddPlace";
import PlaceList from "./admin/package/PlaceList";
import Package from "./admin/package/Package";
import AddPackage from "./admin/package/AddPackage";
import PackageList from "./admin/package/PackageList";
import FAQsPage from "./pages/FAQsPage";
import BookingsPage from "./pages/BookingsPage";
import QueryForm from "./components/QueryForm";
import AdminLogin from "./admin/loginForm";
import ProtectedRoute from "./Auth/ProtectAdminRoute";

const App = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
        localStorage.removeItem('token');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            {/* Public Rooutes */}
            <Route path="/" element={<MainPage />} />
            <Route path="/who-we-are" element={<WhoWeArePage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/itinerary/:placeId" element={<PackageItinerary />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/query" element={<QueryForm />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/cars" element={<ProtectedRoute><Car /></ProtectedRoute>} />
            <Route path="/admin/places" element={<ProtectedRoute><Place /></ProtectedRoute>} />

            <Route path="/admin/cars/add-car" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
            <Route path="/admin/cars/update-car" element={<ProtectedRoute><CarList /></ProtectedRoute>} />

            <Route path="/admin/places/add-place" element={<ProtectedRoute><AddPlace /></ProtectedRoute>} />
            <Route path="/admin/places/update-place" element={<ProtectedRoute><PlaceList /></ProtectedRoute>} />

            <Route path="/admin/places/:id" element={<ProtectedRoute><Package /></ProtectedRoute>} />
            <Route
              path="/admin/places/packages/add-package"
              element={<ProtectedRoute><AddPackage /></ProtectedRoute>}
            />
            <Route
              path="/admin/places/packages/update-package"
              element={<ProtectedRoute><PackageList /></ProtectedRoute>}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
