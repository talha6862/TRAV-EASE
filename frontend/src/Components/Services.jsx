import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";
import service4 from "../assets/service4.png";

export default function Services() {
  const navigate = useNavigate();

  const data = [
    {
      icon: service1,
      title: "Get Best Prices",
      subTitle:
        "Discover exclusive deals and discounts tailored to your travel needs. Save big while exploring Pakistan’s hidden gems and breathtaking destinations.",
    },
    {
      icon: service2,
      title: "Covid Safe",
      subTitle:
        "Travel with peace of mind. Our platform ensures curated hotels and travel partners adhere to strict safety protocols for a safe and secure journey.",
    },
    {
      icon: service3,
      title: "Flexible Payment",
      subTitle:
        "Enjoy hassle-free booking with multiple payment methods. Earn rewards while planning your perfect getaway.",
    },
    {
      icon: service4,
      title: "Find Local Treasures",
      subTitle:
        "Uncover Pakistan’s rich heritage and scenic beauty. Our local guides and suggestions will make your journey unforgettable.",
    },
  ];

  return (
    <Section id="services">
      {data.map((service, index) => (
        <div
          key={index}
          className="service"
          onClick={() => navigate("/service-detail", { state: service })}
        >
          <div className="icon">
            <img src={service.icon} alt={service.title} />
          </div>
          <h3>{service.title}</h3>
          <p>{service.subTitle}</p>
        </div>
      ))}
    </Section>
  );
}
const Section = styled.section`
  padding: 5rem 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  cursor: pointer;

  .service {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border-radius: 1.2rem;
    padding: 2.5rem 2rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
      background: linear-gradient(145deg, #f0faff, #ffffff);
    }

    .icon {
      background-color: #e0f7fa;
      padding: 1rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 3rem;
        width: 3rem;
        object-fit: contain;
      }
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 700;
      color: #0077b6;
    }

    p {
      font-size: 0.95rem;
      color: #333;
      line-height: 1.5;
    }
  }

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 4rem 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    padding: 3rem 1rem;
    gap: 1.2rem;

    .service {
      align-items: center;
      text-align: center;

      .icon {
        margin-bottom: 0.5rem;
      }
    }
  }
`;
