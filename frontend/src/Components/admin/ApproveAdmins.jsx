// src/pages/admin/ApproveAdmins.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../utils/Axios";
import { toast } from "react-toastify";

export default function ApproveAdmins() {
  const [pendingAdmins, setPendingAdmins] = useState([]);

  useEffect(() => {
    const fetchPendingAdmins = async () => {
      try {
        const res = await api.get("/auth/pending-admins");
        setPendingAdmins(res.data);
      } catch (err) {
        toast.error("Failed to fetch admins.");
        console.error(err);
      }
    };

    fetchPendingAdmins();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/auth/approve-admin/${id}`);
      toast.success("Admin approved.");
      setPendingAdmins((prev) => prev.filter((admin) => admin._id !== id));
    } catch (err) {
      toast.error("Approval failed.");
    }
  };

  return (
    <Wrapper>
      <h2>Pending Admin Approvals</h2>
      {pendingAdmins.length === 0 ? (
        <p>No pending admin requests.</p>
      ) : (
        pendingAdmins.map((admin) => (
          <Card key={admin._id}>
            <p><strong>Name:</strong> {admin.firstName} {admin.lastName}</p>
            <p><strong>Email:</strong> {admin.email}</p>
            <button onClick={() => handleApprove(admin._id)}>Approve</button>
          </Card>
        ))
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);

  h2 {
    margin-bottom: 2rem;
    color:rgb(244, 244, 244);
  }
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  p {
  color:black;
  font-weight:bold;
    margin: 0.4rem 0;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background: #0077b6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: #023e8a;
    }
  }
`;
