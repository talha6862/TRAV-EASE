import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../utils/Axios"; 

const Tours = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await api.get("http://localhost:8001/api/tour-operators/all");
        setTours(res.data); 
      } catch (err) {
        console.error("Failed to fetch tours:", err);
      }
    };
    fetchTours();
  }, []);

  return (
    <Wrapper>
      <Header>
        <h1>Available Tours</h1>
        <RegisterButton onClick={() => navigate("/register-operator")}>
          Register as Tour Operator
        </RegisterButton>
      </Header>

      {tours.length === 0 ? (
        <NoTours>No tours available right now.</NoTours>
      ) : (
        <TourGrid>
          {tours.map((tour) => (
          <TourCard key={tour._id} onClick={() => navigate("/tour-detail", { state: tour })}>
  <img
    src={`http://localhost:8001/${tour.destinationImage}`}
    alt={tour.destinationName}
  />
  <h3>{tour.destinationName}</h3>
  <p><strong>Company:</strong> {tour.company}</p>
  <p><strong>Operated by:</strong> {tour.operatorName}</p>
  <p><strong>Duration:</strong> {tour.days} Days / {tour.nights} Nights</p>
</TourCard>

          ))}
        </TourGrid>
      )}
    </Wrapper>
  );
};

export default Tours;


const Wrapper = styled.div`
  padding: 3rem 2rem;
  min-height: 100vh;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  h1 {
    font-size: 2rem;
  color: #f9f9f9;
    margin-bottom: 1rem;
    font-weight: 700;
  }
`;

const RegisterButton = styled.button`
  background-color: #0077b6;
  color: #fff;
  padding: 0.75rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(0, 119, 182, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background-color: #023e8a;
    box-shadow: 0 8px 20px rgba(0, 62, 138, 0.4);
  }
`;

const NoTours = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #475569;
  margin-top: 2rem;
`;

const TourGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TourCard = styled.div`
  cursor: pointer;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding-bottom: 1.5rem;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  h3 {
    color: #0077b6;
    margin: 1rem 0 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  p {
    color: #334155;
    margin: 0.2rem 0;
    font-size: 0.9rem;
  }

  p strong {
    color: #1e3a8a;
  }
`;
