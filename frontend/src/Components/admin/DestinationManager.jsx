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
  const [submitting, setSubmitting] = useState(false);

  const fetchDestinations = async () => {
    try {
      const res = await api.get("/admin/destinations");
      setDestinations(res.data);
    } catch (err) {
      toast.error("Failed to fetch destinations");
    }
  };

const handleSubmit = async () => {
  if (!form.name.trim() || !form.description.trim()) {
    toast.error("Name and description are required.");
    return;
  }
  if (!editId && !form.image) {
    toast.error("Please choose an image for the destination.");
    return;
  }
  setSubmitting(true);
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
      await api.post("/admin/destinations", formData);
      toast.success("Destination added!");
    }

    fetchDestinations();
    resetForm();
  } catch (err) {
    console.error("Error submitting destination:", err);
    // Show what the server actually said, so a failure is diagnosable.
    toast.error(
      err.response?.data?.message ||
        (err.code === "ERR_NETWORK"
          ? "Cannot reach the server. Is the backend running?"
          : "Error submitting destination.")
    );
  } finally {
    setSubmitting(false);
  }
};


  const deleteDestination = async (id) => {
    if (!window.confirm("Delete this destination? This cannot be undone.")) return;
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
      <FormCard>
        <h2>{editId ? "Edit Destination" : "Add Destination"}</h2>

        <Grid>
          <Field>
            <Label htmlFor="d-name">Name</Label>
            <Input
              id="d-name"
              placeholder="e.g. Hunza Valley"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>

          <Field>
            <Label htmlFor="d-distance">Distance (km)</Label>
            <Input
              id="d-distance"
              placeholder="e.g. 600"
              value={form.distance}
              onChange={(e) => setForm({ ...form, distance: e.target.value })}
            />
          </Field>

          <Field $full>
            <Label htmlFor="d-desc">Description</Label>
            <TextArea
              id="d-desc"
              placeholder="What makes this destination worth the trip?"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>

          <Field>
            <Label>Price (PKR)</Label>
            <AdjustRow>
              <AdjustButton
                type="button"
                aria-label="Decrease price"
                onClick={() => setForm({ ...form, price: Math.max(0, form.price - 1000) })}
              >
                −
              </AdjustButton>
              <NumberBox>{Number(form.price).toLocaleString("en-PK")}</NumberBox>
              <AdjustButton
                type="button"
                aria-label="Increase price"
                onClick={() => setForm({ ...form, price: form.price + 1000 })}
              >
                +
              </AdjustButton>
            </AdjustRow>
          </Field>

          <Field>
            <Label>Days / Nights</Label>
            <AdjustRow>
              <AdjustButton
                type="button"
                aria-label="Fewer days"
                onClick={() => {
                  const newDays = Math.max(1, form.days - 1);
                  setForm({ ...form, days: newDays, nights: newDays - 1 });
                }}
              >
                −
              </AdjustButton>
              <NumberBox>
                {form.days} {form.days === 1 ? "Day" : "Days"} / {form.nights}{" "}
                {form.nights === 1 ? "Night" : "Nights"}
              </NumberBox>
              <AdjustButton
                type="button"
                aria-label="More days"
                onClick={() => {
                  const newDays = form.days + 1;
                  setForm({ ...form, days: newDays, nights: newDays - 1 });
                }}
              >
                +
              </AdjustButton>
            </AdjustRow>
          </Field>

          <Field $full>
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
          </Field>

          <Field $full>
            <Label>Tourist Spots</Label>
            <TagsContainer>
              {form.touristSpots.map((spot, i) => (
                <Tag key={`${spot}-${i}`}>
                  {spot}
                  <RemoveTag
                    role="button"
                    aria-label={`Remove ${spot}`}
                    onClick={() => removeSpot(i)}
                  >
                    ×
                  </RemoveTag>
                </Tag>
              ))}
              <TagInput
                placeholder={
                  form.touristSpots.length ? "Add another…" : "Type a spot and press Enter"
                }
                value={newSpot}
                onChange={(e) => setNewSpot(e.target.value)}
                onKeyDown={handleSpotKeyDown}
              />
            </TagsContainer>
          </Field>

          <Field $full>
            <Label>Image {editId && "(leave empty to keep the current one)"}</Label>
            <FileRow>
              <FileButton htmlFor="d-image">
                {form.image ? "Change image" : "Choose image"}
              </FileButton>
              <input
                id="d-image"
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] || null })}
              />
              <FileName>
                {form.image ? form.image.name : "PNG, JPG or WebP — up to 8 MB"}
              </FileName>
            </FileRow>
          </Field>
        </Grid>

        <Actions>
          <SubmitButton type="button" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Saving…" : editId ? "Update Destination" : "Add Destination"}
          </SubmitButton>
          {editId && (
            <CancelButton type="button" onClick={resetForm}>
              Cancel edit
            </CancelButton>
          )}
        </Actions>
      </FormCard>

      <SectionTitle>
        Destinations {destinations.length > 0 && `(${destinations.length})`}
      </SectionTitle>

      <CardGrid>
        {destinations.length === 0 && (
          <Empty>No destinations yet. Add your first one using the form above.</Empty>
        )}
        {destinations.map((d) => (
          <Card key={d._id} onClick={() => handleCardClick(d)}>
            <img
              src={
                d.image
                  ? `${(process.env.REACT_APP_API_URL || "").replace(/\/$/, "")}/${d.image}`
                  : "https://placehold.co/600x400?text=No+image"
              }
              alt={d.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x400?text=Image+unavailable";
              }}
            />
            <h3>{d.name}</h3>
            <p>{d.description}</p>
            <Meta>
              <li><strong>Price:</strong> PKR {Number(d.price || 0).toLocaleString("en-PK")}</li>
              <li><strong>Distance:</strong> {d.distance || "—"} km</li>
              <li><strong>Duration:</strong> {d.days} days / {d.nights} nights</li>
              <li title={d.activities?.join(", ")}>
                <strong>Activities:</strong> {d.activities?.join(", ") || "—"}
              </li>
              <li title={d.touristSpots?.join(", ")}>
                <strong>Spots:</strong> {d.touristSpots?.join(", ") || "—"}
              </li>
            </Meta>
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                deleteDestination(d._id);
              }}
            >
              Delete
            </DeleteButton>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default DestinationManager;


