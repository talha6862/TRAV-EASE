import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../utils/Axios";

const AdminTourOperators = () => {
  const [operators, setOperators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const res = await api.get('admin/tour-operators');
        setOperators(res.data);
      } catch (err) {
        console.error("Failed to fetch operators", err);
      }
    };
    fetchOperators();
  }, []);

  return (
    <Container>
      <h2>Tour Operator Verification</h2>
      <Grid>
        {operators.map((operator) => (
          <Card
            key={operator._id}
            onClick={() => navigate(`/admin/tour-op-detail/${operator._id}`)}
          >
            <img
              src={`http://localhost:8001/${operator.destinationImage}`}
              alt="destination"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/default.png"; // fallback image
              }}
            />
            <h3>{operator.operatorName}</h3>
            <p><strong>Company:</strong> {operator.company}</p>
            <p><strong>Destination:</strong> {operator.destinationName}</p>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminTourOperators;


const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  min-height: 100vh;
  h2{
  justify-content:center;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
  }

  h3 {
    margin-top: 1rem;
    color: #0077b6;
  }

  p {
    margin: 0.3rem 0;
    color: #333;
  }
`;
