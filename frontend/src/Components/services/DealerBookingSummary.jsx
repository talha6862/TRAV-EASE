import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const DealerBookingSummary = () => {
  const { state } = useLocation();

  if (!state) {
    return <Message>No booking information available.</Message>;
  }

  const {
    dealer = {},
    userEmail = 'N/A',
    destination = 'N/A',
    days = 0,
    estimatedMin = 0,
    estimatedMax = 0
  } = state;

  return (
    <Wrapper>
      <SummaryCard>
        <Header>Dealer Booking Summary</Header>

        <Section>
          <SectionTitle>User Info</SectionTitle>
          <Info><strong>Email:</strong> {userEmail}</Info>
        </Section>

        <Section>
          <SectionTitle>Dealer Info</SectionTitle>
          <Info><strong>Name:</strong> {dealer.dealerName || 'N/A'}</Info>
          <Info><strong>Email:</strong> {dealer.email || 'N/A'}</Info>
          <Info><strong>Phone:</strong> {dealer.phoneNumber || 'N/A'}</Info>
        </Section>

        <Section>
          <SectionTitle>Booking Details</SectionTitle>
          <Info><strong>Destination:</strong> {destination}</Info>
          <Info><strong>Number of Days:</strong> {days}</Info>
          <Info>
            <strong>Estimated Cost:</strong> 
            <Cost>Rs. {Number(estimatedMin).toLocaleString()} - {Number(estimatedMax).toLocaleString()}</Cost>
          </Info>
        </Section>
      </SummaryCard>
    </Wrapper>
  );
};

export default DealerBookingSummary;


const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
`;

const SummaryCard = styled.div`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  font-size: 1rem;

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

const Header = styled.h2`
  font-size: 1.8rem;
  color: #0077b6;
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 2px solid #0077b6;
  padding-bottom: 0.5rem;
`;

const Section = styled.div`
  margin-bottom: 1.8rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #023e8a;
  margin-bottom: 0.8rem;
  border-left: 4px solid #00b4d8;
  padding-left: 0.5rem;
`;

const Info = styled.p`
  font-size: 1.05rem;
  margin: 0.5rem 0;
  color: #333;

  strong {
    color: #1e3a8a;
    margin-right: 0.3rem;
  }
`;

const Cost = styled.span`
  color: #0077b6;
  font-weight: bold;
  margin-left: 0.5rem;
`;

const Message = styled.p`
  color: #ff4d4d;
  background-color: #fff0f0;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
`;
