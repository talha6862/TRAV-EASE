import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const TourInfoPage = () => {
  const { state: tour } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("UserInfo"));

  if (!tour) return <Message>No tour information available.</Message>;

  const handleProceed = () => {
    if (!user) {
      alert("You must be logged in to proceed to payment.");
      return navigate("/login/logininitial");
    }

    const totalPrice = tour.price * 1;

    navigate("/tour-payment-proceed", {
      state: {
        ...tour,
        bookedBy: user.email,
        persons: 1,
        totalPrice,
      },
    });
  };

  return (
    <Wrapper>
      <Image src={`http://localhost:8001/${tour.destinationImage}`} alt={tour.destinationName} />

      <Content>
        <h1>{tour.destinationName}</h1>
        <InfoGrid>
          <InfoItem><strong>Operated by:</strong> {tour.operatorName}</InfoItem>
          <InfoItem><strong>Company:</strong> {tour.company}</InfoItem>
          <InfoItem><strong>Email:</strong> {tour.email}</InfoItem>
          <InfoItem><strong>Phone:</strong> {tour.phone}</InfoItem>
          <InfoItem><strong>Duration:</strong> {tour.days} Days / {tour.nights} Nights</InfoItem>
        </InfoGrid>

      {tour.departures?.length > 0 && (
  <Section>
    <h3>Departure Cities & Prices</h3>
    <List>
      {tour.departures.map((dep, i) => (
        <li key={i}>
          🧭 <strong>{dep.city}</strong><br />
          👤 Single: PKR {parseInt(dep.singlePrice).toLocaleString()}<br />
          💑 Couple: PKR {parseInt(dep.couplePrice).toLocaleString()}
        </li>
      ))}
    </List>
  </Section>
)}

        <DetailsSection title="Tourist Spots" items={tour.touristSpots} icon="📍" destination={tour.destinationName} />
        <DetailsSection title="Vehicle Types" items={tour.vehicleTypes} icon="🚗" />
        <DetailsSection title="Accommodations" items={tour.accommodations} icon="🏨" destination={tour.destinationName} />
        <DetailsSection title="Tourist Types" items={tour.touristTypes} icon="🧍" />
        <DetailsSection title="Facilities" items={tour.facilities} icon="✅" />

        <PayButton onClick={handleProceed}>Proceed for Payment</PayButton>
      </Content>
    </Wrapper>
  );
};

export default TourInfoPage;

const DetailsSection = ({ title, items = [], icon, destination = "" }) => {
  if (!items.length) return null;

  const isTouristSpot = title.toLowerCase() === "tourist spots";
  const isAccommodation = title.toLowerCase() === "accommodations";

  return (
    <Section>
      <h3>{title}</h3>
      <List>
        {items.map((item, idx) => {
          if (isTouristSpot) {
            const wikiLink = `https://en.wikipedia.org/wiki/${encodeURIComponent(item)}`;
            return (
              <li key={idx}>
                <a href={wikiLink} target="_blank" rel="noopener noreferrer">
                  {icon} {item}
                </a>
              </li>
            );
          }

          if (isAccommodation) {
            const googleQuery = `${item} at ${destination}`;
            const googleLink = `https://www.google.com/search?q=${encodeURIComponent(googleQuery)}`;
            return (
              <li key={idx}>
                <a href={googleLink} target="_blank" rel="noopener noreferrer">
                  {icon} {item}
                </a>
              </li>
            );
          }

          return <li key={idx}>{icon} {item}</li>;
        })}
      </List>
    </Section>
  );
};

DetailsSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  icon: PropTypes.string.isRequired,
  destination: PropTypes.string,
};

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 3rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.07);
`;

const Image = styled.img`
  width: 100%;
  height: 440px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
`;

const Content = styled.div`
  h1 {
    font-size: 2.5rem;
    color: #1e40af;
    margin-bottom: 1rem;
    font-weight: 700;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 10px;
  color: #1e293b;
  font-size: 1rem;

  strong {
    display: block;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.4rem;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.2rem;
    color: #0284c7;
    margin-bottom: 0.8rem;
    font-weight: 600;
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding-left: 0;
  list-style: none;

  li {
    background-color: #e0f2fe;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    font-size: 0.95rem;
    color: #0369a1;

    a {
      color: inherit;
      text-decoration: none;
      transition: 0.2s;

      &:hover {
        text-decoration: underline;
        color: #0c4a6e;
      }
    }
  }
`;

const PayButton = styled.button`
  margin-top: 2.5rem;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  background: linear-gradient(to right, #0ea5e9, #0284c7);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #0369a1, #0ea5e9);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Message = styled.p`
  padding: 4rem;
  text-align: center;
  font-size: 1.4rem;
  color: #b91c1c;
`;
