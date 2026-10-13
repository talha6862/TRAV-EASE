import styled from 'styled-components';
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";
import service4 from "../assets/service4.png";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleCardClick = (service) => {
    navigate("/service-detail", { state: service });
  };

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
    <AboutContainer>
      <h1>About <span>Trav-Ease</span></h1>
      <p className='head'>Your smart companion for seamless travel experiences.</p>
      <p className='info'>
        TravEase is a web application designed to make travel planning easier and more efficient
        by offering users recommendations, budget management, and real-time notifications. Designed
        to tackle common travel pain points including information overload and inefficient planning —
        it aims to include features like trip customization, expense tracking and emergency notices.
        The idea is driven by the growing desire for a unified travel platform that is personalized for individual customers.
      </p>

      <Section id="services">
        {data.map((service, index) => (
          <div key={index} className="service" onClick={() => handleCardClick(service)}>
            <div className="icon">
              <img src={service.icon} alt={service.title} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.subTitle}</p>
          </div>
        ))}
      </Section>
    </AboutContainer>
  );
};

export default About;

const AboutContainer = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);

  h1 {
    font-size: 2.6rem;
    font-weight: 700;
    margin-bottom: 1rem;
  color: #f9f9f9;

    span {
  color: #f9f9f9;
    }
  }

  .head {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  color: #f9f9f9;
  }

  .info {
    font-size: 1rem;
  color: #f9f9f9;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto 3rem auto;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;

    h1 {
      font-size: 2rem;
    }

    .info {
      font-size: 0.95rem;
    }
  }
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  padding: 2rem 0;

  .service {
    background: #ffffff;
    padding: 2rem;
    border-radius: 1.2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    transition: 0.3s ease-in-out;
    cursor: pointer;
    text-align: left;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    }

    .icon img {
      height: 2.6rem;
      width: auto;
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #0077b6;
    }

    p {
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.6;
    }
  }
`;
