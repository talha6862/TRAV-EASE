import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import api from "../utils/Axios";

import homeImage1 from "../assets/pexels-catalin-todosia-876894548-29731425.jpg";
import homeImage2 from "../assets/hero2.jpg";
import homeImage3 from "../assets/hero3.jpg";
import homeImage4 from "../assets/hero4.jpg";
import homeImage5 from "../assets/hero5.jpg";

const images = [homeImage1, homeImage2, homeImage3, homeImage4, homeImage5];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await api.get("/admin/destinations");
        setDestinations(res.data);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      }
    };
    fetchDestinations();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (checkInDate && selectedDestination?.days) {
      const checkIn = new Date(checkInDate);
      checkIn.setDate(checkIn.getDate() + selectedDestination.days);
      setCheckOutDate(checkIn.toISOString().split("T")[0]);
    }
  }, [checkInDate, selectedDestination]);

const handlePlaceSelect = (place) => {
  setSearchTerm("");
  setSelectedDestination(place); 
  setIsDropdownOpen(false);
};
  const isFormValid = selectedDestination && checkInDate;

  return (
    <Section id="hero">
      <div className="slideshow">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hero-image ${currentIndex === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="overlay" />
      </div>

      <div className="content">
        <div className="title">
          <h1>Explore Pakistan’s Hidden Gems</h1>
          <p>Plan your perfect getaway with our top travel destinations</p>
        </div>

        <div className="search">
          <div className="container" style={{ position: "relative" }}>
            <label>Where do you want to go?</label>
            <input
  type="text"
  placeholder="Search destination"
  value={searchTerm || selectedDestination?.name || ""}
  onFocus={() => setIsDropdownOpen(true)}
  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
  onChange={(e) => setSearchTerm(e.target.value)}
  required
/>

            {isDropdownOpen && (
              <Dropdown>
                {destinations.length > 0 ? (
                  destinations
                    .filter((dest) =>
                      dest?.name
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((dest) => (
                      <DropdownItem key={dest._id} onClick={() => handlePlaceSelect(dest)}>
                        {dest.name}
                      </DropdownItem>
                    ))
                ) : (
                  <DropdownItem>No destinations available</DropdownItem>
                )}
              </Dropdown>
            )}
          </div>

          <div className="container">
            <label>Check-in</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
            />
          </div>

          <div className="container">
            <label>Check-out</label>
            <input type="date" value={checkOutDate} readOnly />
          </div>

          {isFormValid ? (
            <Link to="/Places" state={{ destination: selectedDestination }}>
              <button>Explore Now</button>
            </Link>
          ) : (
            <button disabled>Explore Now</button>
          )}
        </div>
      </div>
    </Section>
  );
}
const Section = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .slideshow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  .hero-image {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  .hero-image.active {
    opacity: 1;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7));
    z-index: 2;
  }

  .content {
    position: relative;
    z-index: 3;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    padding: 2rem;

    .title {
      h1 {
        font-size: 3.8rem;
        font-weight: 800;
        text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6);
      }

      p {
        font-size: 1.4rem;
        margin-top: 0.5rem;
        text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.6);
      }
    }

    .search {
      margin-top: 2.5rem;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 1.5rem;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(12px);
      padding: 1.5rem 2rem;
      border-radius: 1.2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);

      .container {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        label {
          font-size: 1rem;
          font-weight: 600;
          color: #f1f1f1;
          margin-left: 0.2rem;
        }

        input {
          padding: 0.6rem 1rem;
          border: none;
          border-radius: 0.6rem;
          width: 220px;
          text-align: center;
          font-size: 1rem;
          background-color: rgba(255, 255, 255, 0.95);
          color: #023e8a;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: box-shadow 0.2s;

          &:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 198, 255, 0.3);
          }
        }
      }

      button {
        align-self: center;
        height: 42px;
        padding: 0 1.5rem;
        font-size: 1rem;
        background: linear-gradient(135deg, #00c6ff, #0072ff);
        color: white;
        border: none;
        border-radius: 0.7rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0 4px 12px rgba(0, 114, 255, 0.2);

        &:hover {
          background: linear-gradient(135deg, #0072ff, #00c6ff);
          transform: translateY(-2px);
        }

        &:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .title {
      h1 {
        font-size: 2.4rem;
      }

      p {
        font-size: 1.1rem;
      }
    }

    .search {
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      gap: 1.2rem;

      .container {
        width: 100%;

        input {
          width: 100%;
        }
      }

      button {
        width: 100%;
      }
    }
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  width: 100%;
  max-height: 200px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0.5rem;
  overflow-y: auto;
  z-index: 9999;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const DropdownItem = styled.div`
  padding: 0.9rem 1.2rem;
  font-size: 1.05rem;
  font-weight: 500;
  color: #023e8a;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: 0.3s;

  &:hover {
    background-color: #e0f7fa;
    color: #0077b6;
  }

  &:last-child {
    border-bottom: none;
  }
`;
