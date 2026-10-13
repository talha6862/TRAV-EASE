import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../utils/Axios';

export default function VerifyCompanies() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      const res = await api.get('/admin/companies');
      setCompanies(res.data);
    } catch (error) {
      console.error("Failed to fetch companies");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/admin/companies/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await api.delete(`/admin/companies/${id}/reject`);
        alert("Company deleted.");
        fetchCompanies(); // Refresh list
      } catch (err) {
        alert("Error deleting company.");
      }
    }
  };

  return (
    <Container>
      <Title>Verify Registered Companies</Title>
      <CompanyGrid>
        {companies.map((c) => (
          <CompanyCard key={c._id}>
            <CardContent onClick={() => handleCardClick(c._id)}>
              <CompanyName>{c.companyName}</CompanyName>
              <Info><strong>Address:</strong> {c.businessAddress}</Info>
              <Info><strong>Owner:</strong> {c.ownerName}</Info>
              <Status verified={c.isVerified}>
                {c.isVerified ? "✅ Verified" : "❌ Pending"}
              </Status>
            </CardContent>
            <DeleteButton onClick={() => handleDelete(c._id)}>🗑️</DeleteButton>
          </CompanyCard>
        ))}
      </CompanyGrid>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);

`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color:rgb(255, 255, 255);
`;

const CompanyGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const CompanyCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardContent = styled.div`
  cursor: pointer;
`;

const CompanyName = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #2563eb;
`;

const Info = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  color: #374151;
`;

const Status = styled.span`
  display: inline-block;
  margin-top: 1rem;
  font-weight: 600;
  color: ${({ verified }) => (verified ? "#10b981" : "#ef4444")};
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #dc2626;
  cursor: pointer;

  &:hover {
    color: #b91c1c;
  }
`;
