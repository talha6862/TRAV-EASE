import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../utils/Axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const activitiesList = [
  "Hiking", "Trekking", "Rafting", "Sight Seeing", "Climbing",
  "Cultural Festivals", "Historical Places", "Offroading", "Camping and Bonfire"
];

const DestinationManager = () => {
  const [destinations, setDestinations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    distance: "",
    days: 1,
    nights: 0,
    activities: [],
    touristSpots: [],
    image: null,
  });
  const [newSpot, setNewSpot] = useState("");

  const fetchDestinations = async () => {
    try {
      const res = await api.get("/admin/destinations");
      setDestinations(res.data);
    } catch (err) {
      toast.error("Failed to fetch destinations");
    }
  };

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price.toString());
    formData.append("distance", form.distance.toString());
    formData.append("days", form.days.toString());
    formData.append("nights", form.nights.toString());
    formData.append("activities", JSON.stringify(form.activities));
    formData.append("touristSpots", JSON.stringify(form.touristSpots));

    if (form.image) {
      formData.append("image", form.image);
    }

    if (editId) {
      await api.put(`/admin/destinations/${editId}`, formData);
      toast.success("Destination updated!");
    } else {
      for (let [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}
      await api.post("/admin/destinations", formData);
      toast.success("Destination added!");
    }

    fetchDestinations();
    resetForm();
  } catch (err) {
    console.error("❌ Error submitting destination:", err);
    toast.error("Error submitting destination.");
  }
};


  const deleteDestination = async (id) => {
    try {
      await api.delete(`/admin/destinations/${id}`);
      fetchDestinations();
      toast.info("Destination deleted.");
    } catch {
      toast.error("Error deleting destination.");
    }
  };

  const handleCardClick = (d) => {
    setEditId(d._id);
    setForm({
      name: d.name,
      description: d.description,
      price: d.price,
      distance: d.distance,
      days: d.days,
      nights: d.nights,
      activities: d.activities || [],
      touristSpots: d.touristSpots || [],
      image: null,
    });
    setNewSpot("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleActivity = (activity) => {
    setForm((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const handleSpotKeyDown = (e) => {
    if (e.key === "Enter" && newSpot.trim()) {
      e.preventDefault();
      setForm((prev) => ({
        ...prev,
        touristSpots: [...prev.touristSpots, newSpot.trim()],
      }));
      setNewSpot("");
    }
  };

  const removeSpot = (index) => {
    setForm((prev) => ({
      ...prev,
      touristSpots: prev.touristSpots.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: 0,
      distance: "",
      days: 1,
      nights: 0,
      activities: [],
      touristSpots: [],
      image: null,
    });
    setEditId(null);
    setNewSpot("");
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <Container>
      <FormCard className="card">
        <h2>{editId ? "Edit Destination" : "Add Destination"}</h2>
        <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextArea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        
        <Label>Price (PKR)</Label>
        <AdjustRow>
          <AdjustButton onClick={() => setForm({ ...form, price: Math.max(0, form.price - 1000) })}>-</AdjustButton>
          <NumberBox>{form.price}</NumberBox>
          <AdjustButton onClick={() => setForm({ ...form, price: form.price + 1000 })}>+</AdjustButton>
        </AdjustRow>

        <Input placeholder="Distance (km)" value={form.distance} onChange={(e) => setForm({ ...form, distance: e.target.value })} />

        <Label>Days / Nights</Label>
        <AdjustRow>
          <AdjustButton onClick={() => {
            const newDays = Math.max(1, form.days - 1);
            setForm({ ...form, days: newDays, nights: newDays - 1 });
          }}>-</AdjustButton>
          <NumberBox>{form.days} Days / {form.nights} Nights</NumberBox>
          <AdjustButton onClick={() => {
            const newDays = form.days + 1;
            setForm({ ...form, days: newDays, nights: newDays - 1 });
          }}>+</AdjustButton>
        </AdjustRow>

        <Label>Activities</Label>
        <CheckboxGrid>
          {activitiesList.map((activity) => (
            <label key={activity}>
              <input
                type="checkbox"
                checked={form.activities.includes(activity)}
                onChange={() => toggleActivity(activity)}
              />
              {activity}
            </label>
          ))}
        </CheckboxGrid>

        <Label>Tourist Spots</Label>
        <TagsContainer>
          {form.touristSpots.map((spot, i) => (
            <Tag key={i}>
              {spot} <RemoveTag onClick={() => removeSpot(i)}>×</RemoveTag>
            </Tag>
          ))}
          <TagInput
            placeholder="Type and press Enter"
            value={newSpot}
            onChange={(e) => setNewSpot(e.target.value)}
            onKeyDown={handleSpotKeyDown}
          />
        </TagsContainer>

        <Label>Image</Label>
        <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
        <SubmitButton onClick={handleSubmit}>{editId ? "Update" : "Add"} Destination</SubmitButton>
      </FormCard>

      <CardGrid>
        {destinations.map((d) => (
          <Card key={d._id} className="card" onClick={() => handleCardClick(d)}>
            <img src={`${process.env.REACT_APP_API_URL}/${d.image}`} alt={d.name} />
            <h3>{d.name}</h3>
            <p>{d.description}</p>
            <small><strong>Price:</strong> {d.price}</small><br />
            <small><strong>Distance:</strong> {d.distance}</small><br />
            <small><strong>Days:</strong> {d.days} / <strong>Nights:</strong> {d.nights}</small><br />
            <small><strong>Activities:</strong> {d.activities?.join(", ")}</small><br />
            <small><strong>Spots:</strong> {d.touristSpots?.join(", ")}</small><br />
            <DeleteButton onClick={(e) => { e.stopPropagation(); deleteDestination(d._id); }}>Delete</DeleteButton>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default DestinationManager;


const Container = styled.div`
  padding: 2rem 0;
`;

const FormCard = styled.div`
  margin-bottom: 3rem;
`;

const Input = styled.input`
  background-color: white;
  color: black;
  padding: 0.6rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  background-color: white;
  color: black;
  padding: 0.6rem;
  width: 100%;
  margin-bottom: 1rem;
  resize: vertical;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin: 0.5rem 0 0.3rem;
`;

const AdjustRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const AdjustButton = styled.button``;

const NumberBox = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #00c6ff;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(251, 251, 251, 0.1);
`;

const Tag = styled.div`
  background-color: #00c6ff33;
  color: #000;
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
`;

const RemoveTag = styled.span`
  margin-left: 0.5rem;
  cursor: pointer;
`;

const TagInput = styled.input`
  background: transparent;
  border: none;
  color: #000;
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  text-align: center;
  cursor: pointer;
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
`;

const DeleteButton = styled.button`
  background: #dc2626;
  margin-top: 1rem;
  color: white;
  padding: 0.5rem 1rem;
`;
