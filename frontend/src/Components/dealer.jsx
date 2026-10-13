import { useState } from 'react';
import styled from 'styled-components';

const DealerPage = () => {
  const [formData, setFormData] = useState({
    dealerName: '',
    companyName: '',
    phoneNumber: '',
    businessAddress: '',
    city: '',
    licenseImage: null,
    chassisNumber: '',
    vehicleType: 'Car',
    carModel: '',
    minPrice: '',
    maxPrice: '',
    dealershipCertificate: null,
    
  });
  const cities = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Quetta",
  "Multan", "Faisalabad", "Sialkot", "Gujranwala", "Bahawalpur",
  "Sargodha", "Hyderabad", "Sukkur", "Abbottabad", "Mardan", "Swat",
  "Muzaffarabad", "Mirpur", "Gilgit", "Skardu", "Gwadar", "Khuzdar"
];


  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.dealerName.trim()) newErrors.dealerName = 'Dealer name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.businessAddress.trim()) newErrors.businessAddress = 'Business address is required';
    if (!formData.licenseImage) newErrors.licenseImage = 'License image is required';
    if (!formData.chassisNumber.trim()) newErrors.chassisNumber = 'Chassis number is required';
    if (!formData.dealershipCertificate) newErrors.dealershipCertificate = 'Dealership certificate is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.carModel.trim()) newErrors.carModel = 'Car model is required';
