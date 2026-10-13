import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "../utils/Axios";
import { toast } from "react-toastify";

const vehicleOptions = ["Grand Cabin", "Coaster", "Saloon (28 Seater)", "4x4 Jeeps", "Yutong Nova Bus (44 Seater)"];
const accommodationOptions = ["Luxury Hotels", "Motels", "Hostels", "Resorts", "Guest House", "Camping Pods"];
const touristTypes = ["Couples", "Males", "Females"];

const TourOperatorRegister = () => {
  const [formData, setFormData] = useState({
    operatorName: "",
    company: "",
    accountNumber: "",
    destinationName: "",
    destinationImage: null,
    email: "",
    phone: "",
    price: "",
    days: 1,
    nights: 0,
    touristSpots: [],
    vehicleTypes: [],
    accommodations: [],
    touristTypes: [],
    facilities: [],
    departures: []
  });

  const [facilityInput, setFacilityInput] = useState("");
  const [allDestinations, setAllDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await api.get("/admin/destinations");
        setAllDestinations(res.data);
      } catch (err) {
        console.error("Failed to load destinations:", err);
      }
    };
    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "destinationName") {
      const selected = allDestinations.find((d) => d.name === value);
      setFormData((prev) => ({
        ...prev,
        destinationName: value,
        price: selected?.price || ""
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        destinationImage: file
      }));
    }
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => {
      const list = prev[field];
      const updatedList = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...prev, [field]: updatedList };
    });
  };

  const handleFacilityAdd = (e) => {
    if (e.key === "Enter" && facilityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, facilityInput.trim()]
      }));
      setFacilityInput("");
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
    });

    try {
      await api.post("/api/tour-operators/register-tour", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Tour Operator Registered Successfully!");
      alert("Registration Successful!");

      setFormData({
        operatorName: "",
        company: "",
        accountNumber: "",
        destinationName: "",
        destinationImage: null,
        email: "",
        phone: "",
        price: "",
        days: 1,
        nights: 0,
        touristSpots: [],
        vehicleTypes: [],
        accommodations: [],
        touristTypes: [],
        facilities: [],
        departures: []
      });
      setFacilityInput("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  const addDeparture = () => {
    if (formData.departures.length < 3) {
      setFormData((prev) => ({
        ...prev,
        departures: [...prev.departures, { city: "", singlePrice: "", couplePrice: "" }]
      }));
    }
  };

  const updateDeparture = (index, field, value) => {
    const updated = [...formData.departures];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, departures: updated }));
  };

  const removeDeparture = (index) => {
    const updated = [...formData.departures];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, departures: updated }));
  };

  const selectedDestination = allDestinations.find((d) => d.name === formData.destinationName);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Register as a Tour Operator</h2>

        <label>Name of Operator</label>
        <input name="operatorName" value={formData.operatorName} onChange={handleChange} required />

        <label>Tour Company</label>
        <input name="company" value={formData.company} onChange={handleChange} required />

        <label>Account Number</label>
        <input name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />

        <label>Destination Name</label>
        <select name="destinationName" value={formData.destinationName} onChange={handleChange} required>
          <option value="">Select Destination</option>
          {allDestinations.map((d) => <option key={d._id} value={d.name}>{d.name}</option>)}
        </select>

        {selectedDestination && (
          <div>
            <label>Tourist Spots</label>
            <CheckboxGrid>
              {selectedDestination.touristSpots?.map((spot) => (
                <div key={spot}>
                  <input type="checkbox" checked={formData.touristSpots.includes(spot)} onChange={() => handleCheckboxChange("touristSpots", spot)} /> {spot}
                </div>
              ))}
            </CheckboxGrid>
          </div>
        )}

        <label>Departure Cities & Prices (Max 3)</label>
        {formData.departures.map((dep, index) => (
          <div key={index} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Departure City"
              value={dep.city}
              onChange={(e) => updateDeparture(index, "city", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Single Price"
              value={dep.singlePrice}
              onChange={(e) => updateDeparture(index, "singlePrice", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Couple Price"
              value={dep.couplePrice}
              onChange={(e) => updateDeparture(index, "couplePrice", e.target.value)}
              required
            />
            <button type="button" onClick={() => removeDeparture(index)}>Remove</button>
          </div>
        ))}
        {formData.departures.length < 3 && (
          <button type="button" onClick={addDeparture}>Add Departure</button>
        )}

        <label>Upload Destination Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone Number</label>
        <input name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Tour Duration</label>
        <DurationContainer>
          <div className="duration-section">
            <span>Days</span>
            <div className="counter">
              <button type="button" onClick={() => setFormData((prev) => ({ ...prev, days: Math.max(1, prev.days - 1), nights: Math.max(0, prev.days - 2) }))}>-</button>
              <input type="text" value={formData.days || 1} readOnly />
              <button type="button" onClick={() => setFormData((prev) => ({ ...prev, days: prev.days + 1, nights: prev.days }))}>+</button>
            </div>
          </div>
          <div className="duration-section">
            <span>Nights</span>
            <input type="text" value={formData.nights || 0} readOnly />
          </div>
        </DurationContainer>

        <label>Vehicle Types</label>
        <CheckboxGrid>
          {vehicleOptions.map((v) => (
            <div key={v}>
              <input type="checkbox" checked={formData.vehicleTypes.includes(v)} onChange={() => handleCheckboxChange("vehicleTypes", v)} /> {v}
            </div>
          ))}
        </CheckboxGrid>

        <label>Accommodations</label>
        <CheckboxGrid>
          {accommodationOptions.map((a) => (
            <div key={a}>
              <input type="checkbox" checked={formData.accommodations.includes(a)} onChange={() => handleCheckboxChange("accommodations", a)} /> {a}
            </div>
          ))}
        </CheckboxGrid>

        <label>Tourists</label>
        <CheckboxGrid>
          {touristTypes.map((t) => (
            <div key={t}>
              <input type="checkbox" checked={formData.touristTypes.includes(t)} onChange={() => handleCheckboxChange("touristTypes", t)} /> {t}
            </div>
          ))}
        </CheckboxGrid>

        <label>Facilities (Press Enter to Add)</label>
        <input type="text" value={facilityInput} onChange={(e) => setFacilityInput(e.target.value)} onKeyDown={handleFacilityAdd} />
        <FacilityTags>
          {formData.facilities.map((f, i) => <span key={i}>✅ {f}</span>)}
        </FacilityTags>

        <button type="submit">Register as Tour Operator</button>
      </Form>
    </Container>
  );
};

export default TourOperatorRegister;

const Container = styled.div`
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
`;

const Form = styled.form`
  background: #ffffffee;
  padding: 3rem;
  border-radius: 18px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 880px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  backdrop-filter: blur(10px);

  h2 {
    font-size: 2rem;
    text-align: center;
    color: #0f172a;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  label {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
    display: block;
  }

  input,
  select {
    color: #1e293b;
    padding: 0.85rem;
    border-radius: 12px;
    border: 1px solid #cbd5e1;
    font-size: 1rem;
    width: 100%;
    background: white;
    transition: border 0.3s;

    &:focus {
      outline: none;
      border-color: #0ea5e9;
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.25);
    }
  }

  button[type="submit"] {
    padding: 1rem;
    background: #0ea5e9;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #0284c7;
      transform: translateY(-2px);
    }
  }
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.8rem;

  div {
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f0f9ff;
    padding: 0.6rem 0.8rem;
    border-radius: 8px;

    input[type="checkbox"] {
      accent-color: #0ea5e9;
    }
  }
`;

const DurationContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  .duration-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-weight: bold;
      color: #0ea5e9;
      margin-bottom: 0.3rem;
    }

    .counter {
      display: flex;
      align-items: center;
      gap: 0.6rem;

      button {
        background-color: #0ea5e9;
        border: none;
        padding: 0.6rem 1rem;
        font-size: 1.2rem;
        color: white;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.2s ease;

        &:hover {
          background-color: #0369a1;
        }
      }

      input {
        width: 60px;
        text-align: center;
        font-size: 1rem;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 0.4rem;
        background: white;
      }
    }
  }
`;

const FacilityTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;

  span {
    background: #dbeafe;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    color: #1e40af;
  }
`;
