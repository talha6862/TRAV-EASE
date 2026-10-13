// Updated: companyPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../utils/Axios';

export default function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // For Image Modal
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalCaption, setModalCaption] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get(`/admin/companies/${id}`);
        setCompany(res.data);
        setIsVerified(res.data.isVerified);
      } catch (err) {
        setError('Failed to load company details');
      }
    };
    fetchCompany();
  }, [id]);

  const handleApprove = async () => {
    try {
      await api.put(`/admin/companies/${id}/approve`);
      alert("Company approved successfully!");
      setIsVerified(true);
      setCompany((prev) => ({ ...prev, isVerified: true }));
      navigate('/admin/companies');
    } catch (err) {
      alert("Error approving company.");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/companies/${id}/reject`);
      alert("Company deleted successfully.");
      navigate("/admin/companies");
    } catch (err) {
      alert("Error deleting company.");
    }
  };

  const openModal = (imageUrl, caption) => {
    setModalImage(imageUrl);
    setModalCaption(caption);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (error) return <p>{error}</p>;
  if (!company) return <p>Loading...</p>;

  return (
    <Wrapper>
      <Card>
        <Title>{company.companyName}</Title>
        <Info><strong>Owner:</strong> {company.ownerName}</Info>
        <Info><strong>Address:</strong> {company.businessAddress}</Info>
        <Info><strong>City:</strong> {company.city}</Info>
        <Info><strong>Status:</strong> {isVerified ? "✅ Verified" : "❌ Pending"}</Info>
        
        <ImagePreview>
          <div>
            <img
              src={`http://localhost:8001/uploads/${company.registrationCertificate}`}
              alt="Registration Certificate"
              onClick={() => openModal(`http://localhost:8001/uploads/${company.registrationCertificate}`, "Registration Certificate")}
            />
            <Caption>Registration Certificate</Caption>
          </div>
          <div>
            <img
              src={`http://localhost:8001/uploads/${company.nationalId}`}
              alt="National ID"
              onClick={() => openModal(`http://localhost:8001/uploads/${company.nationalId}`, "National ID")}
            />
            <Caption>National ID</Caption>
          </div>
        </ImagePreview>

        <ButtonRow>
          <ApproveButton onClick={handleApprove} disabled={isVerified}>
            {isVerified ? "Approved" : "Approve Company"}
          </ApproveButton>
          <DisapproveButton onClick={handleDelete}>Delete Company</DisapproveButton>
        </ButtonRow>
      </Card>

      {showModal && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ZoomedImage src={modalImage} alt="Zoomed" />
            <ModalCaption>{modalCaption}</ModalCaption>
            <CloseButton onClick={closeModal}>×</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
}


const Wrapper = styled.div`
  padding: 2rem;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  min-height: 100vh;
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color:rgb(0, 0, 0);
  margin-bottom: 1rem;
`;

const Info = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color:black;
`;

const ImagePreview = styled.div`
  margin: 1.5rem 0;
  display: flex;
  gap: 1rem;

  img {
    max-width: 45%;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ApproveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #059669;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const DisapproveButton = styled(ApproveButton)`
  background: #ef4444;

  &:hover {
    background: #dc2626;
  }
`;
const Caption = styled.p`
  margin-top: 0.5rem;
  text-align: center;
  color: #333;
  font-weight: 500;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 1rem;
  position: relative;
  max-width: 90%;
  max-height: 90%;
  box-shadow: 0 0 30px rgba(0,0,0,0.3);
  text-align: center;
`;

const ZoomedImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  border-radius: 0.5rem;
`;

const ModalCaption = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ef4444;
  color: white;
  font-size: 1.4rem;
  padding: 0.5rem 0.8rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;
