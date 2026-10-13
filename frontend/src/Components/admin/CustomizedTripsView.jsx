import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../utils/Axios";

const CustomizedTripsView = () => {
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const res = await api.get("/admin/trips");
      setTrips(res.data);
    } catch (error) {
      console.error("Failed to fetch trips:", error);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await api.delete(`/admin/trips/${id}`);
      fetchTrips();
    } catch (error) {
      console.error("Failed to delete trip:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <Wrapper>
      <Title>Customized Trips Dashboard</Title>
      <Grid>
        {trips.map((trip) => (
          <Card key={trip._id}>
            <TripTitle>{trip.destination}</TripTitle>
            <Detail><strong>Date:</strong> {trip.travelDate}</Detail>
            <Detail><strong>Budget:</strong> {trip.budget}</Detail>
            <Detail><strong>Persons:</strong> {trip.numberOfPersons}</Detail>
            <Detail><strong>Days:</strong> {trip.numberOfDays}</Detail>
            <Detail><strong>Tourist Spots:</strong> {trip.touristSpots?.join(", ") || 'N/A'}</Detail>
            <Detail><strong>Activities:</strong> {trip.activities?.join(", ")}</Detail>

            <Divider />

          <Detail>
  <strong>Submitted By:</strong>{" "}
  {trip.user
    ? `${trip.user.firstName || ""} ${trip.user.lastName || ""} (${trip.user.email})`
    : trip.email || "Unknown"}
</Detail>



            <DeleteButton onClick={() => deleteTrip(trip._id)}>🗑️ Delete</DeleteButton>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default CustomizedTripsView;


const Wrapper = styled.div`
  padding: 2rem;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #f6f8fa;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const TripTitle = styled.h3`
  font-size: 1.3rem;
  color: #1976d2;
  margin-bottom: 0.5rem;
`;

const Detail = styled.p`
  font-size: 0.95rem;
  color: #37474f;
  margin: 0.25rem 0;
`;


const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 1rem 0;
`;

const DeleteButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #dc2626;
  }
`;
