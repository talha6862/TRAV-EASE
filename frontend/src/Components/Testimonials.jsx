import styled from "styled-components";
import avatarImage from "../assets/user.png";
import { useNavigate } from "react-router-dom";

export default function Testimonials() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/contact"); 
  };

  return (
    <Section id="testimonials">
      <div className="title">
        <h2>Happy Customers</h2>
      </div>
      <div className="testimonials">
        <div className="testimonial" onClick={handleCardClick}>
          <p>TravEase made my trip to Hunza unforgettable. Highly recommended!</p>
          <div className="info">
            <img src={avatarImage} alt="Talha Aslam" />
            <div className="details">
              <h4>Talha Aslam</h4>
              <span>Student</span>
            </div>
          </div>
        </div>
        <div className="testimonial" onClick={handleCardClick}>
          <p>I was amazed by the convenience TravEase offers in planning trips!</p>
          <div className="info">
            <img src={avatarImage} alt="Dawood Afzal" />
            <div className="details">
              <h4>Dawood Afzal</h4>
              <span>Full Stack Developer</span>
            </div>
          </div>
        </div>
        <div className="testimonial" onClick={handleCardClick}>
          <p>Great experience for a first-time traveler. Thank you TravEase!</p>
          <div className="info">
            <img src={avatarImage} alt="Ali" />
            <div className="details">
              <h4>Ali</h4>
              <span>Fresher - Full Stack Developer</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 5rem 0;
  padding: 0 1rem;

  .title {
    text-align: center;
    margin-bottom: 2.5rem;

    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #0d2a31;
    }
  }

  .testimonials {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;

    .testimonial {
      background: linear-gradient(145deg, #e0f7fa, #ffffff);
      padding: 2rem;
      border-radius: 1.2rem;
      max-width: 320px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 16px 30px rgba(0, 0, 0, 0.15);
      }

      p {
        font-size: 1rem;
        color: #374151;
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .info {
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
          border-radius: 50%;
          height: 3.2rem;
          width: 3.2rem;
          object-fit: cover;
          border: 2px solid #0077b6;
        }

        .details {
          h4 {
            font-size: 1.1rem;
            margin: 0;
            color: #023e8a;
          }

          span {
            font-size: 0.9rem;
            color: #6b7280;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .title h2 {
      font-size: 2rem;
    }

    .testimonials {
      flex-direction: column;
      align-items: center;

      .testimonial {
        width: 100%;
        max-width: 90%;
      }

      .info {
        flex-direction: row;
        justify-content: flex-start;
      }
    }
  }
`;

