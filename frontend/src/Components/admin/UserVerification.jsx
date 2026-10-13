import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../utils/Axios";

const UserVerification = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user/all");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const verifyUser = async (id) => {
    try {
      await api.put(`/user/verify/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/user/delete/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <h2>Registered Users</h2>
      <UserGrid>
        {users.map((user) => (
          <UserCard key={user._id}>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Verified:</strong> {user.isVerified ? "✅ Yes" : "❌ No"}</p>
            {!user.isVerified && (
              <Button onClick={() => verifyUser(user._id)}>Verify</Button>
            )}
            <DeleteButton onClick={() => deleteUser(user._id)}>Delete</DeleteButton>
          </UserCard>
        ))}
      </UserGrid>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const UserGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const UserCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const Button = styled.button`
  margin: 0.5rem;
  background-color: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #059669;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ef4444;

  &:hover {
    background-color: #dc2626;
  }
`;

export default UserVerification;