if (!formData.minPrice || isNaN(formData.minPrice)) newErrors.minPrice = 'Valid minimum price is required';
if (!formData.maxPrice || isNaN(formData.maxPrice)) newErrors.maxPrice = 'Valid maximum price is required';


    if (!['Car', 'Coaster', 'Bus', 'Jeep', 'Grand Cabin'].includes(formData.vehicleType)) {
      newErrors.vehicleType = 'Invalid vehicle type';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/dealers`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message || 'Dealer information saved Wait for Admins Appoval');
        setFormData({
          dealerName: '',
          companyName: '',
          phoneNumber: '',
          email: '',
          city:'',
          businessAddress: '',
          licenseImage: null,
          chassisNumber: '',
          vehicleType: 'Car',
           carModel: '',
            minPrice: '',
          maxPrice: '',
          dealershipCertificate: null,
        });
        document.getElementById('licenseImage').value = '';
        document.getElementById('dealershipCertificate').value = '';
      } else {
        setErrorMessage(data.message || 'Failed to save dealer information');
      }
    } catch (error) {
      setErrorMessage('Network error or server is unreachable. Please try again later.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Dealer Registration</Title>
      <FullWidth>
  {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
  {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
</FullWidth>
        <Form onSubmit={handleSubmit}>
          <InputField>
            <Label htmlFor="dealerName">Dealer Name</Label>
            <Input type="text" id="dealerName" name="dealerName" value={formData.dealerName} onChange={handleChange} hasError={!!errors.dealerName} required />
            {errors.dealerName && <ErrorText>{errors.dealerName}</ErrorText>}
          </InputField>

          <InputField>
            <Label htmlFor="companyName">Company Name</Label>
            <Input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} hasError={!!errors.companyName} required />
            {errors.companyName && <ErrorText>{errors.companyName}</ErrorText>}
          </InputField>

          <InputField>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} hasError={!!errors.phoneNumber} required />
            {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}
          </InputField>
          <InputField>
          <InputField>
  <Label htmlFor="city">City</Label>
  <Select
    id="city"
    name="city"
    value={formData.city}
    onChange={handleChange}
    hasError={!!errors.city}
    required
  >
    <option value="">Select a city</option>
    {cities.map((city) => (
      <option key={city} value={city}>{city}</option>
    ))}
  </Select>
  {errors.city && <ErrorText>{errors.city}</ErrorText>}
</InputField>

  <Label htmlFor="email">Email</Label>
  <Input
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    hasError={!!errors.email}
    required
  />
  {errors.email && <ErrorText>{errors.email}</ErrorText>}
</InputField>

          <InputField>
            <Label htmlFor="businessAddress">Business Address</Label>
            <Input type="text" id="businessAddress" name="businessAddress" value={formData.businessAddress} onChange={handleChange} hasError={!!errors.businessAddress} required />
            {errors.businessAddress && <ErrorText>{errors.businessAddress}</ErrorText>}
          </InputField>

          <InputField>
  <Label htmlFor="carModel">Vehicle Model and Name</Label>
  <Input
    type="text"
    id="carModel"
    name="carModel"
    value={formData.carModel}
    onChange={handleChange}
    hasError={!!errors.carModel}
    required
  />
  {errors.carModel && <ErrorText>{errors.carModel}</ErrorText>}
</InputField>

<InputField>
  <Label htmlFor="minPrice">Minimum Price (PKR)</Label>
  <Input
    type="number"
    id="minPrice"
    name="minPrice"
    step="500"
    value={formData.minPrice}
    onChange={handleChange}
    hasError={!!errors.minPrice}
    required
  />
  {errors.minPrice && <ErrorText>{errors.minPrice}</ErrorText>}
</InputField>

<InputField>
  <Label htmlFor="maxPrice">Maximum Price (PKR)</Label>
  <Input
    type="number"
    id="maxPrice"
    name="maxPrice"
    step="500"
    value={formData.maxPrice}
    onChange={handleChange}
    hasError={!!errors.maxPrice}
    required
  />
  {errors.maxPrice && <ErrorText>{errors.maxPrice}</ErrorText>}
</InputField>


          <InputField>
            <Label htmlFor="licenseImage">License Image</Label>
            <FileInput type="file" id="licenseImage" name="licenseImage" accept="image/*" onChange={handleChange} hasError={!!errors.licenseImage} required />
            {errors.licenseImage && <ErrorText>{errors.licenseImage}</ErrorText>}
          </InputField>

          <InputField>
            <Label htmlFor="chassisNumber">Chassis Number</Label>
            <Input type="text" id="chassisNumber" name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} hasError={!!errors.chassisNumber} required />
            {errors.chassisNumber && <ErrorText>{errors.chassisNumber}</ErrorText>}
          </InputField>

          <InputField>
            <Label htmlFor="vehicleType">Type of Vehicle</Label>
            <Select id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} hasError={!!errors.vehicleType} required>
              <option value="Car">Car</option>
              <option value="Coaster">Coaster</option>
              <option value="Bus">Bus</option>
              <option value="Jeep">Jeep</option>
              <option value="Grand Cabin">Grand Cabin</option>
            </Select>
            {errors.vehicleType && <ErrorText>{errors.vehicleType}</ErrorText>}
          </InputField>

          <InputField>
            <Label htmlFor="dealershipCertificate">Dealership Certificate</Label>
            <FileInput type="file" id="dealershipCertificate" name="dealershipCertificate" accept="image/*" onChange={handleChange} hasError={!!errors.dealershipCertificate} required />
            {errors.dealershipCertificate && <ErrorText>{errors.dealershipCertificate}</ErrorText>}
          </InputField>

          <FullWidth>
  <SubmitButton type="submit" disabled={isLoading} $isLoading={isLoading}>
    {isLoading ? 'Saving...' : 'Save Information'}
  </SubmitButton>
</FullWidth>
        </Form>
      </FormCard>
    </Container>
  );
};


const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  padding: 1rem;
`;

const FormCard = styled.div`
  background-color: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #2563eb;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.hasError ? '#ef4444' : '#d1d5db')};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: rgba(255, 255, 255, 0.85);
  color:black;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const FileInput = styled(Input)`
  padding: 0.25rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.hasError ? '#ef4444' : '#d1d5db')};
  border-radius: 0.375rem;
  font-size: 0.875rem;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
`;

const SuccessMessage = styled.div`
  padding: 0.75rem;
  background-color: #dcfce7;
  color: #166534;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: #fee2e2;
  color: #991b1b;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem;
  background-color: ${(props) => (props.$isLoading ? '#93c5fd' : '#2563eb')};
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.375rem;
  border: none;
  cursor: ${(props) => (props.$isLoading ? 'not-allowed' : 'pointer')};
  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }
`;

const FullWidth = styled.div`
  grid-column: span 2;
`;


export default DealerPage;
