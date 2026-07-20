import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Invalid Email");
      return;
    }

    if (!/^\d+$/.test(formData.phone)) {
      alert("Phone must contain only digits");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/contact",
        formData
      );

      setResponse(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Contact Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <textarea
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {response && <p className="success">{response}</p>}
    </div>
  );
}

export default App;
