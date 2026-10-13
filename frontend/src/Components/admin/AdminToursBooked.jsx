// src/pages/admin/AdminUserTours.jsx
import { useEffect, useState } from "react";
import api from "../../utils/Axios";
import styled from "styled-components";

const AdminToursBooked = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await api.delete(`/api/bookings/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Wrapper>
      <h1>📋 All User Booked Tours</h1>
      <CardGrid>
        {bookings.map((book) => (
          <Card key={book._id}>
            <h3>{book.destinationName}</h3>
            <p><strong>Email:</strong> {book.bookedBy}</p>
            <p><strong>Departure:</strong> {book.departureCity}</p>
            <p><strong>Total Price:</strong> PKR {book.totalPrice}</p>
            <p><strong>Tourists:</strong> Couples: {book.couples}, Males: {book.males}, Females: {book.females}</p>
            <DeleteButton onClick={() => handleDelete(book._id)}>🗑 Delete</DeleteButton>
          </Card>
        ))}
      </CardGrid>
    </Wrapper>
  );
};

export default AdminToursBooked;

const Wrapper = styled.div`
  padding: 2rem;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  min-height: 100vh;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color:rgb(239, 241, 245);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  color: #1e293b;

  h3 {
    color: #1d4ed8;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.3rem 0;
    font-size: 0.95rem;
    color:black;
  }
`;

const DeleteButton = styled.button`
  margin-top: 1rem;
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #dc2626;
  }
`;
