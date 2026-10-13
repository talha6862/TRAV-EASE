import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/Axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.success) {
        const user = response.data.userDocument._doc || response.data.userDocument;

        localStorage.setItem("UserInfo", JSON.stringify(user));

        if (localStorage.getItem("SignupPending")) {
          localStorage.removeItem("SignupPending");
          window.dispatchEvent(new Event("storage"));
        }

        toast.success("Login successful!");
        navigate(redirectPath, { state: location.state?.data || null });
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (err) {
      const error = err.response?.data;
      if (error?.errors?.length > 0) {
        error.errors.forEach((e) => toast.error(e.msg));
      } else {
        toast.error("Invalid email or password.");
      }
    }
  };

  return (
    <Container>
      <FormBox>
        <Title>Welcome Back</Title>
        <SubText>Enter your credentials to access your account</SubText>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </form>

        <SmallLink to="/forgot-password">Forgot Password?</SmallLink>
        <p style={{ color: 'black' }}>
          Don’t have an account? <SmallLink to="/signupuser">Sign up here</SmallLink>
        </p>

        <Divider>or continue with</Divider>

        <GoogleButton
          onClick={() => toast.info("Google Sign-In is not implemented.")}
        >
          Sign in with Google
        </GoogleButton>
      </FormBox>
    </Container>
  );
};

export default LoginPage;



const Container = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const FormBox = styled.div`
  background: #ffffff;
  padding: 3rem 2.5rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  color: #0077b6;
  margin-bottom: 0.25rem;
`;

const SubText = styled.p`
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 0.95rem;
  background-color: #f8fafc;
  color: #111;
  transition: 0.3s ease;

  &:focus {
    border-color: #0077b6;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 119, 182, 0.25);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #0077b6, #00b4d8);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #005f8a, #0077b6);
  }
`;

const GoogleButton = styled(Button)`
  background: #db4437;

  &:hover {
    background: #c1351d;
  }
`;

const SmallLink = styled(Link)`
  display: inline-block;
  margin: 0.75rem 0;
  color: #0077b6;
  font-size: 0.92rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #005f8a;
  }
`;

const Divider = styled.div`
  margin: 1.5rem 0;
  font-size: 0.85rem;
  color: #888;
  position: relative;

  &::before,
  &::after {
    content: "";
    height: 1px;
    background: #ccc;
    width: 40%;
    position: absolute;
    top: 50%;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;
