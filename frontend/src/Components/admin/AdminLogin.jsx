import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../utils/Axios";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/adminlogin", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        localStorage.setItem("UserInfo", JSON.stringify(res.data.user));
        toast.success("Super Admin login successful");
        navigate("/admin/dashboard"); 
      } else {
        toast.error(res.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Box>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Admin Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <SecondaryButton onClick={() => navigate("/admin")}>
          Request Admin Access
        </SecondaryButton>
      </Box>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;

  h2 {
    color: #0077b6;
    margin-bottom: 1.5rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: black;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #0077b6, #00b4d8);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: linear-gradient(to right, #005f8a, #0077b6);
  }

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
`;
const SecondaryButton = styled.button`
  margin-top: 1rem;
  padding: 10px 16px;
  width: 100%;
  background-color: #e0f4ff;
  color:rgb(255, 255, 255);
  font-weight: bold;
  border: 2px solid #0077b6;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0077b6;
    color: white;
  }
`;
