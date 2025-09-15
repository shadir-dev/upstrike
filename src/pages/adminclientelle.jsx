// pages/AdminClientele.js
import React, { useState, useEffect } from "react";
import "./admin.css";

const AdminClientele = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: "",
    logo: "",
    description: "",
    industry: ""
  });
  const [loading, setLoading] = useState(true);

  // Fetch clients from API
  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost/api/clients/read.php');
      const data = await response.json();
      
      if (data.success) {
        setClients(data.data);
      }
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const addClient = async () => {
    if (newClient.name) {
      try {
        const response = await fetch('http://localhost/api/clients/create.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(newClient)
        });

        const data = await response.json();
        
        if (data.success) {
          setClients(prev => [...prev, { id: data.clientId, ...newClient }]);
          setNewClient({
            name: "",
            logo: "",
            description: "",
            industry: ""
          });
          fetchClients(); // Refresh the list
        }
      } catch (err) {
        console.error('Error adding client:', err);
      }
    }
  };

  const deleteClient = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        const response = await fetch('http://localhost/api/clients/delete.php', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ id })
        });

        const data = await response.json();
        
        if (data.success) {
          setClients(prev => prev.filter(client => client.id !== id));
        }
      } catch (err) {
        console.error('Error deleting client:', err);
      }
    }
  };

  if (loading) return <div className="loading">Loading clients...</div>;

  return (
    <div className="admin-clientele">
      <div className="admin-content-header">
        <h1>Manage Clients</h1>
        <p>Add, edit, or remove client information</p>
      </div>

      <div className="clients-management">
        <div className="clients-list">
          <h2>Current Clients</h2>
          {clients.map(client => (
            <div key={client.id} className="client-card admin">
              <div className="client-info">
                <div className="client-logo">{client.logo || client.name.charAt(0)}</div>
                <div className="client-details">
                  <h3>{client.name}</h3>
                  <span className="industry">{client.industry}</span>
                  <p>{client.description}</p>
                </div>
              </div>
              <div className="client-actions">
                <button 
                  type="button" 
                  className="btn-delete"
                  onClick={() => deleteClient(client.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="add-client-form">
          <h2>Add New Client</h2>
          <div className="form-group">
            <label>Client Name *</label>
            <input
              type="text"
              value={newClient.name}
              onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Logo Initials</label>
            <input
              type="text"
              value={newClient.logo}
              onChange={(e) => setNewClient({...newClient, logo: e.target.value})}
              maxLength="4"
              placeholder="e.g., TN"
            />
          </div>
          <div className="form-group">
            <label>Industry</label>
            <select
              value={newClient.industry}
              onChange={(e) => setNewClient({...newClient, industry: e.target.value})}
            >
              <option value="Technology">Technology</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Sustainability">Sustainability</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newClient.description}
              onChange={(e) => setNewClient({...newClient, description: e.target.value})}
              rows="3"
            />
          </div>
          <button type="button" className="btn btn-add" onClick={addClient}>
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminClientele;