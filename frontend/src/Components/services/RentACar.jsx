import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RentACar = () => {
  const navigate = useNavigate();
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState('');

  const handleDealerButtonClick = () => {
    navigate('/dealer');
  };

  const fetchDealers = async () => {
    try {
      const response = await fetch('http://localhost:8001/dealers');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setDealers(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const getVehicleImage = (type) => {
    const lower = type?.toLowerCase();
    switch (lower) {
      case 'car':
        return '/images/d3.png';
      case 'coaster':
        return '/images/d2.png';
      case 'bus':
        return '/images/d1.png';
      case 'jeep':
        return '/images/545688054-400x300.jpeg';
      case 'grand cabin':
        return '/images/images.jpeg';
      default:
        return '/images/default.png';
    }
  };

  const vehicleTypes = ['Car', 'Coaster', 'Bus', 'Jeep', 'Grand Cabin'];

  // Filter by city and verified dealers
  const filteredDealers = dealers.filter(
    (d) =>
      d.isVerified &&
      (!searchCity || d.city?.toLowerCase().includes(searchCity.toLowerCase()))
  );

  return (
    <Container>

      <HeaderRow>
  <h1>Rent a Vehicle</h1>
  <DealerButton onClick={handleDealerButtonClick}>
    Register as a Dealer
  </DealerButton>
</HeaderRow>
      
      <p>Select from our registered dealers categorized by vehicle type.</p>

      <SearchInput
        type="text"
        placeholder="Search by city..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />

    

      {loading && <p>Loading dealers...</p>}
      {error && <p>Error: {error}</p>}

      {vehicleTypes.map((category) => {
        const categoryDealers = filteredDealers.filter(
          (d) => (d.vehicleType || '').toLowerCase() === category.toLowerCase()
        );

        return (
          <div key={category}>
            <h2>{category}s</h2>
            {categoryDealers.length === 0 ? (
              <p>No dealers found in this city for {category}s.</p>
            ) : (
             <DealersList>
  {categoryDealers.map((dealer) => (
    <DealerItem
      key={dealer._id}
      onClick={() =>
        navigate(`/dealer/${dealer._id}`, { state: { dealer } })
      }
    >
      <img
        src={getVehicleImage(dealer.vehicleType)}
        alt={dealer.vehicleType}
      />
      <h3>{dealer.dealerName}</h3>
      <p><strong>Company:</strong> {dealer.companyName}</p>
      <p><strong>Business Address:</strong> {dealer.businessAddress || 'N/A'}</p>
      <p><strong>City:</strong> {dealer.city || 'N/A'}</p>
      <p><strong>Vehicle Type:</strong> {dealer.vehicleType}</p>
      <p><strong>Car Model:</strong> {dealer.carModel || 'N/A'}</p>

      <PriceTag>
        PKR {dealer.minPrice?.toLocaleString()} to {dealer.maxPrice?.toLocaleString()}
      </PriceTag>
    </DealerItem>
  ))}
</DealersList>

            )}
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  padding: 3rem 1rem;
  max-width: 1300px;
  margin: auto;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  border-radius: 1rem;

  h1 {
    font-size: 2.4rem;
  color: #f9f9f9;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: #006d77;
    margin-bottom: 1.5rem;
  }

  h2 {
    margin: 2.5rem 0 1rem;
    color: #0077b6;
    font-size: 1.6rem;
    border-bottom: 2px solid #caf0f8;
    padding-bottom: 0.4rem;
    text-align: left;
  }
`;
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;

  h1 {
    font-size: 2.4rem;
    color: #f9f9f9;
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SearchInput = styled.input`
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  width: 100%;
  max-width: 420px;
  border: 2px solid #00b4d8;
  border-radius: 10px;
  background-color: #f1f9ff;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0077b6;
    box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.2);
  }
`;
const DealerButton = styled.button`
  background: linear-gradient(to right, #0077b6, #00b4d8);
  color: #ffffff;
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 183, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(to right, #023e8a, #0096c7);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 119, 182, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;


const DealersList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 0.5rem 0;
`;

const DealerItem = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem 1rem 2.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);
  }

  h3 {
    color: #0077b6;
    font-size: 1.3rem;
    margin-top: 0.6rem;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 0.95rem;
    color: #374151;
    margin-bottom: 0.4rem;
  }
`;

const PriceTag = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: #00b4d8;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
`;


export default RentACar;
