import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import api from "../../utils/Axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot-password", { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Container>
      <FormBox>
        <h2>Forgot Password</h2>
        <p>Enter your registered email. We ll send you a reset link.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
      </FormBox>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  width: 90%;
  max-width: 400px;

  h2 {
    margin-bottom: 1rem;
    color: #0077b6;
  }
    p{
    color:black;
    }

  input {
    width: 100%;
    padding: 0.8rem;
    margin: 1rem 0;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    background-color:white;
    color:black;
  }

  button {
    padding: 0.8rem 1.5rem;
    background-color: #0077b6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;
