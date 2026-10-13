import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../utils/Axios";

const TourOperatorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [operator, setOperator] = useState(null);

  useEffect(() => {
    const fetchOperator = async () => {
      try {
        const res = await api.get(`admin/tour-operators/${id}`);
        setOperator(res.data);
      } catch (error) {
        console.error("Failed to fetch operator details", error);
      }
    };
    fetchOperator();
  }, [id]);

  const handleVerify = async () => {
  try {
    await api.put(`admin/tour-operators/${id}/approve`);
    setOperator((prev) => ({ ...prev, isVerified: true }));
    alert("Operator Verified!"); 
    navigate("/admin/tour-op"); 
  } catch (err) {
    console.error("Verification failed", err);
  }
};

  const handleDelete = async () => {
    try {
      await api.delete(`admin/tour-operators/${id}`);
      alert("Operator Deleted!");
      navigate("/admin/tour-op");
    } catch (err) {
      console.error("Deletion failed", err);
    }
  };

  if (!operator) return <p>Loading...</p>;

  return (
    <Wrapper>
      <Card>
        <img src={`http://localhost:8001/${operator.destinationImage}`} alt="destination" />
        <h2>{operator.operatorName}</h2>
        <p><strong>Company:</strong> {operator.company}</p>
        <p><strong>Email:</strong> {operator.email}</p>
        <p><strong>Phone:</strong> {operator.phone}</p>
        <Actions>
          <button onClick={handleVerify} disabled={operator.isVerified}>
            {operator.isVerified ? "Verified" : "Verify"}
          </button>
          <button onClick={handleDelete}>Delete</button>
        </Actions>
      </Card>
    </Wrapper>
  );
};

export default TourOperatorDetail;

const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
   background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);

  min-height: 100vh;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;

  img {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
  }

  h2 {
    margin-top: 1rem;
    color: #0077b6;
  }

  p {
    margin: 0.5rem 0;
    color: #333;
  }
`;

const Actions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;

    &:first-child {
      background-color: #007f5f;
      color: white;

      &:hover {
        background-color: #004e37;
      }
    }

    &:last-child {
      background-color: #ef233c;
      color: white;

      &:hover {
        background-color: #ba1b2a;
      }
    }
  }
`;
