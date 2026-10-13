import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { FaUserShield, FaSignOutAlt, FaCheckCircle, FaMapMarkerAlt, FaCar, FaIndustry, FaRegEdit, FaUsers, FaGlobeAsia, FaArrowLeft } from "react-icons/fa";
import { FaCalendarAlt, FaSuitcase } from "react-icons/fa";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("UserInfo");
    if (storedAdmin && storedAdmin !== "undefined") {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (err) {
        console.error("Failed to parse admin info:", err);
      }
    }
  }, []);

  return (
    <PanelWrapper>
      <TopBar>
        <div>
          <h2>Admin Dashboard</h2>
          <p>Manage platform-wide approvals & data</p>
        </div>
        {admin && (
          <AdminInfo>
            <FaUserShield size={20} />
            <div>
              <span>{admin.firstName} {admin.lastName}</span>
              <br/>
              <small>{admin.email}</small>
            </div>
          </AdminInfo>
        )}
        <BackButton onClick={() => navigate("/")}>
          <FaArrowLeft /> Back to Homepage
        </BackButton>
      </TopBar>

      <CardGrid>
        {admin?.role === "superadmin" && (
          <DashboardCard onClick={() => navigate("/admin/approve-admins")}>
            <FaUsers size={24} />
            <span>Admin Approvals</span>
          </DashboardCard>
        )}
        <DashboardCard onClick={() => navigate("/admin-login")}>
          <FaSignOutAlt size={24} />
          <span>Admin Login</span>
        </DashboardCard>
        <DashboardCard onClick={() => navigate("/admin/dealers")}>
          <FaCar size={24} />
          <span>Dealer Verification</span>
        </DashboardCard>
        <DashboardCard onClick={() => navigate("/admin/companies")}>
          <FaIndustry size={24} />
          <span>Company Approval</span>
        </DashboardCard>
        <DashboardCard onClick={() => navigate("/admin/customized-trips")}>
          <FaRegEdit size={24} />
          <span>Customized Trips</span>
        </DashboardCard>
        <DashboardCard onClick={() => navigate("/admin/destinations")}>
          <FaMapMarkerAlt size={24} />
          <span>Destination Manager</span>
        </DashboardCard>
        <DashboardCard onClick={() => navigate("/admin/tour-op")}>
          <FaGlobeAsia size={24} />
          <span>Tour Operator</span>
        </DashboardCard>
        <DashboardCard onClick={() => navigate("/admin/feedbacks")}>
          <FaCheckCircle size={24} />
          <span>User Feedback</span>
        </DashboardCard>
<DashboardCard onClick={() => navigate("/admin/user-itinerary")}>
  <FaCalendarAlt size={24} />
  <span>User Trip Itinerary</span>
</DashboardCard>

<DashboardCard onClick={() => navigate("/admin/user-tours")}>
  <FaSuitcase size={24} />
  <span>Tours Booked by Users</span>
</DashboardCard>


      </CardGrid>
    </PanelWrapper>
  );
};

export default AdminPanel;


const PanelWrapper = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  color: #f9f9f9;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  h2 {
    font-size: 2rem;
    color: #ffffff;
  }

  p {
    font-size: 0.95rem;
    color: #cbd5e1;
  }
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255,255,255,0.05);
  padding: 0.8rem 1rem;
  border-radius: 10px;

  span {
    font-weight: 600;
    color: #fff;
  }

  small {
    font-size: 0.85rem;
    color: #d1d5db;
  }

  svg {
    color: #38bdf8;
  }
`;

const BackButton = styled.button`
  margin-top: 1rem;
  background: #e2e8f0;
  color: #1e3a8a;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #1e3a8a;
    color: white;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const DashboardCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 2rem 1.2rem;
  border-radius: 12px;
  text-align: center;
  color: #f9fafb;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.12);
  }

  svg {
    color: #38bdf8;
  }

  span {
    font-weight: 600;
    font-size: 1rem;
  }
`;
