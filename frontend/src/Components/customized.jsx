import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Customized() {
  const [destinationsList, setDestinationsList] = useState([]);

  const user = JSON.parse(localStorage.getItem("UserInfo"));
  const [preferences, setPreferences] = useState({
    email: user?.email || "",
    destination: "",
    travelDate: "",
    budget: 0,
    activities: [],
    touristSpots: [],

    numberOfPersons: 1,
    numberOfDays: 1,
  });

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("http://localhost:8001/admin/destinations");
        const data = await res.json();
        setDestinationsList(data);
      } catch (err) {
        console.error("Failed to load destinations:", err);
      }
    };
    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "destination") {
  const selected = destinationsList.find((d) => d.name === value);
  setPreferences((prev) => ({
    ...prev,
    destination: value,
    numberOfDays: selected?.days || 1,
    activities: selected?.activities || [],
    touristSpots: [], 
  }));
} else {
      setPreferences({ ...preferences, [name]: value });
    }
  };

  const handleIncrementPersons = () => {
    setPreferences((prev) => ({
      ...prev,
      numberOfPersons: prev.numberOfPersons + 1,
    }));
  };

  const handleDecrementPersons = () => {
    setPreferences((prev) => ({
      ...prev,
      numberOfPersons: Math.max(1, prev.numberOfPersons - 1),
    }));
  };

  const handleIncrementBudget = () => {
    setPreferences((prev) => ({ ...prev, budget: prev.budget + 1000 }));
  };

  const handleDecrementBudget = () => {
    setPreferences((prev) => ({
      ...prev,
      budget: Math.max(0, prev.budget - 1000),
    }));
  };

  const handleSliderChange = (e) => {
    setPreferences({ ...preferences, numberOfDays: parseInt(e.target.value) });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setPreferences((prev) => {
      if (checked) {
        return { ...prev, activities: [...prev.activities, value] };
      } else {
        return {
          ...prev,
          activities: prev.activities.filter((activity) => activity !== value),
        };
      }
    });
  };

  const handleTouristSpotChange = (e) => {
  const { value, checked } = e.target;
  setPreferences((prev) => {
    if (checked) {
      return { ...prev, touristSpots: [...prev.touristSpots, value] };
    } else {
      return {
        ...prev,
        touristSpots: prev.touristSpots.filter((spot) => spot !== value),
      };
    }
  });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Custom Travel Preferences:", preferences);

    try {
      const response = await fetch(
        "http://localhost:8001/api/travel-preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferences),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Your custom travel preferences have been submitted!");
      setPreferences({
        email: user?.email || "",
        destination: "",
        travelDate: "",
        budget: 0,
        activities: [],

        numberOfPersons: 1,
        numberOfDays: 1,
      });
    } catch (error) {
      console.error("Error submitting preferences:", error);
      alert("Failed to submit preferences. Please try again.");
    }
  };

  return (
    <Container>
      <h1>Customize Your Travel Plan</h1>
      <p>Fill out the form below to create a travel plan tailored to your preferences!</p>
      <Form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="destination">Preferred Destination</label>
          <select
            id="destination"
            name="destination"
            value={preferences.destination}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your destination
            </option>
            {destinationsList.map((dest) => (
              <option key={dest._id} value={dest.name}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    value={preferences.email}
    disabled
  />
</div>


        <div className="form-group">
          <label htmlFor="travelDate">Travel Date</label>
          <input
            type="date"
            id="travelDate"
            name="travelDate"
            value={preferences.travelDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Budget (in PKR)</label>
          <div className="budget-input">
            <button type="button" onClick={handleDecrementBudget}>
              -1000
            </button>
            <input
              type="number"
              id="budget"
              name="budget"
              value={preferences.budget}
              readOnly
            />
            <button type="button" onClick={handleIncrementBudget}>
              +1000
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Preferred Activities</label>
          <ActivityCheckboxes>
            {[
              "Trekking",
              "Hiking",
              "Climbing",
              "Cultural Festivals",
              "Rafting",
              "Historical Places",
              "Sight Seeing",
              "Offroading",
              "Camping",
              "Bonfire",
            ].map((activity) => (
              <div key={activity}>
                <input
                  type="checkbox"
                  id={activity}
                  value={activity}
                  checked={preferences.activities.includes(activity)}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={activity}>{activity}</label>
              </div>
            ))}
          </ActivityCheckboxes>
        </div>
        {preferences.destination && (
  <div className="form-group">
    <label>Tourist Spots</label>
    <ActivityCheckboxes>
      {destinationsList
        .find((d) => d.name === preferences.destination)
        ?.touristSpots?.map((spot) => (
          <div key={spot}>
            <input
              type="checkbox"
              id={`spot-${spot}`}
              value={spot}
              checked={preferences.touristSpots.includes(spot)}
              onChange={handleTouristSpotChange}
            />
            <label htmlFor={`spot-${spot}`}>{spot}</label>
          </div>
        ))}
    </ActivityCheckboxes>
  </div>
)}


        <div className="form-group">
          <label>Number of Persons</label>
          <div className="number-input">
            <button type="button" onClick={handleDecrementPersons}>
              -
            </button>
            <input
              type="number"
              name="numberOfPersons"
              value={preferences.numberOfPersons}
              readOnly
            />
            <button type="button" onClick={handleIncrementPersons}>
              +
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Minimum Number of Days</label>
          <input
            type="range"
            min="1"
            max="10"
            value={preferences.numberOfDays}
            onChange={handleSliderChange}
          />
          <span>{preferences.numberOfDays} day(s)</span>
        </div>

        <button type="submit">Submit Preferences</button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  max-width: 700px;
  margin: 2rem auto;
  background: transparent; 
  border-radius: 1rem;
  box-shadow: none;        
  text-align: center;

  h1 {
    color:rgb(120, 166, 225);
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color:rgb(120, 166, 225);
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 640px) {
    padding: 1rem;
    margin: 1rem;
  }
`;


const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.8rem;
  background: transparent;
  padding: 1rem 0;       
  input, select {
  background: rgba(255, 255, 255, 0.7); 
  backdrop-filter: blur(2px);
  color:black;
} 
`;


const ActivityCheckboxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  div {
    display: flex;
    align-items: center;
    background: #f0f9ff;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid #bde0fe;

    label {
      font-size: 0.95rem;
      color: #023e8a;
      font-weight: 500;
    }

    input {
      margin-right: 0.5rem;
      accent-color: #0077b6;
    }
  }
`;