const Container = styled.div`
  max-width: 1200px;
  margin-inline: auto;
  padding: 2rem clamp(16px, 4vw, 40px) 4rem;
`;

const FormCard = styled.div`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.6));
  -webkit-backdrop-filter: blur(18px) saturate(1.5);
  backdrop-filter: blur(18px) saturate(1.5);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  box-shadow: 0 18px 40px -22px rgba(6, 36, 43, 0.38);
  padding: clamp(1.25rem, 3vw, 2.25rem);
  margin-bottom: 3rem;

  h2 {
    margin: 0 0 1.5rem;
    color: #0d2a31;
    font-size: clamp(20px, 2.6vw, 26px);
  }

  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    background: rgba(255, 255, 255, 0.96);
  }
`;

/* Two columns on desktop, one on phones. */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 1.5rem;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
  ${(p) => p.$full && "grid-column: 1 / -1;"}
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.85rem;
  color: #0d2a31;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(6, 36, 43, 0.18);
  border-radius: 10px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:focus {
    outline: none;
    border-color: #0e9aa7;
    box-shadow: 0 0 0 3px rgba(14, 154, 167, 0.18);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.7rem 0.85rem;
  color: #0d2a31;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(6, 36, 43, 0.18);
  border-radius: 10px;
  resize: vertical;
  font: inherit;

  &:focus {
    outline: none;
    border-color: #0e9aa7;
    box-shadow: 0 0 0 3px rgba(14, 154, 167, 0.18);
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.86rem;
  letter-spacing: 0.01em;
  color: #41606a;
`;

const AdjustRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.35rem 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(6, 36, 43, 0.18);
  border-radius: 10px;
`;

const AdjustButton = styled.button`
  flex: 0 0 34px;
  height: 34px;
  display: grid;
  place-items: center;
  font-size: 1.15rem;
  line-height: 1;
  color: #06242b;
  background: rgba(14, 154, 167, 0.14);
  border: 1px solid rgba(14, 154, 167, 0.3);
  border-radius: 8px;
  transition: background 0.18s ease, transform 0.12s ease;

  &:hover { background: rgba(14, 154, 167, 0.26); }
  &:active { transform: scale(0.94); }
`;

const NumberBox = styled.span`
  flex: 1;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0a7781;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 0.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.7rem;
    font-size: 0.88rem;
    color: #0d2a31;
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(6, 36, 43, 0.12);
    border-radius: 9px;
    cursor: pointer;
    transition: background 0.18s ease, border-color 0.18s ease;

    &:hover { background: #fff; border-color: rgba(14, 154, 167, 0.45); }
  }

  input[type="checkbox"] {
    accent-color: #0e9aa7;
    width: 16px;
    height: 16px;
    flex: 0 0 auto;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem;
  min-height: 48px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(6, 36, 43, 0.18);
  border-radius: 10px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  font-size: 0.84rem;
  color: #06242b;
  background: rgba(14, 154, 167, 0.16);
  border: 1px solid rgba(14, 154, 167, 0.32);
  border-radius: 30px;
`;

const RemoveTag = styled.span`
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  opacity: 0.6;
  &:hover { opacity: 1; color: #b91c1c; }
`;

const TagInput = styled.input`
  flex: 1;
  min-width: 140px;
  padding: 0.3rem;
  color: #0d2a31;
  background: transparent;
  border: none;
  &:focus { outline: none; }
`;

/* Native file inputs cannot be styled, so the real one is hidden
   behind a label that looks like a button. */
const FileRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;

  input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }
`;

const FileButton = styled.label`
  padding: 0.6rem 1.1rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #06242b;
  background: rgba(14, 154, 167, 0.16);
  border: 1px dashed rgba(14, 154, 167, 0.5);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.18s ease;
  &:hover { background: rgba(14, 154, 167, 0.26); }
`;

const FileName = styled.span`
  font-size: 0.84rem;
  color: #74909a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.6rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #0e9aa7, #0a7781);
  border: none;
  border-radius: 10px;
  box-shadow: 0 10px 24px -12px rgba(14, 154, 167, 0.75);
  transition: transform 0.15s ease, box-shadow 0.18s ease;

  &:hover { transform: translateY(-2px); box-shadow: 0 16px 30px -14px rgba(14, 154, 167, 0.85); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.4rem;
  font-weight: 600;
  color: #41606a;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(6, 36, 43, 0.18);
  border-radius: 10px;
  &:hover { background: #fff; }
`;

const SectionTitle = styled.h3`
  margin: 0 0 1.25rem;
  color: #0d2a31;
  font-size: clamp(18px, 2.2vw, 22px);
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.62));
  -webkit-backdrop-filter: blur(14px) saturate(1.4);
  backdrop-filter: blur(14px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  box-shadow: 0 14px 34px -20px rgba(6, 36, 43, 0.4);
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.3, 1), box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 26px 54px -24px rgba(6, 36, 43, 0.5);
  }

  img {
    width: 100%;
    height: 170px;
    object-fit: cover;
    display: block;
  }

  h3 {
    margin: 0.9rem 1rem 0.35rem;
    font-size: 1.02rem;
    color: #0d2a31;
  }

  p {
    margin: 0 1rem 0.75rem;
    font-size: 0.86rem;
    line-height: 1.5;
    color: #41606a;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    background: rgba(255, 255, 255, 0.96);
  }
`;

const Meta = styled.ul`
  list-style: none;
  margin: 0 1rem 1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #41606a;

  strong { color: #0d2a31; font-weight: 600; }
  li { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;

const DeleteButton = styled.button`
  margin: auto 1rem 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.84rem;
  font-weight: 600;
  color: #b91c1c;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.28);
  border-radius: 9px;
  &:hover { background: rgba(220, 38, 38, 0.18); }
`;

const Empty = styled.p`
  grid-column: 1 / -1;
  padding: 2.5rem;
  text-align: center;
  color: #74909a;
  background: rgba(255, 255, 255, 0.6);
  border: 1px dashed rgba(6, 36, 43, 0.18);
  border-radius: 14px;
`;
