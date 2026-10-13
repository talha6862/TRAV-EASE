import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { MdEmail, MdPhone } from "react-icons/md";

export default function ContactUs() {
  const user = JSON.parse(localStorage.getItem("UserInfo"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: `${user.firstName} ${user.lastName || ""}`,
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:8001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      alert("✅ Your message has been submitted successfully.");
      setFormData((prev) => ({ ...prev, message: "" }));
    } catch (error) {
      alert(`❌ Failed to send message: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Container>
        <AnimatedHeader>
          <h1>Contact Us</h1>
          <p>Have questions? We would love to hear from you!</p>
        </AnimatedHeader>

        <ContactOptions>
          <IconLink
            href="https://mail.google.com/mail/?view=cm&to=support@travease.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdEmail size={28} />
            <span>talhaaslam6862@gmail.com</span>
          </IconLink>

          <IconLink href="tel:+923001234567">
            <MdPhone size={28} />
            <span>+92 349-1792024</span>
          </IconLink>
        </ContactOptions>

        <Form onSubmit={handleSubmit}>
          <FormField>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              readOnly
            />
            <FocusBorder />
          </FormField>

          <FormField>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              readOnly
            />
            <FocusBorder />
          </FormField>

          <FormField>
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <FocusBorder />
          </FormField>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Send Message"}
          </Button>
        </Form>
      </Container>
    </PageContainer>
  );
}


const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;


const spinAnimation = keyframes`
  to { transform: rotate(360deg); }
`;


const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  padding: 2rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  background: linear-gradient(270deg, #0f2027, #203a43, #2c5364);
  background-size: 600% 600%;
  animation: ${gradientAnimation} 10s ease infinite;

  border-radius: 15px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  color: white;
`;

const AnimatedHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  animation: ${floatAnimation} 3s ease-in-out infinite;

  h1 {
    font-size: 2.5rem;
    color:rgb(128, 203, 243);
  }

  p {
    font-size: 1.2rem;
    color: white;
  }
`;

const ContactOptions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #0077b6;
  text-decoration: none;
  font-weight: 500;
  background: #caf0f8;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #ade8f4;
    transform: translateY(-2px);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormField = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-bottom: 2px solid #48cae4;
  background: transparent;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-bottom-color: #0077b6;
  }

  &::placeholder {
    color: #999;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: none;
  border-bottom: 2px solid #48cae4;
  background: transparent;
  font-size: 1rem;
  resize: none;
  height: 120px;

  &:focus {
    outline: none;
    border-bottom-color: #0077b6;
  }

  &::placeholder {
    color: #999;
  }
`;

const FocusBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(to right, #00b4d8, #0077b6);
  transition: width 0.3s ease;

  ${Input}:focus + &,
  ${Textarea}:focus + & {
    width: 100%;
  }
`;

const Button = styled.button`
  background: linear-gradient(to right, #00b4d8, #0077b6);
  color: white;
  border: none;
  padding: 0.9rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #023e8a, #0077b6);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 119, 182, 0.4);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spinAnimation} 1s ease-in-out infinite;
`;

