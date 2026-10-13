import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../utils/Axios";

const DealerVerification = () => {
  const [dealers, setDealers] = useState([]);
  const navigate = useNavigate();

  const fetchDealers = async () => {
    try {
      const res = await api.get("/admin/dealers");
      setDealers(res.data);
    } catch (error) {
      console.error("Failed to fetch dealers:", error);
    }
  };
  const handleDelete = async (dealerId, e) => {
  e.stopPropagation();
  const confirmDelete = window.confirm("Are you sure you want to delete this dealer?");
  if (!confirmDelete) return;

  try {
    await api.delete(`/admin/dealers/${dealerId}/reject`);
    setDealers(dealers.filter((dealer) => dealer._id !== dealerId));
  } catch (error) {
    console.error("Failed to delete dealer:", error);
  }
};


  useEffect(() => {
    fetchDealers();
  }, []);

  const handleCardClick = (dealerId) => {
    navigate(`/admin/dealers/${dealerId}`);
  };

  return (
    <Container>
      <Title>Dealer Verification Panel</Title>
      <DealerGrid>
        {dealers.map((dealer) => (
          <DealerCard key={dealer._id} onClick={() => handleCardClick(dealer._id)}>
             <DeleteButton onClick={(e) => handleDelete(dealer._id, e)}>🗑</DeleteButton>
            <DealerName>{dealer.dealerName || dealer.name}</DealerName>
            <Detail><strong>Company:</strong> {dealer.companyName}</Detail>
            <Detail><strong>Vehicle:</strong> {dealer.vehicleType}</Detail>
            <Detail>
              <strong>Status:</strong>{" "}
              <Status verified={dealer.isVerified}>
                {dealer.isVerified ? "✅ Verified" : "❌ Pending"}
              </Status>
            </Detail>
          </DealerCard>
        ))}
      </DealerGrid>
    </Container>
  );
};

export default DealerVerification;



const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);

 min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color:rgb(255, 255, 255);
  margin-bottom: 2rem;
  font-weight: bold;
`;

const DealerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const DealerCard = styled.div`
  position: relative; 
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;


const DealerName = styled.h3`
  font-size: 1.3rem;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const Detail = styled.p`
  font-size: 1rem;
  color: #4b5563;
  margin: 0.25rem 0;
`;

const Status = styled.span`
  color: ${({ verified }) => (verified ? "#10b981" : "#ef4444")};
  font-weight: bold;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #ef4444;
  cursor: pointer;

  &:hover {
    color: #b91c1c;
  }
`;

