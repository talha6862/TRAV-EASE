import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../utils/Axios";
import axios from "axios";
import { getDistance } from "geolib";

const citiesOfPakistan = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar",
  "Quetta", "Multan", "Faisalabad", "Hyderabad", "Sialkot"
];

const TourPaymentProceed = () => {
  const { state: tour } = useLocation();
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState("");
  const [distance, setDistance] = useState("");
  const [counts, setCounts] = useState({ couples: 0, males: 0, females: 0 });
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedSpots, setSelectedSpots] = useState([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await api.get(`/admin/destinations`);
        const dest = res.data.find(d => d.name === tour.destinationName);
        setActivities(dest?.activities || []);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      }
    };
    fetchActivities();
  }, [tour.destinationName]);

  useEffect(() => {
    const fetchDistance = async () => {
      if (!selectedCity) return;

      try {
        const selectedRes = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
          params: {
            q: `${selectedCity}, Pakistan`,
            key: process.env.REACT_APP_OPENCAGE_KEY,
          },
        });

        const destinationRes = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
          params: {
            q: `${tour.destinationName}, Pakistan`,
            key: process.env.REACT_APP_OPENCAGE_KEY,
          },
        });

        const userCoords = selectedRes.data.results[0].geometry;
        const destCoords = destinationRes.data.results[0].geometry;

        const meters = getDistance(
          { latitude: userCoords.lat, longitude: userCoords.lng },
          { latitude: destCoords.lat, longitude: destCoords.lng }
        );

        setDistance((meters / 1000).toFixed(1)); // in kilometers
      } catch (err) {
        console.error("Error calculating distance:", err);
      }
    };

    fetchDistance();
  }, [selectedCity, tour.destinationName]);

  const toggleCheck = (value, setState, state) => {
    setState(state.includes(value) ? state.filter(i => i !== value) : [...state, value]);
  };

  const getDeparturePrices = () => {
    if (!selectedDeparture) return { single: 0, couple: 0 };
    return {
      single: parseInt(selectedDeparture.singlePrice),
      couple: parseInt(selectedDeparture.couplePrice)
    };
  };

  const { single, couple } = getDeparturePrices();
  const total = (counts.males + counts.females) * single + counts.couples * couple;
