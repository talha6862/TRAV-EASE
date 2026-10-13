import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CompanyDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const company = state?.company;
  const user = JSON.parse(localStorage.getItem("UserInfo"));

  const handleContactClick = () => {
    if (!user) {
      alert("You must be logged in to contact this company.");
      return navigate('/login/logininitial');
    }
    navigate("/services/companycontact", { state: { company } });
  };

  if (!company) {
    return <Message>Company not found.</Message>;
  }

  return (
    <DetailContainer>
      <Card>
        <h1>{company.companyName}</h1>
        <Info><strong>Owner:</strong> {company.ownerName}</Info>
        <Info><strong>Address:</strong> {company.businessAddress}</Info>

        <BookButton onClick={handleContactClick}>Contact</BookButton>
      </Card>
    </DetailContainer>
  );
};

export default CompanyDetail;


const DetailContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  padding: 2rem;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;

  h1 {
    color: #023e8a;
    margin-bottom: 1.5rem;
  }
`;

const Info = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #333;

  strong {
    color: #0077b6;
    margin-right: 0.5rem;
  }
`;

const BookButton = styled.button`
  margin-top: 2rem;
  background: #0077b6;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #023e8a;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  padding: 3rem;
  color: #dc2626;
`;
