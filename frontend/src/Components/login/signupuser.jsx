import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../../utils/Axios';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return alert('All fields are required.');
    }
    if (password.length < 6) {
      return alert('Password must be at least 6 characters.');
    }
    if (password !== confirmPassword) {
      return alert('Passwords do not match.');
    }

    try {
      const response = await api.post('/user/register', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      const { data } = response;

      if (data.success) {
        alert(data.message || 'Registration successful. Check your email.');
        localStorage.setItem('SignupPending', 'true');
      } else if (data.redirectToLogin) {
        alert('Email already registered. A login link has been sent.');
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      const msg = err.response?.data?.message;
      alert(msg || 'Server error. Please try again.');
    }
  };

  return (
    <Container>
      <Card>
        <Title>Create Account</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <StyledInput required type="text" placeholder=" " onChange={e => setFirstName(e.target.value)} />
            <Label>First Name</Label>
          </InputGroup>
          <InputGroup>
            <StyledInput required type="text" placeholder=" " onChange={e => setLastName(e.target.value)} />
            <Label>Last Name</Label>
          </InputGroup>
          <InputGroup>
            <StyledInput required type="email" placeholder=" " onChange={e => setEmail(e.target.value)} />
            <Label>Email</Label>
          </InputGroup>
          <InputGroup>
            <StyledInput required type="password" placeholder=" " onChange={e => setPassword(e.target.value)} />
            <Label>Password</Label>
          </InputGroup>
          <InputGroup>
            <StyledInput required type="password" placeholder=" " onChange={e => setConfirmPassword(e.target.value)} />
            <Label>Confirm Password</Label>
          </InputGroup>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>
      </Card>
    </Container>
  );
};

export default Signup;



const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  padding: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  animation: ${fadeIn} 0.6s ease;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.8rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 14px 14px 14px 12px;
  border: 1.8px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  background-color: #f9f9f9;
  color: #111;
  transition: 0.3s ease;

  &:focus {
    border-color: #00b4d8;
    background-color: white;
    outline: none;
    box-shadow: 0 0 6px rgba(0, 180, 216, 0.3);
  }

  &:not(:placeholder-shown) ~ label,
  &:focus ~ label {
    top: -12px;
    left: 10px;
    font-size: 0.75rem;
    color: #00b4d8;
    background: white;
    padding: 0 6px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 14px;
  left: 14px;
  font-size: 1rem;
  color: #888;
  transition: 0.3s;
  background: transparent;
  pointer-events: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(to right, #00b4d8, #0096c7);
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background: linear-gradient(to right, #0096c7, #0077b6);
  }
`;

// const GoogleButton = styled.button`
//   width: 100%;
//   padding: 14px;
//   background-color: #db4437;
//   color: white;
//   font-weight: 600;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
//   transition: background 0.3s ease;
//   font-size: 1rem;

//   &:hover {
//     background-color: #c1351d;
//   }
// `;

// const Divider = styled.div`
//   text-align: center;
//   color: #aaa;
//   margin: 1.5rem 0;
//   font-size: 0.9rem;
//   position: relative;

//   &::before,
//   &::after {
//     content: '';
//     height: 1px;
//     background: #ccc;
//     width: 40%;
//     position: absolute;
//     top: 50%;
//   }

//   &::before {
//     left: 0;
//   }

//   &::after {
//     right: 0;
//   }
// `;
