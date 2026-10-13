import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/Axios";

export default function Places() {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDestination = location.state?.destination || null;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await api.get("/admin/destinations");
        setDestinations(res.data);
      } catch (err) {
        console.error("Failed to load destinations", err);
      }
    };
    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter((destination) => {
    const matchSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSelected = selectedDestination
      ? destination.name.toLowerCase() === selectedDestination.name.toLowerCase()
      : true;
    return matchSearch && matchSelected;
  });

  const handleCardClick = (destination) => {
    navigate(`/destinationdetail/${destination.name.replace(/\s+/g, "-").toLowerCase()}`, {
      state: destination,
    });
  };

  return (
    <Section>
      <div className="title">
        <h2>Find Your Perfect Destination</h2>
        {selectedDestination && (
          <p>
            Showing results for: <strong>{selectedDestination.name}</strong>
          </p>
        )}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="destinations">
        {filteredDestinations.map((destination, index) => (
          <div
            key={destination._id || index}
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
                {destination.activities?.slice(0, 3).map((activity, i) => (
                  <span key={i} className="activity">
                    {activity}
                  </span>
                ))}
              </div>
              <h4>PKR {destination.price?.toLocaleString()}</h4>
            </div>

 <div className="spots">
  {destination.touristSpots?.length > 0 && (
    <>
      <h5>🗺️ Tourist Attractions:</h5>
      <ul>
        {destination.touristSpots.slice(0, 3).map((spot, i) => (
          <li key={i}>
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(spot)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {spot}
            </a>
          </li>
        ))}
      </ul>
    </>
  )}
</div>



            <div className="distance">
              <span>
                <strong>Minimum</strong> {destination.days} Days {destination.nights} Nights
              </span>
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
  color:rgb(127, 153, 222);
    }

    p {
      font-size: 1rem;
       color: #475569;
      margin-top: 0.5rem;
    }
  }

  .search-bar {
    text-align: center;
    margin-bottom: 2.5rem;

    input {
      padding: 0.75rem 1.2rem;
      width: 90%;
      max-width: 420px;
      border: none;
      border-radius: 1rem;
      font-size: 1rem;
      color:black;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.3s ease;

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
      }
    }
  }

  .destinations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;

    .destination {
      background: #ffffff;
      border-radius: 1.25rem;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
      overflow: hidden;
      padding: 1.2rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &:hover {
         transform: scale(1.02);
         box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
      }

      img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 1rem;
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1.25rem;
        color: #1e3a8a;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      p {
        font-size: 0.95rem;
        color: #475569;
        line-height: 1.5;
        min-height: 60px;
      }

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.8rem;

        .services {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;

          .activity {
            background: #dbeafe;
            padding: 0.3rem 0.6rem;
            border-radius: 0.5rem;
            font-size: 0.75rem;
            color: #1d4ed8;
            font-weight: 500;
          }
        }

        h4 {
          color: #059669;
          font-size: 1rem;
          font-weight: bold;
        }
      }

      .spots {
  margin-top: 1.2rem;
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
    margin: 0;

    li {
      margin-bottom: 0.3rem;
      list-style: disc;

      a {
        text-decoration: none;
        color: #0ea5e9;
        font-weight: 400;
        transition: color 0.3s ease;

        &:hover {
          color: #0284c7;
          text-decoration: underline;
        }
      }
    }
  }
}


      .distance {
        display: flex;
        justify-content: space-between;
        font-size: 0.85rem;
        color: #6b7280;
        margin-top: 1rem;
        font-style:bold;

        span strong {
          font-weight: 600;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 2rem 1rem;

    .title h2 {
      font-size: 1.6rem;
    }

    .search-bar input {
      font-size: 0.95rem;
    }

    .destination {
      padding: 1rem;
    }
  }
`;
