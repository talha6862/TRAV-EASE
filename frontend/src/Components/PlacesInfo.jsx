import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "../utils/Axios";

export default function PlacesInfo() {
  const { state: tour } = useLocation();
 
  const user = JSON.parse(localStorage.getItem("UserInfo"));

  const pakistanCities = [
    "Karachi", "Lahore", "Islamabad",
    "Peshawar", "Quetta", "Multan", "Faisalabad"
  ];

  const [departureCity, setDepartureCity] = useState(pakistanCities[0]);
  const [distanceFromCity, setDistanceFromCity] = useState("");
  const [persons, setPersons] = useState(1);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedSpots, setSelectedSpots] = useState([]);

  const {
    name, description, image, price, activities = [], touristSpots = [],
    facilities = []
  } = { ...tour, facilities: [] };

  useEffect(() => {
    const fetchTourOperatorData = async () => {
      try {
        const res = await api.get("/admin/tour-operators");
        const matchedOperator = res.data.find(op => op.destinationName === tour?.name);
        if (matchedOperator) {
          // unpack additional data if desired
        }
      } catch (err) {
        console.error("Error fetching tour operator info:", err);
      }
    };
    if (tour?.name) fetchTourOperatorData();
  }, [tour]);

  useEffect(() => {
  const calcDistance = async () => {
  if (!tour?.name || !departureCity) return;
  const key = 'cccb5f5f8a92443a98d1cc24eb5b3a35';
  const geo = async loc => {
    const r = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(loc)}, Pakistan&key=${key}`
    );
    const j = await r.json();
    if (!j.results?.length) {
      console.error("Geocoding failed for:", loc, j);
      return null;
    }
    return j.results[0].geometry;
  };

  const from = await geo(departureCity);
  const to = await geo(tour.name); 

  if (from && to) {
    const R = 6371;
    const dLat = (to.lat - from.lat) * Math.PI / 180;
    const dLon = (to.lng - from.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(from.lat * Math.PI / 180) *
              Math.cos(to.lat * Math.PI / 180) *
              Math.sin(dLon / 2) ** 2;
    const d = 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    setDistanceFromCity(d.toFixed(1));
  }
};

    calcDistance();
  }, [departureCity, tour]);

  const handleCheck = (item, setter, current) => {
    setter(current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item]
    );
  };

  const handleSave = async () => {
  if (!user) {
    alert("Please login to save this itinerary.");
    return;
  }

  const totalPrice = price * persons;

  const bookingData = {
    name,
    destination: name,
    description,
    image,
    price,
    originalPrice: price,
    totalPrice,
    persons,
    email: user.email,
    departureCity,
    selectedFacilities,
    selectedSpots,
    distanceFromCity
  };

  try {
    await api.post("/api/trips", bookingData);
    alert("🎉 Trip Itinerary saved successfully!");
  } catch (err) {
    console.error("Error saving trip:", err.response?.data || err.message);
    alert("❌ Failed to save trip itinerary. Please try again.");
  }
};


  // const handlePayment = async () => {
  //   if (!user) {
  //     alert("Please login to proceed with booking.");
  //     return navigate("/login/logininitial");
  //   }
  //   const totalPrice = price * persons;
  //   const bookingData = {
  //     name,
  //     departureCity,
  //     destination: name,
  //     description,
  //     image,
  //     price,
  //     originalPrice: price,
  //     totalPrice,
  //     persons,
  //     email: user.email,
  //     selectedFacilities,
  //     selectedSpots
  //   };
  //   try {
  //     await api.post("/api/trips", bookingData);
  //     alert("🎉 Trip booked successfully!");
  //     navigate("/payment", { state: { ...bookingData, bookedBy: user.email } });
  //   } catch (err) {
  //     console.error("Error booking trip:", err.response?.data || err.message);
  //     alert("❌ Failed to book trip. Please try again.");
  //   }
  // };

  if (!tour) return <p>No tour information available</p>;

  return (
    <Container>
      <ImageWrapper>
        <img src={`${process.env.REACT_APP_API_URL}/${image}`} alt={name} />
      </ImageWrapper>

      <Content>
        <h1>{name}</h1>
        <p>{description}</p>

        <InfoGroup>
          <InfoRow>
            <strong>Price per Person:</strong> PKR {price?.toLocaleString()}
          </InfoRow>
          <InfoRow>
            <strong>Distance from {departureCity}:</strong>
            {distanceFromCity ? ` ${distanceFromCity} KM` : " calculating..."}
          </InfoRow>
          {user?.email && (
            <InfoRow>
              <strong>Email (Currently Loged in User):</strong> {user.email}
            </InfoRow>
          )}
        </InfoGroup>

        {activities.length > 0 && (
          <ListSection>
            <h3>Activities Included</h3>
            <ul>{activities.map((act, i) => <li key={i}>🎯 {act}</li>)}</ul>
          </ListSection>
        )}

        <FormSection>
          <h3>Booking Form</h3>

          <label>City of Departure</label>
          <select value={departureCity} onChange={e => setDepartureCity(e.target.value)}>
            {pakistanCities.map(city =>
              <option key={city} value={city}>{city}</option>
            )}
          </select>

          <label>Number of Persons</label>
          <input
            type="number" min="1" value={persons}
            onChange={e => setPersons(parseInt(e.target.value) || 1)}
          />

          <label>Estimated Total Price</label>
          <input
            type="text"
            value={`PKR ${(price * persons).toLocaleString()}`}
            readOnly
          />

          {facilities.length > 0 &&
            <>
              <h3>Select Facilities</h3>
              {facilities.map(f => (
                <label key={f}>
                  <input type="checkbox"
                    checked={selectedFacilities.includes(f)}
                    onChange={() => handleCheck(f, setSelectedFacilities, selectedFacilities)}
                  /> {f}
                </label>
              ))}
            </>
          }

          {touristSpots.length > 0 &&
            <>
              <h3>Select Tourist Spots</h3>
              {touristSpots.map(s => (
                <label key={s}>
                  <input type="checkbox"
                    checked={selectedSpots.includes(s)}
                    onChange={() => handleCheck(s, setSelectedSpots, selectedSpots)}
                  /> {s}
                </label>
              ))}
            </>
          }

          <PayButton onClick={handleSave}>Save Trip Iternary</PayButton>
          {/* <PayButton onClick={handlePayment}>Book Trip</PayButton> */}
        </FormSection>
      </Content>
    </Container>
  );
}






const Container = styled.div`
  max-width: 1140px;
  margin: 3rem auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  border-radius: 1.5rem;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.06);
`;


const ImageWrapper = styled.div`
  width: 100%;
  height: 480px;
  border-radius: 1.2rem;
  overflow: hidden;
  position: relative;
  background: #e0f2fe;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    border-radius: 1.2rem;
    image-rendering: crisp-edges;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.02);
  }
