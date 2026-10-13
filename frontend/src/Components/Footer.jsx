import styled from "styled-components";
import { BsLinkedin, BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
  return (
    <FooterContainer>
      <TopSection>
        <LogoSection>
          <h2>Trav-Ease</h2>
          <p>Explore Pakistan with ease and comfort.</p>
        </LogoSection>

        <LinkGroups>
          <div>
            <h4>Navigation</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/About">About</a></li>
              <li><a href="/Places">Places</a></li>
              <li><a href="/customized">Customized Trips</a></li>
              <li><a href="/Tours">Tours</a></li>
              <li><a href="/user-itinerary-trips">User Itinerary Trips</a></li>

            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="/services/RentACar">Rent A Car</a></li>
              <li><a href="/services/locals">Local Companies</a></li>
              <li><a href="/register-operator">Tour Operator</a></li>
            </ul>
          </div>
        </LinkGroups>

        <SocialLinks>
          <h4>Follow Us</h4>
          <div className="icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><BsFacebook /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><AiFillInstagram /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><BsLinkedin /></a>
          </div>
        </SocialLinks>
      </TopSection>

      <BottomBar>
        <span>© {new Date().getFullYear()} Trav-Ease. All rights reserved.</span>
        <span>Developed by TravEase Dev Team</span>
      </BottomBar>
    </FooterContainer>
  );
}


const FooterContainer = styled.footer`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: 4rem 2rem 2rem;
  border-top: 2px solid rgba(219, 234, 254, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  color: #e2e8f0;
`;

const TopSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2.5rem;
`;

const LogoSection = styled.div`
  flex: 1;
  min-width: 220px;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.2);
  }

  p {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #cbd5e1;
    font-weight: 500;
  }
`;

const LinkGroups = styled.div`
  display: flex;
  flex: 2;
  gap: 3rem;
  flex-wrap: wrap;

  div {
    min-width: 150px;
  }

  h4 {
    color: #60a5fa;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.6rem;

      a {
        color: #cbd5e1;
        font-size: 0.95rem;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: #38bdf8;
        }
      }
    }
  }
`;

const SocialLinks = styled.div`
  min-width: 180px;

  h4 {
    color: #60a5fa;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .icons {
    display: flex;
    gap: 1rem;

    a {
      font-size: 1.6rem;
      color: #94a3b8;
      transition: color 0.3s;

      &:hover {
        color: #38bdf8;
      }
    }
  }
`;

const BottomBar = styled.div`
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
  color: #94a3b8;

  span {
    white-space: nowrap;
  }
`;


