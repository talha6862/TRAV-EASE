import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../utils/Axios";
import { FaTrash } from "react-icons/fa";

const AdminUserItinerary = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await api.get("/api/trips");
      setTrips(res.data);
    } catch (err) {
      console.error("Error fetching trips", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await api.delete(`/api/trips/${id}`);
      setTrips(trips.filter(t => t._id !== id));
    } catch (err) {
      console.error("Error deleting trip", err);
    }
  };

  return (
    <Wrapper>
      <h1>🗺️ All User Trips</h1>
      <CardGrid>
        {trips.map(trip => (
          <Card key={trip._id}>
            <img src={`${process.env.REACT_APP_API_URL}/${trip.image}`} alt={trip.name} />
            <h3>{trip.name}</h3>
            <p><strong>Email:</strong> {trip.email}</p>
            <p><strong>Destination:</strong> {trip.destination}</p>
            <p><strong>Price:</strong> PKR {trip.totalPrice?.toLocaleString()}</p>
            <DeleteButton onClick={() => handleDelete(trip._id)}>
              <FaTrash /> Delete
            </DeleteButton>
          </Card>
        ))}
      </CardGrid>
    </Wrapper>
  );
};

export default AdminUserItinerary;

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
`;

const CardGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const Card = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
  }
    p{
    color:black;
    }
`;

const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  padding: 0.5rem;
  border: none;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #dc2626;
  }
`;
