import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const cities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Hyderabad', 'Sialkot',
  'Bahawalpur', 'Sargodha', 'Gujranwala', 'Abbottabad', 'Mardan',
  'Sukkur', 'Larkana', 'Rahim Yar Khan', 'Dera Ghazi Khan', 'Mirpur'
];


const Register = () => {
  const [ownerName, setOwnerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationCertificate, setRegistrationCertificate] = useState(null);
  const [nationalId, setNationalId] = useState(null);
  const [message, setMessage] = useState('');
  const [city, setCity] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
  
    try {
      const formData = new FormData();
     formData.append("ownerName", ownerName);
     formData.append("companyName", companyName);
     formData.append("businessAddress", businessAddress);
     formData.append("phoneNumber", phoneNumber);
     formData.append("registrationCertificate", registrationCertificate);
     formData.append("nationalId", nationalId);
     formData.append("city", city);

  
      for (let pair of formData.entries()) {
  console.log(`${pair[0]}: ${pair[1]}`);
}
     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, 
      {
     method: 'POST',
     body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Registration successful Wait for Admins Appoval');
        setOwnerName('');
        setCompanyName('');
        setBusinessAddress('');
        setPhoneNumber('');
         setCity('');
        setRegistrationCertificate(null);
        setNationalId(null);
       
      } else {
        setMessage(`❌ ${data.error || 'Registration failed'}`);
      }
    } 
    catch (error) {
      setMessage('❌ Error: Server not responding');
      console.error('Fetch error:', error);
    } 
  };

  return (
    <Container>
      <Title>Register Your Local Service</Title>
<Message success={message.includes('✅') ? 'true' : undefined}>{message}</Message>
      <StyledForm onSubmit={handleSubmit}>
        <InputField>
          <Label>Owners Name:</Label>
          <Input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </InputField>
        <InputField>
          <Label>Company Name:</Label>
          <Input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder="Enter your company name"
          />
        </InputField>
        <InputField>
          <Label>Business Address:</Label>
          <Input
            type="text"
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            required
            placeholder="Enter your business address"
          />
        </InputField>
        <InputField>
  <Label>Phone Number:</Label>
  <Input
    type="tel"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    required
    placeholder="e.g. 0300-1234567"
    pattern="[0-9]{4}[0-9]{7}"
    title="Phone number must follow the format: 0300-1234567"
  />
</InputField>
<InputField>
  <Label>City:</Label>
  <Select value={city} onChange={(e) => setCity(e.target.value)} required>
    <option value="">Select a city</option>
    {cities.map((cityName) => (
      <option key={cityName} value={cityName}>
        {cityName}
      </option>
    ))}
  </Select>
</InputField>

        <InputField>
          <Label>Registration Certificate:</Label>
          <FileInput
            type="file"
            onChange={(e) => setRegistrationCertificate(e.target.files[0])}
            required
          />
        </InputField>
        <InputField>
          <Label>National ID Card:</Label>
          <FileInput
            type="file"
            onChange={(e) => setNationalId(e.target.files[0])}
            required
          />
        </InputField>
        <SubmitButton type="submit">
          Submit
          </SubmitButton>
      </StyledForm>
    </Container>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
  background: linear-gradient(135deg, #e0f7fa, #ffffff);
  border-radius: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
  
  @media (max-width: 640px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const Message = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ success }) => (success ? '#059669' : '#dc2626')};
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  background-color: ${({ success }) => (success ? '#d1fae5' : '#fee2e2')};
  border-radius: 0.5rem;
  animation: ${fadeIn} 0.5s ease-in;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #3b82f6;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  background-color: #f8fafc;
  color:black;
  
  &:focus {
    outline: none;
    border-color: #1e40af;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.2);
  }

  &:hover {
    border-color: #2563eb;
  }

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 640px) {
    font-size: 0.875rem;
    padding: 0.5rem;
  }
`;

const FileInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #3b82f6;
  border-radius: 0.75rem;
  background-color: #f8fafc;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2563eb;
  }

  @media (max-width: 640px) {
    font-size: 0.875rem;
    padding: 0.4rem;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(90deg, #1e40af, #3b82f6);
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(90deg, #1e3a8a, #2563eb);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(30, 64, 175, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
    padding: 0.75rem;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #3b82f6;
  border-radius: 0.75rem;
  background-color: #f8fafc;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1e40af;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.2);
  }

  &:hover {
    border-color: #2563eb;
  }

  @media (max-width: 640px) {
    font-size: 0.875rem;
    padding: 0.5rem;
  }
`;

export default Register;