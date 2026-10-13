import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import api from "../../utils/Axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        newPassword,
      });
      toast.success(res.data.message);
      navigate("/login/logininitial");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <Container>
      <FormBox>
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowNew(!showNew)}>
              {showNew ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </InputGroup>

          <InputGroup>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </InputGroup>

          <button type="submit">Update Password</button>
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
  width: 90%;
  max-width: 400px;
  text-align: center;

  h2 {
    color: #0077b6;
    margin-bottom: 1.5rem;
  }

  button {
    width: 100%;
    padding: 0.8rem;
    margin-top: 1rem;
    background-color: #0077b6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background-color: #005f8a;
    }
  }
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;

  input {
    width: 100%;
    padding: 0.8rem 2.5rem 0.8rem 0.8rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    background-color: #f9f9f9;
    color: #333;

    &:focus {
      outline: none;
      border-color: #00b4d8;
      box-shadow: 0 0 4px rgba(0, 180, 216, 0.3);
    }
  }

  span {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #0077b6;
    font-size: 1.3rem;
    cursor: pointer;
  }
`;
