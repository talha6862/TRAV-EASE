import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../utils/Axios";
import styled from "styled-components";
import PropTypes from "prop-types";

const CheckoutForm = ({ destination }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cvc, setCvc] = useState("");

  const user = JSON.parse(localStorage.getItem("UserInfo"));
  const persons = destination?.persons || 1;
  const totalPrice = destination?.totalPrice || (destination?.price * persons);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!/^\d{16}$/.test(cardNum) || !/^\d{2}\/\d{4}$/.test(expiry) || !/^\d{3}$/.test(cvc)) {
      return alert("Please enter valid card details.");
    }

    setLoading(true);

    try {
      const { data: clientSecret } = await axios.post("/api/payment/create-payment-intent", {
        amount: totalPrice * 100,
        email: user?.email,
        destinationName: destination.destinationName,
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: fullName }
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        await axios.post("/api/payment/save-payment", {
          email: user?.email,
          amount: totalPrice,
          destinationName: destination.destinationName,
          paymentIntentId: result.paymentIntent.id
        });
        alert("🎉 Payment successful!");
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed.");
    }

    setLoading(false);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h2>💳 Card Payment Form</h2>

      <InputGroup>
        <label>Full Name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </InputGroup>

      <InputGroup>
        <label>Card Number (16 digits)</label>
        <input value={cardNum} onChange={(e) => setCardNum(e.target.value.replace(/\D/g, ""))} maxLength={16} required />
      </InputGroup>

      <FlexRow>
        <InputGroup>
          <label>Expiry (MM/YYYY)</label>
          <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YYYY" required />
        </InputGroup>

        <InputGroup>
          <label>CVC</label>
          <input value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))} maxLength={3} required />
        </InputGroup>
      </FlexRow>

      <CardWrapper>
        <label>Stripe Secure Card Element</label>
        <CardElement />
      </CardWrapper>

      <SubmitButton type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay PKR ${totalPrice.toLocaleString()}`}
      </SubmitButton>
    </FormWrapper>
  );
};

CheckoutForm.propTypes = {
  destination: PropTypes.object.isRequired,
};

export default CheckoutForm;

const FormWrapper = styled.form`
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    text-align: center;
    color: #0077b6;
    margin-bottom: 1rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-weight: 600;
    margin-bottom: 0.4rem;
    color:black;
  }
  input {
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color:white;
    color:black;
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const CardWrapper = styled.div`
  margin-top: 1rem;

  label {
    font-weight: 600;
    display: block;
    margin-bottom: 0.4rem;
  }

  .StripeElement {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #f5f5f5;
  }
`;

const SubmitButton = styled.button`
  background: #0077b6;
  color: white;
  font-weight: 600;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background: #005f8c;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
