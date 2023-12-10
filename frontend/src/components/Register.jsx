import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userApis";
import { Button, Input } from "@mui/joy";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //  const [_, setCookies] = useCookies(["access_token"]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerUser(username, password);
      alert("Registration Completed! Now login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="form">
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <Input
              variant="outlined"
              sx={{ margin: "13px" }}
              size="sm"
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <Input
              variant="outlined"
              sx={{ margin: "13px" }}
              size="sm"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button size="sm" variant="solid" type="submit">
            Register
          </Button>
        </form>
      </div>
    </>
  );
}

export default Register;
