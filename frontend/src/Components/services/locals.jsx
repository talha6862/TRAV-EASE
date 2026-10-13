import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Local = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchCity, setSearchCity] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/companies`);
        const data = await response.json();
        if (response.ok) {
          const verifiedCompanies = data.filter(c => c.isVerified);
          setCompanies(verifiedCompanies);
          setFilteredCompanies(verifiedCompanies);
        } else {
          setError(data.error || 'Failed to fetch companies');
        }
      } catch (err) {
        setError('Error: Server not responding');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCardClick = (company) => {
    navigate(`/services/company/${company._id}`, { state: { company } });
  };

  const handleRegisterClick = () => {
    navigate('/services/registerlocals');
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchCity(query);
    const filtered = companies.filter(c =>
      c.city?.toLowerCase().includes(query)
    );
    setFilteredCompanies(filtered);
  };

  return (
  <Container>
    <TopBar>
      <Title>Local Companies</Title>
      <RegisterButton onClick={handleRegisterClick}>
        Register Your Company
      </RegisterButton>
    </TopBar>

    <SearchInput
      type="text"
      placeholder="Search Local Companies by city..."
      value={searchCity}
      onChange={handleSearch}
    />

    {isLoading && <Message>Loading companies...</Message>}
    {!isLoading && error && <Message $error>{error}</Message>}
    {!isLoading && !error && filteredCompanies.length === 0 && (
      <Message>No verified companies found for this city.</Message>
    )}

    <CardContainer>
      {filteredCompanies.map((company) => (
        <Card key={company._id} onClick={() => handleCardClick(company)}>
          <CardTitle>{company.companyName}</CardTitle>
          <Description>{company.businessAddress}</Description>
          <Contact><strong>Contact:</strong> {company.ownerName}</Contact>
          <Contact><strong>City:</strong> {company.city || 'N/A'}</Contact>
        </Card>
      ))}
    </CardContainer>
  </Container>
);

};


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.3rem;
  font-weight: 700;
  color: #1e3a8a;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;
const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  width: 100%;
  max-width: 420px;
  border: 2px solid #3b82f6;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  background-color: #f8fafc;

  &:focus {
    outline: none;
    border-color: #1e40af;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.2);
  }

  @media (max-width: 640px) {
    width: 100%;
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const Message = styled.p`
  color: ${({ $error }) => ($error ? '#dc2626' : '#1e40af')};
  background-color: ${({ $error }) => ($error ? '#fee2e2' : '#e0f7fa')};
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-items: center;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;
const Card = styled.div`
  background: linear-gradient(135deg, #f0f4f8, #ffffff);
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 100%;
  max-width: 320px;
  height: auto;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.75rem;

  @media (max-width: 640px) {
    font-size: 1.4rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1rem;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

const Contact = styled.p`
  font-size: 0.95rem;
  color: #1e40af;
  font-weight: 500;

  strong {
    color: #1e3a8a;
  }

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

const RegisterButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(to right, #2563eb, #3b82f6);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #1e3a8a, #2563eb);
    box-shadow: 0 4px 15px rgba(30, 64, 175, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default Local;
