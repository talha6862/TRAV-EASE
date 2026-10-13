import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function ServiceDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <Message>Service data not found.</Message>;

  return (
    <Container>
      <Card>
        <ImageWrapper>
          <img src={state.icon} alt={state.title} />
        </ImageWrapper>
        <Content>
          <h2>{state.title}</h2>
          <p>{state.subTitle}</p>
          <BackButton onClick={() => navigate(-1)}>⬅ Back to Services</BackButton>
        </Content>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  background: linear-gradient(to right, #fdfdfd, #e3f2fd);
  min-height: 100vh;
`;

const Card = styled.div`
  max-width: 800px;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 12px 30px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    max-width: 100px;
    height: auto;
  }
`;

const Content = styled.div`
  flex: 2;

  h2 {
    font-size: 1.8rem;
    color: #0077b6;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.05rem;
    color: #444;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const BackButton = styled.button`
  background-color: #0077b6;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #023e8a;
  }
`;

const Message = styled.div`
  text-align: center;
  padding: 5rem 1rem;
  font-size: 1.2rem;
  color: #d00000;
`;
