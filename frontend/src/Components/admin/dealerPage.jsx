import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../utils/Axios";

const DealerDetail = () => {
  const { dealerId } = useParams();
  const navigate = useNavigate();
  const [dealer, setDealer] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const res = await api.get(`/admin/dealers`);
        const match = res.data.find((d) => d._id === dealerId);
        setDealer(match);
        if (match?.isVerified) {
          setIsApproved(true);
        }
      } catch (error) {
        console.error("Error loading dealer:", error);
      }
    };

    fetchDealer();
  }, [dealerId]);

  const handleApprove = async () => {
    try {
      await api.put(`/admin/dealers/${dealerId}/approve`);
      alert("Dealer Approved");
      setIsApproved(true);
    } catch (error) {
      console.error("Error approving dealer:", error);
    }
  };

  const handleDisapprove = async () => {
    try {
      await api.delete(`/admin/dealers/${dealerId}/reject`);
      alert("Dealer Disapproved and Deleted");
      navigate("/admin/dealers");
    } catch (error) {
      console.error("Error deleting dealer:", error);
    }
  };

  const openZoom = (imgUrl) => setZoomedImage(imgUrl);
  const closeZoom = () => setZoomedImage(null);

  if (!dealer) return <Container>Loading dealer data...</Container>;

  return (
    <Container>
      <Title>{dealer.companyName} Details</Title>
      <Detail><strong>Company:</strong> {dealer.dealerName}</Detail>
      <Detail><strong>Vehicle:</strong> {dealer.vehicleType}</Detail>
      <Detail><strong>Car Model:</strong> {dealer.carModel}</Detail>
      <Detail><strong>Minimum Price:</strong> PKR {Number(dealer.minPrice).toLocaleString()}</Detail>
      <Detail><strong>Maximum Price:</strong> PKR {Number(dealer.maxPrice).toLocaleString()}</Detail>
       <Detail><strong>City:</strong> {dealer.city}</Detail>
      <ImageGroup>
        <ImageWrapper>
          <img
            src={`http://localhost:8001/${dealer.licenseImage}`}
            alt="License"
            onClick={() => openZoom(`http://localhost:8001/${dealer.licenseImage}`)}
          />
          <Caption>License Image</Caption>
        </ImageWrapper>
        <ImageWrapper>
          <img
            src={`http://localhost:8001/${dealer.dealershipCertificate}`}
            alt="Certificate"
            onClick={() => openZoom(`http://localhost:8001/${dealer.dealershipCertificate}`)}
          />
          <Caption>Dealership Certificate</Caption>
        </ImageWrapper>
      </ImageGroup>

      <ButtonGroup>
        <Button approve onClick={handleApprove} disabled={isApproved}>
          {isApproved ? "Approved" : "Approve Dealer"}
        </Button>
        {!isApproved && (
          <Button onClick={handleDisapprove}>Disapprove Dealer</Button>
        )}
      </ButtonGroup>

      {zoomedImage && (
        <Modal onClick={closeZoom}>
          <ModalImage src={zoomedImage} alt="Zoomed" />
        </Modal>
      )}
    </Container>
  );
};

export default DealerDetail;

// Styled Components

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  background-color: white;
  color: black;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: black;
  margin-bottom: 1rem;
`;

const Detail = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: black;
`;

const ImageGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1.5rem 0;

  img {
    width: 300px;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white;
  background-color: ${(props) => (props.approve ? "#10b981" : "#ef4444")};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Caption = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  color: black;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 1rem;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
`;
