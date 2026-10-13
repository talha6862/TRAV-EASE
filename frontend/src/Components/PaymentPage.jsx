import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import styled from "styled-components";

const stripePromise = loadStripe("pk_test_51OGbliKue2i3LW4Npe6oAwbcfHyFSSUdcRPKRejkqG5z1WggCgT2MnaW3ayQaPV6gnVugP7w3C5crbJyug9weV1e00CESUwd87");

const PaymentPage = () => {
  const { state: data } = useLocation();

  if (!data) return <Message>No destination data provided.</Message>;

  const {
    destinationImage,
    destinationName,
    accountNumber,
    company,
    operatorName,
    days,
    nights,
    touristCounts,
    totalPrice,
  } = data;

  const imageUrl = `http://localhost:8001/${destinationImage}`;
  const totalTourists = Object.entries(touristCounts || {})
    .map(([type, count]) => `${count} ${type}`)
    .filter(s => !s.startsWith("0"))
    .join(", ");

  return (
    <Wrapper>
      <Card>
        <Left>
          <img src={imageUrl} alt={destinationName} />
        </Left>
        <Right>
          <h2>Confirm Your Tour Payment</h2>
          <p><strong>Destination:</strong> {destinationName}</p>
          <p><strong>Operated by:</strong> {operatorName} ({company})</p>
          <p><strong>Duration:</strong> {days} Days / {nights} Nights</p>
          <p><strong>Tourists:</strong> {totalTourists}</p>
          <p><strong>Account Number:</strong> {accountNumber}</p>
          <p><strong>Total Price:</strong> <span style={{ color: "green", fontWeight: "bold" }}>PKR {totalPrice.toLocaleString()}</span></p>

          <Elements stripe={stripePromise}>
            <CheckoutForm destination={data} />
          </Elements>
        </Right>
      </Card>
    </Wrapper>
  );
};

export default PaymentPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  min-height: 100vh;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 960px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Left = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 2rem;

  h2 {
    color: #0077b6;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.05rem;
    color: #444;
    margin-bottom: 1rem;
  }
`;

const Message = styled.p`
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: #e63946;
`;
