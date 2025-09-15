import React, { useEffect, useState } from "react";
import "./admin.css";

const AdminDashboard = () => {
  const [team, setTeam] = useState([]);
  const [clients, setClients] = useState([]);
  const [profile, setProfile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    bio: "",
    email: "",
    image: null,
  });
  const [newClient, setNewClient] = useState({ name: "", logo: null });

  const [feedback, setFeedback] = useState(""); // <-- feedback message

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetch("http://localhost/cliantelle_projects/backend/admin.php")
      .then((res) => res.json())
      .then((data) => {
        setTeam(data.team);
        setClients(data.clients);
        setProfile(data.profile);
      })
      .catch(() => setFeedback("Failed to load data."));
  };

  // Upload company profile
  const handleProfileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", profileFile);

    fetch("http://localhost/cliantelle_projects/backend/upload_profile.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFeedback("✅ Profile uploaded successfully.");
        loadData();
      })
      .catch(() => setFeedback("❌ Error uploading profile."));
  };

  // Add team member
  const handleAddMember = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newMember).forEach((key) =>
      formData.append(key, newMember[key])
    );

    fetch("http://localhost/cliantelle_projects/backend/team.php?action=add", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        setFeedback("✅ Team member added.");
        setNewMember({ name: "", role: "", bio: "", email: "", image: null });
        loadData();
      })
      .catch(() => setFeedback("❌ Failed to add team member."));
  };

  // Delete member
  const deleteMember = (id) => {
    const formData = new FormData();
    formData.append("id", id);

    fetch("http://localhost/cliantelle_projects/backend/team.php?action=delete", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        setFeedback("🗑️ Team member deleted.");
        loadData();
      })
      .catch(() => setFeedback("❌ Failed to delete team member."));
  };

  // Add client
  const handleAddClient = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newClient.name);
    formData.append("logo", newClient.logo);
    formData.append("industry", newClient.industry || "Technology");

    fetch("http://localhost/cliantelle_projects/backend/clients.php?action=add", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        setFeedback("✅ Client added successfully.");
        setNewClient({ name: "", logo: null });
        loadData();
      })
      .catch(() => setFeedback("❌ Failed to add client."));
  };

  // Delete client
  const deleteClient = (id) => {
    const formData = new FormData();
    formData.append("id", id);

    fetch("http://localhost/cliantelle_projects/backend/clients.php?action=delete", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        setFeedback("🗑️ Client deleted.");
        loadData();
      })
      .catch(() => setFeedback("❌ Failed to delete client."));
  };

  return (
    <div className="admin-dashboard container">
      <h1>Admin Management Dashboard</h1>

      {feedback && <p className="feedback">{feedback}</p>} {/* <-- Feedback */}

      {/* TEAM */}
      <section>
        <h2>Team Members</h2>
        <form onSubmit={handleAddMember}>
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          />
          <textarea
            placeholder="Bio"
            value={newMember.bio}
            onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) =>
              setNewMember({ ...newMember, image: e.target.files[0] })
            }
          />
          <button type="submit">Add Member</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {team.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.role}</td>
                <td>{m.email}</td>
                <td>
                  <button onClick={() => deleteMember(m.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* CLIENTS */}
      <section>
        <h2>Clients</h2>
        <form onSubmit={handleAddClient}>
          <input
            type="text"
            placeholder="Client Name"
            value={newClient.name}
            onChange={(e) =>
              setNewClient({ ...newClient, name: e.target.value })
            }
            required
          />

          <input
            type="file"
            onChange={(e) =>
              setNewClient({ ...newClient, logo: e.target.files[0] })
            }
          />

          <select
            value={newClient.industry || "Technology"}
            onChange={(e) =>
              setNewClient({ ...newClient, industry: e.target.value })
            }
            required
          >
            {[
              "All",
              "Technology",
              "Financial Services",
              "Healthcare",
              "Sustainability",
              "E-commerce",
              "Education",
            ].map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>

          <button type="submit">Add Client</button>
        </form>

        <div className="clients-grid">
          {clients.map((c) => (
            <div key={c.id} className="client-card">
              <p>{c.name}</p>
              <p>
                <strong>Industry:</strong> {c.industry}
              </p>
              {c.logo && (
                <img
                  src={`http://localhost/cliantelle_projects/backend/${c.logo}`}
                  alt={c.name}
                  width="80"
                />
              )}
              <button onClick={() => deleteClient(c.id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      {/* PROFILE */}
      <section>
        <h2>Company Profile</h2>
        {profile ? (
          <p>
            Current:{" "}
            <a
              href={`http://localhost/cliantelle_projects/backend/${profile.file_path}`}
              target="_blank"
              rel="noreferrer"
            >
              {profile.file_name}
            </a>
          </p>
        ) : (
          <p>No profile uploaded.</p>
        )}
        <form onSubmit={handleProfileUpload}>
          <input
            type="file"
            onChange={(e) => setProfileFile(e.target.files[0])}
            accept=".pdf,.doc,.docx"
            required
          />
          <button type="submit">Upload Profile</button>
        </form>
      </section>
    </div>
  );
};

export default AdminDashboard;
