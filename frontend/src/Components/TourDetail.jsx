import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const TourDetail = () => {
  const { state: tour } = useLocation();
  const navigate = useNavigate();

  if (!tour) return <Message>No tour information available</Message>;

  const handleMoreInfo = () => {
    const user = JSON.parse(localStorage.getItem("UserInfo"));
    if (!user) {
      alert("Please login to view more tour information.");
      navigate("/login/logininitial");
    } else {
      navigate("/tour-info", { state: tour });
    }
  };

  return (
    <Wrapper>
      <Card>
        <ImageWrapper>
          <img
            src={`${process.env.REACT_APP_API_URL}/${tour.destinationImage}`}
            alt={tour.destinationName}
          />
        </ImageWrapper>
        <Info>
          <h1>{tour.destinationName}</h1>
          <Badge>{tour.company}</Badge>
          <DetailRow><strong>Operated by:</strong> {tour.operatorName}</DetailRow>
          <DetailRow><strong>Price:</strong> <Price>PKR {tour.price.toLocaleString()}</Price></DetailRow>
          <MoreInfoButton onClick={handleMoreInfo}>View Details</MoreInfoButton>
        </Info>
      </Card>
    </Wrapper>
  );
};

export default TourDetail;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  min-height: 100vh;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1000px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    max-height: 400px;
    object-fit: cover;
    transition: transform 0.4s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Info = styled.div`
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 2.4rem;
    color: #1e3a8a;
    margin-bottom: 0.8rem;
  }
`;

const DetailRow = styled.p`
  font-size: 1.1rem;
  color: #374151;
  margin: 0.5rem 0;

  strong {
    color: #0f172a;
  }
`;

const Price = styled.span`
  color: #16a34a;
  font-weight: bold;
  font-size: 1.2rem;
`;

const MoreInfoButton = styled.button`
  margin-top: 2rem;
  padding: 0.9rem 1.8rem;
  background: linear-gradient(to right, #0ea5e9, #0284c7);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(14, 165, 233, 0.3);
  }
`;

const Badge = styled.span`
  background: #f97316;
  color: white;
  font-size: 0.85rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  align-self: flex-start;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Message = styled.p`
  padding: 4rem;
  font-size: 1.5rem;
  color: white;
  text-align: center;
`;
