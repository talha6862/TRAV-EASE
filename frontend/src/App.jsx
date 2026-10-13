import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

import About from "./Components/About.jsx";
import Footer from "./Components/Footer.jsx";
import ContactUs from "./Components/contact.jsx";
import Customized from "./Components/customized.jsx";
import DealerPage from "./Components/dealer.jsx";
import DealerDetail from "./Components/dealerDetail.jsx";
import CompanyDetail from "./Components/companyDetail.jsx";
import CheckoutForm from "./Components/CheckoutForm.jsx";
import AvatarDropdown from "./Components/AvatarDropdown.jsx";

// Publishable key — safe in the browser. Set REACT_APP_STRIPE_PUBLISHABLE_KEY in .env.
const stripePromise = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  : null;

function Nav() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        padding: "1rem 1.5rem",
        borderBottom: "1px solid #e4e7eb",
        position: "sticky",
        top: 0,
        background: "#fff",
        zIndex: 20,
      }}
    >
      <Link to="/" style={{ fontWeight: 700, textDecoration: "none" }}>
        Trav-Ease
      </Link>
      <div style={{ display: "flex", gap: "1rem", marginLeft: "auto", alignItems: "center" }}>
        <Link to="/about" style={{ textDecoration: "none" }}>About</Link>
        <Link to="/customized" style={{ textDecoration: "none" }}>Customised</Link>
        <Link to="/services/dealer" style={{ textDecoration: "none" }}>Dealers</Link>
        <Link to="/contact" style={{ textDecoration: "none" }}>Contact</Link>
        <AvatarDropdown />
      </div>
    </nav>
  );
}

function Home() {
  return (
    <>
      <About />
    </>
  );
}

/* Checkout reads the destination passed through router state. */
function Checkout() {
  const { state } = useLocation();
  const destination = state?.destination || state;

  if (!destination) {
    return (
      <Page title="Nothing to pay for yet">
        Choose a trip first, then come back to checkout.
      </Page>
    );
  }
  if (!stripePromise) {
    return (
      <Page title="Payments not configured">
        Set <code>REACT_APP_STRIPE_PUBLISHABLE_KEY</code> in <code>frontend/.env</code> to enable payment.
      </Page>
    );
  }
  return (
    <Elements stripe={stripePromise}>
      <div style={{ maxWidth: 560, margin: "2rem auto", padding: "0 1rem" }}>
        <CheckoutForm destination={destination} />
      </div>
    </Elements>
  );
}

/* Placeholder for routes whose page components are not in this repo yet. */
function Page({ title, children }) {
  return (
    <div style={{ maxWidth: 720, margin: "4rem auto", padding: "0 1.5rem" }}>
      <h1>{title}</h1>
      <p>{children}</p>
      <Link to="/">← Back to home</Link>
    </div>
  );
}

Page.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
};

function Missing({ name }) {
  return (
    <Page title={`${name} — not built yet`}>
      This screen exists in the original project but its component is not part of this
      repository. Add it under <code>src/Components/</code> and wire it up in{" "}
      <code>App.jsx</code>.
    </Page>
  );
}

Missing.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/customized" element={<Customized />} />

        <Route path="/services/dealer" element={<DealerPage />} />
        <Route path="/services/dealer/detail" element={<DealerDetail />} />
        <Route path="/services/company/detail" element={<CompanyDetail />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Referenced by existing components; their pages are missing. */}
        <Route path="/login/logininitial" element={<Missing name="Login" />} />
        <Route path="/profile" element={<Missing name="Profile" />} />
        <Route path="/service-detail" element={<Missing name="Service detail" />} />
        <Route path="/services/companycontact" element={<Missing name="Company contact" />} />
        <Route path="/services/dealer/summary" element={<Missing name="Booking summary" />} />

        <Route path="*" element={<Page title="Page not found">That route does not exist.</Page>} />
      </Routes>
      <Footer />
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}
