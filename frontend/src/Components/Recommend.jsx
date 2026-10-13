import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../utils/Axios";

export default function Recommend() {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await api.get("/admin/destinations");
        const filtered = res.data
          .filter(dest => dest.name && dest.price !== undefined)
          .slice(0, 6); // Limit to 6 destinations
        setDestinations(filtered);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };
    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (destination) => {
    navigate(`/destinationdetail/${destination.name.replace(/\s+/g, "-").toLowerCase()}`, {
      state: destination,
    });
  };

  return (
    <Section>
      <div className="title">
        <h2>Explore The Most Scenic Destinations</h2>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by destination name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="destinations">
        {filteredDestinations.map((destination, index) => (
          <div
            key={index}
            className="destination"
            onClick={() => handleCardClick(destination)}
          >
            <img
              src={`http://localhost:8001/${destination.image}`}
              alt={destination.name}
            />
            <h3>{destination.name}</h3>
            <p>{destination.description}</p>

            <div className="info">
              <div className="services">
                {destination.activities?.slice(0, 3).map((act, i) => (
                  <span key={i} className="tag">{act}</span>
                ))}
              </div>
              <h4>
                PKR {destination.price ? destination.price.toLocaleString() : "Not Available"}
              </h4>
            </div>

            {destination.touristSpots?.length > 0 && (
              <div className="spots">
                <h5>🗺️ Tourist Attractions:</h5>
                <ul>
                  {destination.touristSpots.slice(0, 3).map((spot, i) => (
                    <li key={i}>
                      <a
                        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(spot)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevent card navigation
                      >
                        {spot}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="distance">
              <span><strong>Minimum</strong> {destination.days} Days {destination.nights} Nights</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  padding: 3rem 2rem;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);

  .title {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      font-size: 2.2rem;
color: #ffffff;
      font-weight: 700;
      text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .search-bar {
    text-align: center;
    margin-bottom: 2.5rem;

    input {
      padding: 0.8rem 1.2rem;
      width: 90%;
      max-width: 400px;
      border: none;
      border-radius: 1rem;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 198, 255, 0.3);
      }
    }
  }

  .destinations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;

    .destination {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border-radius: 1.2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
      overflow: hidden;
      padding: 1.5rem;
      transition: 0.3s ease;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
      }

      img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 1rem;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      }

      h3 {
        margin: 0.8rem 0 0.5rem;
        color: #0077b6;
        font-size: 1.2rem;
        font-weight: 600;
      }

      p {
        color: #374151;
        font-size: 0.95rem;
        line-height: 1.4;
        min-height: 50px;
      }

      .spots {
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;

  h5 {
    font-size: 0.95rem;
    color: #1d4ed8;
    margin-bottom: 0.4rem;
    font-weight: 600;
  }

  ul {
    padding-left: 1.2rem;
    margin-top: 0.2rem;
    list-style: disc;

    li {
      font-size: 0.85rem;
      color: #4b5563;
      margin-bottom: 0.3rem;

      a {
        text-decoration: none;
        color: #0ea5e9;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
          color: #0284c7;
          text-decoration: underline;
        }
      }
    }
  }
}


      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;

        .services {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .tag {
            background-color: #d0f0fd;
            padding: 0.4rem 0.8rem;
            border-radius: 0.6rem;
            font-size: 0.75rem;
            color: #0369a1;
            font-weight: 500;
          }
        }

        h4 {
          font-weight: bold;
          color: #10b981;
          font-size: 1rem;
        }
      }

      .distance {
        font-size: 0.85rem;
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        color: #6b7280;

        span strong {
          font-weight: 600;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 2rem 1rem;

    .title h2 {
      font-size: 1.8rem;
    }

    .destination {
      padding: 1.2rem;
    }

    .search-bar input {
      font-size: 0.95rem;
    }
  }
`;

