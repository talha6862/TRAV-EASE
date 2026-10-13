import { useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import Recommend from "./Components/Recommend";
import Testimonials from "./Components/Testimonials";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Places from "./Components/Places";
import RentCar from "./Components/services/RentACar";
import Local from "./Components/services/locals";
import Customized from "./Components/customized";
import DealerPage from "./Components/dealer";
import Register from "./Components/services/registerlocals";
import LoginPage from "./Components/login/logininitial";
import SignUpUser from "./Components/login/signupuser";
import ContactUs from "./Components/contact";
import Destination from "./Components/destinationdetail";
import scrollreveal from "scrollreveal";


import AdminPanel from "./Components/admin/AdminRequest";
import AdminDashboard from "./Components/admin/AdminPanel";
import DealerVerification from "./Components/admin/DealerVerification";
import LocalCompanyApproval from "./Components/admin/LocalCompanyApproval";
import CustomizedTripsView from "./Components/admin/CustomizedTripsView";
import DestinationManager from "./Components/admin/DestinationManager";
import CompanyDetail from "./Components/companyDetail";
import DealerDetail from "./Components/admin/dealerPage";
import CompanyCard from "./Components/admin/companyPage";
import UserVerification from "./Components/admin/UserVerification";
import DealerDetailPage from "./Components/dealerDetail";
import AvatarDropdown from "./Components/AvatarDropdown";
import CompanyContact from "./Components/services/CompanyContact";
import DealerBookingSummary from "./Components/services/DealerBookingSummary";
import Tours from './Components/Tours';
import TourOperatorRegister from './Components/TourOperatorRegister';
import TourAdmin from './Components/admin/AdminTourOperators';
import TourAdminDetail from './Components/admin/TourOperatorDetail';
import PaymentPage from "./Components/PaymentPage";
import CheckoutForm from "./Components/CheckoutForm";
import TourDetail from "./Components/TourDetail";
import ServiceDetail from "./Components/ServiceDetail";
import Profile from './Components/profile';
import TourInfo from './Components/TourInfo';
import PlacesInfo from "./Components/PlacesInfo";
import FeedbackAdmin from './Components/admin/AdminFeedbacks';
import AdminLogin from './Components/admin/AdminLogin';
import ApproveAdmins from "./Components/admin/ApproveAdmins";
import ForgotPassword from "./Components/login/ForgotPassword";
import ResetPassword from "./Components/login/ResetPassword";

import TourPaymentProceed from "./Components/TourPaymentProceed";

import AdminUserItinerary from "./Components/admin/AdminUserIternary";
import AdminUserTours from "./Components/admin/AdminToursBooked";
import UserItineraryTrips from "./Components/UserItineraryTrips";

const AppWrapper = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });
    sr.reveal(
      `
      nav,
      #hero,
      #services,
      #recommend,
      #testimonials,
      footer
      `,
      {
        opacity: 0.8,
        interval: 300,
      }
    );
  }, []);

  return (
    <Main>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <Recommend />
              <Testimonials />
              {!isAdminRoute && <Footer />}
            </>
          }
        />
        <Route path="/about" element={<><About /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/places" element={<><Places /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/services/RentACar" element={<><RentCar /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/services/locals" element={<><Local /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/customized" element={<><Customized /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/contact" element={<><ContactUs /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/destinationdetail/:title" element={<Destination />} />
        <Route path="/dealer" element={<><DealerPage /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/services/registerlocals" element={<><Register /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/login/logininitial" element={<><LoginPage /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/signupuser" element={<><SignUpUser /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/services/companycontact" element={<><CompanyContact /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/services/dealer/summary" element={<><DealerBookingSummary /><Footer /></>} />

      
        <Route path="/services" element={<><Services /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/testimonials" element={<><Testimonials /> {!isAdminRoute && <Footer />}</>} />
        <Route path="/recommendations" element={<><Recommend /> {!isAdminRoute && <Footer />}</>} />

   
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
         <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dealers" element={<DealerVerification />} />
        <Route path="/admin/companies" element={<LocalCompanyApproval />} />
        <Route path="/admin/customized-trips" element={<CustomizedTripsView />} />
        <Route path="/admin/destinations" element={<DestinationManager />} />
        <Route path="/services/company/:id" element={<><CompanyDetail /><Footer /></>} />
        <Route path="/admin/dealers/:dealerId" element={<DealerDetail />} />
        <Route path="/admin/companies/:id" element={<CompanyCard />} />
        <Route path="/admin/users" element={<UserVerification />} />
        <Route path="/admin/tour-op" element={<TourAdmin />} />
        <Route path="/admin/tour-op-detail/:id" element={<TourAdminDetail />} />
        <Route path="/admin/feedbacks" element={<FeedbackAdmin />} />
        <Route path="/admin/approve-admins" element={<ApproveAdmins />} />
        <Route path="/admin/user-itinerary" element={<AdminUserItinerary />} />
        <Route path="/admin/user-tours" element={<AdminUserTours/>} />




       



        <Route path="/dealer/:dealerId" element={<><DealerDetailPage /><Footer /></>} />
        <Route path="/avatar" element={<AvatarDropdown />} />
        <Route path="/tours" element={<><Tours /><Footer /></>} />
        <Route path="/register-operator" element={<><TourOperatorRegister /><Footer /></>} />
        <Route path="/payment" element={<><PaymentPage /><Footer /></>} />
        <Route path="/checkout" element={<><CheckoutForm /><Footer /></>} />
        <Route path="/tour-detail" element={<><TourDetail/><Footer /></>} />
        <Route path="/service-detail" element={<><ServiceDetail/><Footer /></>} />
        <Route path="/profile" element={<><Profile/><Footer /></>} />
        <Route path="/tour-info" element={<><TourInfo/><Footer /></>} />
         <Route path="/places-info" element={<><PlacesInfo/><Footer /></>} />
        <Route path="/tour-payment-proceed" element={<><TourPaymentProceed/><Footer /></>} />
        <Route path="/user-itinerary-trips" element={<><UserItineraryTrips /><Footer /></>} />




        


        
      </Routes>
    </Main>
  );
};

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

const Main = styled.main``;
