// src/pages/UserItineraryTrips.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../utils/Axios";
import { toast } from "react-toastify";

const UserItineraryTrips = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [trips, setTrips] = useState([]);

  const verifyOperatorEmail = async () => {
    try {
      const res = await api.get("/api/tour-operators/all"); 
      const match = res.data.find(op => op.email === emailInput);

      if (match) {
        setIsVerified(true);
        toast.success("Access granted.");
      } else {
        toast.error("Email not recognized as a registered tour operator.");
      }
    } catch (err) {
      toast.error("Verification failed.");
    }
  };

  useEffect(() => {
    const fetchTrips = async () => {
      if (!isVerified) return;
      try {
        const res = await api.get("/api/trips");
        setTrips(res.data);
      } catch (err) {
        toast.error("Failed to fetch trips.");
      }
    };

    fetchTrips();
  }, [isVerified]);

  if (!isVerified) {
    return (
      <Dialog>
        <h3>Operator Verification</h3>
        <input
          type="email"
          placeholder="Enter your tour operator email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <button onClick={verifyOperatorEmail}>Verify</button>
      </Dialog>
    );
  }

  return (
    <Container>
      <h2>All User Itinerary Trips</h2>
      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        trips.map((trip, idx) => (
          <TripCard key={idx}>
            <p><strong>User Email:</strong> {trip.email}</p>
            <p><strong>Destination:</strong> {trip.destination}</p>
            <p><strong>Travel Date:</strong> {new Date(trip.travelDate).toLocaleDateString()}</p>
            <p><strong>Budget:</strong> PKR {trip.budget?.toLocaleString()}</p>
            <p><strong>Persons:</strong> {trip.numberOfPersons}</p>
            <p><strong>Days:</strong> {trip.numberOfDays}</p>
            <p><strong>Activities:</strong> {trip.activities?.join(", ")}</p>
          </TripCard>
        ))
      )}
    </Container>
  );
};

export default UserItineraryTrips;

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
`;

const TripCard = styled.div`
  border-left: 4px solid #0ea5e9;
  background: #f9fafb;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  p{
  color:black;
  }
`;

const Dialog = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  text-align: center;

  input {
    width: 100%;
    padding: 0.8rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  button {
    background: #0ea5e9;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;
