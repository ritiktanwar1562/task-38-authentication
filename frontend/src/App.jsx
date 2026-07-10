import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Register user
  const registerUser = async () => {

    try {

      const res = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });

      setMessage(res.data.message);

    } catch (error) {
      setMessage("Registration Failed");
    }

  };

  // Login user
  const loginUser = async () => {

    try {

      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);

      setMessage("Login Successful");

    } catch (error) {

      setMessage("Login Failed");

    }

  };

  //  get Protected data
  const getProtectedData = async () => {

    const token = localStorage.getItem("token");

    try {

      const res = await axios.get("http://localhost:5000/protected", {

        headers: {
          Authorization: token,
        },

      });

      setMessage(res.data.message);

    } catch (error) {

      setMessage("Access Denied");

    }

  };

  return (

    <div className="container">

      <h1>JWT Authentication</h1>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={registerUser}>Register</button>

      <button onClick={loginUser}>Login</button>

      <button onClick={getProtectedData}>Protected Route</button>

      <h3>{message}</h3>

    </div>

  );

}

export default App;