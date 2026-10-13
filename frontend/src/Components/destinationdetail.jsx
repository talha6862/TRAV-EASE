import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DestinationDetail() {
  const { state: places } = useLocation();
  const navigate = useNavigate();

  if (!places) return <p>Destination not found</p>;

  const {
    name,
    description,
    image,
    price,
    days,
    nights,
    activities,
    touristSpots,
    vehicleTypes,
    accommodations,
    touristTypes,
    facilities,
  } = places;

  const handleMoreInfo = () => {
    navigate("/places-info", { state: places });
  };

  return (
    <Container>
      <ImageWrapper>
        <img src={`${process.env.REACT_APP_API_URL}/${image}`} alt={name} />
      </ImageWrapper>
      <Content>
        <h1>{name}</h1>
        <p>{description}</p>

        <InfoGroup>
          <InfoRow><strong>Price:</strong> PKR {price?.toLocaleString()}</InfoRow>
          <InfoRow><strong>Duration:</strong> {days} Days / {nights} Nights</InfoRow>
        </InfoGroup>

        {activities?.length > 0 && (
          <ListSection>
            <h3>Activities Included</h3>
            <ul>{activities.map((act, idx) => <li key={idx}>🎯 {act}</li>)}</ul>
          </ListSection>
        )}

        {touristSpots?.length > 0 && (
          <ListSection>
            <h3>Top Tourist Spots</h3>
            <ul>
              {touristSpots.map((spot, idx) => {
                const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(spot.trim())}`;
                return (
                  <li key={idx}>
                    📍{" "}
                    <a href={wikiUrl} target="_blank" rel="noopener noreferrer">
                      {spot}
                    </a>
                  </li>
                );
              })}
            </ul>
          </ListSection>
        )}

        {vehicleTypes?.length > 0 && (
          <ListSection>
            <h3>Vehicle Types</h3>
            <ul>{vehicleTypes.map((v, idx) => <li key={idx}>🚗 {v}</li>)}</ul>
          </ListSection>
        )}

        {accommodations?.length > 0 && (
          <ListSection>
            <h3>Accommodations</h3>
            <ul>{accommodations.map((a, idx) => <li key={idx}>🏨 {a}</li>)}</ul>
          </ListSection>
        )}

        {touristTypes?.length > 0 && (
          <ListSection>
            <h3>Tourist Preferences</h3>
            <ul>{touristTypes.map((t, idx) => <li key={idx}>🧍 {t}</li>)}</ul>
          </ListSection>
        )}

        {facilities?.length > 0 && (
          <ListSection>
            <h3>Facilities</h3>
            <ul>{facilities.map((f, idx) => <li key={idx}>✅ {f}</li>)}</ul>
          </ListSection>
        )}

        <MoreInfoButton onClick={handleMoreInfo}>More Info</MoreInfoButton>
      </Content>
    </Container>
  );
}


const Container = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  border-radius: 1.2rem;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.5s ease-in-out;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: auto;
    transition: transform 0.5s ease;
    border-radius: 1rem;
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

const Content = styled.div`
  h1 {
    font-size: 3rem;
    color:rgb(165, 186, 245);
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    color:rgb(165, 186, 245);
    margin-bottom: 2rem;
    line-height: 1.8;
  }
`;

const InfoGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
`;

const InfoRow = styled.div`
  background: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 1.1rem;
  color: #1f2937;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  strong {
    color: #0f172a;
  }
`;

const ListSection = styled.div`
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.2rem;
    margin: 0;
    list-style: none;

    li {
      font-size: 1.1rem;
      color: #334155;
      margin-bottom: 0.5rem;
    }

    li a {
      color: #2563eb;
      font-weight: 500;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: #1d4ed8;
      }
    }
  }
`;

const MoreInfoButton = styled.button`
  margin-top: 2.5rem;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  background: linear-gradient(to right, #0ea5e9, #0284c7);
  color: #ffffff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #0369a1, #0ea5e9);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