`;


const Content = styled.div`
  padding: 1rem;

  h1 {
    font-size: 2.6rem;
    font-weight: 800;
    color:rgb(146, 173, 247);
    margin-bottom: 1.2rem;
  }

  p {
    font-size: 1.15rem;
    color: #334155;
    line-height: 1.75;
    margin-bottom: 2.2rem;
    max-width: 950px;
  }
`;
const InfoGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.2rem;
`;


const InfoRow = styled.div`
  background: #f8fafc;
  padding: 1.2rem;
  border-radius: 1rem;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  font-weight: 500;
  color: #0f172a;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.03);

  strong {
    display: block;
    color: #1e3a8a;
    margin-bottom: 0.4rem;
    font-weight: 600;
  }
`;


const ListSection = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  margin-top: 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  border-left: 4px solid #0ea5e9;

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #0ea5e9;
    margin-bottom: 0.8rem;
  }

  ul {
    list-style: none;
    padding-left: 1rem;

    li {
      font-size: 1rem;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    li a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
        color: #1d4ed8;
      }
    }
  }
`;


const FormSection = styled.div`
  margin-top: 3rem;
  background: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 1.2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1e40af;
  }

  label {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.2rem;
    background-color:white;
  }

  input {
    padding: 0.9rem;
    font-size: 1rem;
    border: 1px solid #cbd5e1;
    color: #1e293b;
    border-radius: 0.75rem;
    background: #f1f5f9;
    transition: 0.2s all;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
  }
`;


const PayButton = styled.button`
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(to right, #0ea5e9, #0284c7);
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #0369a1, #0ea5e9);
    transform: scale(1.03);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;
