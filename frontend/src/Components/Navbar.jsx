import styled from "styled-components";
import logo from "../assets/log_travease-removebg-preview.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown";

export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);
  const [user, setUser] = useState(null);
  const [signupPending, setSignupPending] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("UserInfo");
      const pending = localStorage.getItem("SignupPending");

      if (storedUser && storedUser !== "undefined") {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing user", e);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setSignupPending(!!pending);
    };

    loadUser();

    window.addEventListener("storage", loadUser);
    window.addEventListener("userChanged", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userChanged", loadUser);
    };
  }, []);

  return (
    <>
      <Nav>
        <div className="brand">
          <div className="container">
            <Link to="/">
              <img src={logo} alt="TravEase Logo" />
            </Link>
            <Link className="title" to="/">Trav-Ease.pk</Link>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavbarState(true)} />
            )}
          </div>
        </div>

        <ul>
          <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
          <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link></li>
          <li><Link to="/places" className={location.pathname === "/places" ? "active" : ""}>Places</Link></li>
          <li><Link to="/tours" className={location.pathname === "/tours" ? "active" : ""}>Tours</Link></li>
          <li>
            <Dropdown>
              <Link to="/services" className={location.pathname.includes("/services") ? "active" : ""}>
                Services <Arrow>&#9662;</Arrow>
              </Link>
              <DropdownContent>
                <Link to="/services/RentACar">Rent a Car</Link>
                <Link to="/services/locals">Local</Link>
              </DropdownContent>
            </Dropdown>
          </li>
          <li><Link to="/customized" className={location.pathname === "/customized" ? "active" : ""}>Customized Trips</Link></li>
          <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact Us</Link></li>
        </ul>

        {user ? (
          <AvatarDropdown user={user} />
        ) : (
          <Link to={signupPending ? "#" : "/login/logininitial"}>
            <button disabled={signupPending}>
              {signupPending ? "Check Gmail to Login" : "Login/Signup"}
            </button>
          </Link>
        )}
      </Nav>

      <ResponsiveNav $state={navbarState}>
        <ul>
          <li><Link to="/" onClick={() => setNavbarState(false)} className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
          <li><Link to="/about" onClick={() => setNavbarState(false)} className={location.pathname === "/about" ? "active" : ""}>About</Link></li>
          <li><Link to="/places" onClick={() => setNavbarState(false)} className={location.pathname === "/places" ? "active" : ""}>Places</Link></li>
          <li><Link to="/tours" onClick={() => setNavbarState(false)} className={location.pathname === "/tours" ? "active" : ""}>Tours</Link></li>
          <li>
            <Dropdown>
              <Link to="/services" onClick={() => setNavbarState(false)} className={location.pathname.includes("/services") ? "active" : ""}>
                Services <Arrow>&#9662;</Arrow>
              </Link>
              <DropdownContent>
                <Link to="/services/RentACar" onClick={() => setNavbarState(false)}>Rent a Car</Link>
                <Link to="/services/locals" onClick={() => setNavbarState(false)}>Local</Link>
              </DropdownContent>
            </Dropdown>
          </li>
          <li><Link to="/customized" onClick={() => setNavbarState(false)} className={location.pathname === "/customized" ? "active" : ""}>Customized</Link></li>
          <li><Link to="/contact" onClick={() => setNavbarState(false)} className={location.pathname === "/contact" ? "active" : ""}>Contact Us</Link></li>
        </ul>
      </ResponsiveNav>
    </>
  );
}


const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 1rem;
  z-index: 10000;
  margin: 0 1rem;

  .brand {
    .container {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 1.3rem;
      font-weight: 900;

      img {
        height: 60px;
        width: 60px;
        object-fit: contain;
      }
    }

    .toggle {
      display: none;
      font-size: 1.8rem;
      cursor: pointer;
      color: #ffffff;
    }
  }

  ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;

    li {
      position: relative;

      a {
        text-decoration: none;
        font-size: 1.1rem;
        padding: 0.5rem 0.8rem;
        border-radius: 0.6rem;
        color: #ffffff;
        font-weight: 500;
        transition: background 0.3s ease, transform 0.3s ease;

        &:hover {
          background-color: rgba(0, 198, 255, 0.15);
          color: #00c6ff;
          transform: translateY(-2px);
        }

        &.active {
          background-color: rgba(0, 198, 255, 0.2);
          color: #00c6ff;
          font-weight: 600;
        }
      }
    }
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    border: none;
    color: white;
    background: linear-gradient(135deg, #00c6ff, #0072ff);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    box-shadow: 0 4px 12px rgba(0, 114, 255, 0.2);

    &:hover {
      background: linear-gradient(135deg, #0072ff, #00c6ff);
      transform: translateY(-2px);
    }
  }

  .title {
    text-decoration: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.5rem;
  }

  @media screen and (max-width: 1080px) {
    .brand {
      width: 100%;
      justify-content: space-between;

      .toggle {
        display: block;
      }
    }

    ul {
      display: none;
    }

    button {
      display: none;
    }
  }
`;

const Dropdown = styled.div`
  position: relative;
  &:hover > div {
    display: block;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 0.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  min-width: 180px;
  top: 100%;
  left: 0;

  a {
    color: #ffffff;
    padding: 0.8rem 1rem;
    display: block;
    text-decoration: none;
    transition: 0.3s ease;

    &:hover {
      background-color: rgba(0, 198, 255, 0.2);
      color: #00c6ff;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: absolute;
  z-index: 999;
  top: ${({ $state }) => ($state ? "70px" : "-600px")};
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  width: 100%;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: 0.4s ease-in-out;

  ul {
    list-style: none;
    padding: 1rem 2rem;

    li {
      margin: 1rem 0;

      a {
        font-size: 1.1rem;
        color: #ffffff;
        text-decoration: none;
        display: inline-block;
        transition: color 0.3s;

        &:hover {
          color: #00c6ff;
        }

        &.active {
          color: #00c6ff;
          font-weight: bold;
        }
      }
    }
  }
`;

const Arrow = styled.span`
  margin-left: 6px;
  font-size: 0.8rem;
`;
