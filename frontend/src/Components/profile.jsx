import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../utils/Axios";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("UserInfo"));
  const [customizedTrips, setCustomizedTrips] = useState([]);
  const [bookedTrips, setBookedTrips] = useState([]); // From trips model
  const [tourBookings, setTourBookings] = useState([]); // From bookingModel

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.email) {
          const [customizedRes, tripsRes, bookingsRes] = await Promise.all([
            api.get(`/api/travel-preferences/${user.email}`),  // Customized trips
            api.get(`/api/trips/${user.email}`),               // Trips model
            api.get(`/api/bookings/${user.email}`),            // bookingModel
          ]);
          setCustomizedTrips(customizedRes.data);
          setBookedTrips(tripsRes.data);
          setTourBookings(bookingsRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch user profile data", err);
      }
    };

    fetchUserData();
  }, [user?.email]);

  return (
    <Wrapper>
      <Card>
        <Header>👤 Profile</Header>
        <Detail><strong>Name:</strong> {user?.firstName || "N/A"} {user?.lastName || ""}</Detail>
        <Detail><strong>Email:</strong> {user?.email}</Detail>
      </Card>

      {/* Customized Trips */}
      <Section>
        <SectionTitle>🧳 Customized Trips</SectionTitle>
        {customizedTrips.length === 0 ? (
          <Empty>No customized trips found.</Empty>
        ) : (
          customizedTrips.map((trip, idx) => (
            <TripCard key={idx}>
              <Label><strong>Destination:</strong> {trip.destination}</Label>
              <Label><strong>Date:</strong> {new Date(trip.travelDate).toLocaleDateString()}</Label>
              <Label><strong>Budget:</strong> PKR {trip.budget?.toLocaleString()}</Label>
              <Label><strong>Persons:</strong> {trip.numberOfPersons}</Label>
              <Label><strong>Days:</strong> {trip.numberOfDays}</Label>
              <Label><strong>Activities:</strong> {trip.activities?.join(", ")}</Label>
            </TripCard>
          ))
        )}
      </Section>

      {/* Trips Booked - from trips model */}
      <Section>
        <SectionTitle>🚐 Trips Saved in Iternary</SectionTitle>
        {bookedTrips.length === 0 ? (
          <Empty>No trip bookings found.</Empty>
        ) : (
          bookedTrips.map((trip, idx) => (
            <TripCard key={idx}>
              <Label><strong>Destination:</strong> {trip.destination}</Label>
              <Label><strong>Total Persons:</strong> {trip.persons}</Label>
              <Label><strong>Total Price:</strong> PKR {trip.totalPrice?.toLocaleString()}</Label>
            </TripCard>
          ))
        )}
      </Section>

      {/* Tours Booked - from bookingModel */}
      <Section>
        <SectionTitle>🧭 Tours Booked (Payment Pending)</SectionTitle>
        {tourBookings.length === 0 ? (
          <Empty>No tours booked.</Empty>
        ) : (
          tourBookings.map((tour, idx) => (
            <TripCard key={idx}>
              <Label><strong>Tour:</strong> {tour.destinationName}</Label>
              <Label><strong>Company:</strong> {tour.company}</Label>
              <Label><strong>Booked By:</strong> {tour.bookedBy}</Label>
              <Label><strong>Couples:</strong> {tour.couples}</Label>
              <Label><strong>Males:</strong> {tour.males}</Label>
              <Label><strong>Females:</strong> {tour.females}</Label>
              <Label><strong>Total Price:</strong> PKR {tour.totalPrice?.toLocaleString()}</Label>
              <Label><strong>Status:</strong> ✅ {tour.status}</Label>
            </TripCard>
          ))
        )}
      </Section>
    </Wrapper>
  );
};

export default UserProfile;

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: auto;
  min-height: 100vh;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
`;

const Card = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const Header = styled.h2`
  font-size: 2rem;
  color: #0077b6;
  margin-bottom: 1rem;
`;

const Detail = styled.p`
  color: #333;
  margin: 0.3rem 0;
  font-size: 1rem;
`;

const Section = styled.div`
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h3`
  color: rgb(126, 172, 231);
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
`;

const TripCard = styled.div`
  padding: 1rem;
  border-left: 4px solid #0077b6;
  margin-bottom: 1.2rem;
  background: #f1faff;
  border-radius: 8px;
`;

const Label = styled.p`
  font-size: 0.95rem;
  color: #222;
  margin: 0.3rem 0;
`;

const Empty = styled.p`
  font-style: italic;
  color: #ccc;
  font-size: 0.95rem;
`;
