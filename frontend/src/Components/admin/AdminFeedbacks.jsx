import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../utils/Axios";

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("/admin/feedbacks");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await api.delete(`/admin/feedbacks/${id}`);
      setFeedbacks(feedbacks.filter((fb) => fb._id !== id));
    } catch (err) {
      console.error("Error deleting feedback:", err);
      alert("Failed to delete feedback.");
    }
  };

  return (
    <Wrapper>
      <h2>📬 User Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>No feedbacks received yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <Card key={fb._id}>
            <h4>👤 {fb.name}</h4>
            <p><strong>Email:</strong> {fb.email}</p>
            <p><strong>Message:</strong> {fb.message}</p>
            <small>{new Date(fb.submittedAt).toLocaleString()}</small>
            <DeleteButton onClick={() => handleDelete(fb._id)}>Delete</DeleteButton>
          </Card>
        ))
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #1d3557;
  }
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  h4 {
    margin: 0;
    font-size: 1.3rem;
    color: #0077b6;
  }

  p {
    margin: 0.3rem 0;
    font-size: 1rem;
    color: #333;
  }

  small {
    display: block;
    margin-top: 0.5rem;
    color: #777;
  }
`;

const DeleteButton = styled.button`
  background-color: #e63946;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 0.7rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #d62828;
  }
`;
