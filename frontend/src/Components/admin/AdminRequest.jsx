import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import api from "../../utils/Axios";
import { useNavigate } from "react-router-dom";

export default function AdminRegistration() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = form;
    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register-admin", form);
      if (res.data.success) {
        toast.success("Admin request sent for approval");
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Admin registration error:", err);
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <RegisterBox>
        <form onSubmit={handleSubmit}>
          <h2>Request Admin Access</h2>
          <Input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit for Approval"}
          </Button>
          
          <SecondaryButton type="button" onClick={() => navigate("/admin-login")}>
  Already an Admin? Login
</SecondaryButton>
        </form>
      </RegisterBox>
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

const RegisterBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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
  margin-bottom: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  background: #f9f9f9;
  color: black;

  &:focus {
    border-color: #00b4d8;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #0077b6, #00b4d8);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: linear-gradient(to right, #005f8a, #0077b6);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
const SecondaryButton = styled(Button)`
  margin-top: 10px;
  background: #eee;
  color: #0077b6;

  &:hover {
    background: #ddd;
  }
`;
