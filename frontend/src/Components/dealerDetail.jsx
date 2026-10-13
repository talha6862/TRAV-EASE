import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const DealerDetail = () => {
  const { state } = useLocation();
  const dealer = state?.dealer;
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [days, setDays] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const user = JSON.parse(localStorage.getItem("UserInfo"));

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch('http://localhost:8001/admin/destinations');
        const data = await res.json();
        setDestinations(data);
      } catch (err) {
        console.error("Destination fetch error:", err);
      }
    };
    fetchDestinations();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit a booking request.");
      return navigate('/login/logininitial');
    }

const estimatedMin = Number(dealer.minPrice) * Number(days);
const estimatedMax = Number(dealer.maxPrice) * Number(days);

const bookingState = {
  dealer,
  userEmail: user?.email,
  destination: selectedDestination,
  days,
  estimatedMin,
  estimatedMax
};

   
  

  navigate('/services/dealer/summary', {
    state: bookingState
  });
   
  };

  const getVehicleImage = (type) => {
    switch (type?.toLowerCase()) {
      case 'car': return '/images/d3.png';
      case 'coaster': return '/images/d2.png';
      case 'bus': return '/images/d1.png';
      case 'jeep': return '/images/545688054-400x300.jpeg';
      case 'grand cabin': return '/images/images.jpeg';
      default: return '/images/default.png';
    }
  };

  if (!dealer) return <Message>No dealer selected.</Message>;

  return (
    <Wrapper>
      <Card>
        <Image src={getVehicleImage(dealer.vehicleType)} alt={dealer.vehicleType} />
        <Info>
          <Title>{dealer.dealerName}</Title>
          <Detail><strong>Company:</strong> {dealer.companyName}</Detail>
<Detail><strong>Vehicle Type:</strong> {dealer.vehicleType}</Detail>
<Detail><strong>Vehicle Model:</strong> {dealer.carModel || 'N/A'}</Detail>
<Detail><strong>Price Range:</strong> PKR {Number(dealer.minPrice).toLocaleString()} - {Number(dealer.maxPrice).toLocaleString()}</Detail>
<Detail><strong>Business Address:</strong> {dealer.businessAddress || 'N/A'}</Detail>

        </Info>
      </Card>

      <BookingForm onSubmit={handleSubmit}>
        <h3>Book This Vehicle</h3>

        <label>Email</label>
        <input type="email" value={user?.email || ''} disabled />

        <label>Destination</label>
        <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)} required>
          <option value="">Select a destination</option>
          {destinations.map((d) => (
            <option key={d._id} value={d.name}>{d.name}</option>
          ))}
        </select>

        <label>Number of Days</label>
        <input
          type="number"
          min={1}
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </BookingForm>
    </Wrapper>
  );
};

export default DealerDetail;
const Wrapper = styled.div`
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  min-height: 100vh;
  animation: fadeIn 1s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: scale(1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.01);
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-bottom: 3px solid #00b4d8;
`;

const Info = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #03045e;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Detail = styled.p`
  margin: 0.4rem 0;
  font-size: 1rem;
  color: #343a40;
`;

const BookingForm = styled.form`
  background: white;
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  animation: slideUp 0.8s ease-in-out;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h3 {
    color: #0077b6;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  label {
    font-weight: 600;
    color: #333;
  }

  input, select {
  background-color:white;
  color:black;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #0077b6;
      box-shadow: 0 0 5px rgba(0, 119, 182, 0.5);
    }
  }

  button {
    margin-top: 1rem;
    padding: 0.9rem;
    font-size: 1.1rem;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    background: linear-gradient(to right, #0077b6, #00b4d8);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(to right, #00b4d8, #0077b6);
      transform: scale(1.03);
    }
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.4rem;
  color: #d00000;
  padding: 3rem;
  font-weight: bold;
`;

