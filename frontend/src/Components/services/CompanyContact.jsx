import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const CompanyContact = () => {
  const { state } = useLocation();
  const company = state?.company;

  if (!company) return <Message>Company information not available.</Message>;

  return (
    <Container>
      <Card>
        <h2>{company.companyName}</h2>
        <Info><strong>Owner:</strong> {company.ownerName || "N/A"}</Info>
        <Info><strong>Address:</strong> {company.businessAddress || "N/A"}</Info>
        <Info><strong>Phone Number:</strong> {company.phoneNumber || "N/A"}</Info>
        <Info>
          <strong>Verified:</strong>{" "}
          <Verified isVerified={company.isVerified}>
            {company.isVerified ? "Yes ✅" : "No ❌"}
          </Verified>
        </Info>
      </Card>
    </Container>
  );
};

export default CompanyContact;


const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.div`
  background: #ffffff;
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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

const Verified = styled.span`
  color: ${(props) => (props.isVerified ? "#16a34a" : "#dc2626")};
  font-weight: bold;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
  color: #dc2626;
`;
