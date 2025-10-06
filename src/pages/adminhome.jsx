import React, { useEffect, useState } from "react";

const AdminHome = () => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await fetch("https://upstrive.xo.je/backend/messages.php", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setMessages(data); // ✅ directly set array
      } else {
        console.log("No messages or not authorized");
      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  fetchMessages();
}, []);


  

  return (
    <div>
      <h2>📩 Messages from Users</h2>
      <ul>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <li key={msg.id} className="mb-4 border p-3 rounded">
              <p><b>{msg.name}</b> ({msg.email})</p>
              <p><b>Subject:</b> {msg.subject}</p>
              <p>{msg.message}</p>
              <small>{msg.created_at}</small>

              <div className="mt-2">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                    msg.subject
                  )}&body=Hello ${msg.name},%0D%0A%0D%0A`}
                  className="bg-blue-600 text-white px-3 py-1 rounded inline-block"
                >
                  Reply via Email
                </a>
              </div>
            </li>
          ))
        ) : (
          <li>No messages yet.</li>
        )}
      </ul>
    </div>
  );
};

export default AdminHome;
