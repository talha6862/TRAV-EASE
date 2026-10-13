import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AvatarDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("UserInfo")); // ✅ use current user

  const getInitial = () => {
    if (user?.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const initial = getInitial();

  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login/logininitial");
  };

  return (
    <Wrapper>
      <Avatar onClick={() => setOpen(!open)}>{initial}</Avatar>
      {open && (
        <Dropdown>
          <p>{user?.email}</p>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default AvatarDropdown;

// Styled Components
const Wrapper = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  background-color: #0077b6;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 180px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  p {
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
    color: #333;
  }

  button {
    background: #0077b6;
    color: white;
    padding: 0.5rem;
    width: 100%;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 0.5rem;

    &:last-child {
      background: #e63946;

      &:hover {
        background: #d62828;
      }
    }

    &:hover {
      background: #005f86;
    }
  }
`;