const handlePayment = async () => {
  if (!selectedCity) {
    alert("Please select a departure city.");
    return;
  }
  if (!selectedDeparture) {
    alert("Please select a departure option.");
    return;
  }
  if (counts.couples === 0 && counts.males === 0 && counts.females === 0) {
    alert("Please select at least one tourist.");
    return;
  }
  if (selectedSpots.length === 0) {
    alert("Please select at least one tourist spot.");
    return;
  }
  if (selectedAccommodations.length === 0) {
    alert("Please select at least one accommodation.");
    return;
  }
  if (selectedActivities.length === 0) {
    alert("Please select at least one activity.");
    return;
  }

  try {
    const response = await api.post("/api/bookings/create", {
      destinationName: tour.destinationName,
      departureCity: selectedCity,
      touristSpots: selectedSpots,
      accommodations: selectedAccommodations,
      facilities: tour.facilities,
      activities: selectedActivities,
      couples: counts.couples,
      males: counts.males,
      females: counts.females,
      singlePrice: selectedDeparture?.singlePrice,
      couplePrice: selectedDeparture?.couplePrice,
      bookedBy: tour?.email || "guest",
    });

    if (response.data.success) {
      navigate("/payment", {
        state: {
          ...tour,
          selectedCity,
          distance,
          touristCounts: counts,
          selectedDeparture,
          selectedSpots,
          selectedAccommodations,
          selectedActivities,
          totalPrice: total,
          bookingId: response.data.data._id,
        },
      });
    } else {
      alert("Booking failed. Please try again.");
    }
  } catch (error) {
    console.error("Booking submission failed:", error);
    alert("Booking could not be completed.");
  }
};


  return (
    <Wrapper>
      <h1>📋 Tour Booking Details</h1>

      <Section>
        <label>🧭 Select your Departure City</label>
        <select onChange={e => setSelectedCity(e.target.value)} value={selectedCity}>
          <option value="">-- Choose City --</option>
          {citiesOfPakistan.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </Section>

      <Section>
        <label>🚏 Select Departure Option</label>
        {tour.departures.map((dep, i) => (
          <CheckboxLabel key={i}>
            <input
              type="radio"
              name="departure"
              onChange={() => setSelectedDeparture(dep)}
              checked={selectedDeparture?.city === dep.city}
            />
            <span>{dep.city} — Single: PKR {dep.singlePrice}, Couple: PKR {dep.couplePrice}</span>
          </CheckboxLabel>
        ))}
      </Section>

      <Section>
        <label>👥 Choose Tourist Type</label>
        <CounterSection>
          {['couples', 'males', 'females'].map((type) => (
            <div key={type}>
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              <button onClick={() => setCounts(c => ({ ...c, [type]: Math.max(0, c[type] - 1) }))}>-</button>
              <span>{counts[type]}</span>
              <button onClick={() => setCounts(c => ({ ...c, [type]: c[type] + 1 }))}>+</button>
            </div>
          ))}
        </CounterSection>
      </Section>

      <Section>
        <label>📍 Select Tourist Spots</label>
        {tour.touristSpots.map((spot, i) => (
          <CheckboxLabel key={i}>
            <input
              type="checkbox"
              checked={selectedSpots.includes(spot)}
              onChange={() => toggleCheck(spot, setSelectedSpots, selectedSpots)}
            />
            <span>{spot}</span>
          </CheckboxLabel>
        ))}
      </Section>

      <Section>
        <label>🏨 Choose Accommodations</label>
        {tour.accommodations.map((acc, i) => (
          <CheckboxLabel key={i}>
            <input
              type="checkbox"
              checked={selectedAccommodations.includes(acc)}
              onChange={() => toggleCheck(acc, setSelectedAccommodations, selectedAccommodations)}
            />
            <span>{acc}</span>
          </CheckboxLabel>
        ))}
      </Section>

      <Section>
        <label>🎯 Choose Activities</label>
        {activities.map((act, i) => (
          <CheckboxLabel key={i}>
            <input
              type="checkbox"
              checked={selectedActivities.includes(act)}
              onChange={() => toggleCheck(act, setSelectedActivities, selectedActivities)}
            />
            <span>{act}</span>
          </CheckboxLabel>
        ))}
      </Section>

      <Section>
        <label>✅ Facilities Included</label>
        <FacilityTags>
          {tour.facilities.map((f, i) => (
            <span key={i}>✅ {f}</span>
          ))}
        </FacilityTags>
      </Section>

      <Section>
        <Total>🧾 Total Price: <strong>PKR {total.toLocaleString()}</strong></Total>
        <p>📍 Distance to destination: {distance ? `${distance} km` : "Not available"}</p>
      </Section>

      <PayButton onClick={handlePayment}>💳 Pay for this Tour</PayButton>
    </Wrapper>
  );
};

export default TourPaymentProceed;


const Wrapper = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);

  h1 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    color: #0f172a;
    text-align: center;
  }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;

  label {
    font-weight: 700;
    color: #1e293b;
    display: block;
    margin-bottom: 0.5rem;
  }

  select {
    width: 100%;
    padding: 0.75rem;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
  }

  p {
    color: black;
  }
`;

const CounterSection = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    span {
      min-width: 70px;
      font-weight: 600;
      color: #1f2937;
    }

    button {
      padding: 0.4rem 0.8rem;
      background: #0ea5e9;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background: #0369a1;
      }
    }
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.3rem 0;
  font-weight: 600;
  color: #334155;

  input {
    accent-color: #0ea5e9;
  }

  span {
    font-size: 1rem;
  }
`;

const FacilityTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    background: #dbeafe;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    color: #1d4ed8;
    font-size: 0.9rem;
  }
`;

const Total = styled.p`
  font-size: 1.2rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  background: linear-gradient(to right, #0ea5e9, #0284c7);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #0369a1, #0ea5e9);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;
