import React, { useState } from "react";
import { loginUser } from "../services/userApis";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, Input } from "@mui/joy";
import { useSetRecoilState } from "recoil";
import { isUserLogin } from "../states/atoms/userLogin";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setIsLogin = useSetRecoilState(isUserLogin);
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await loginUser(username, password);
      setCookies("access_token", result.data.data.token);
      window.localStorage.setItem("userID", result.data.data.userID);
      navigate("/");
      // console.log(result);
      setIsLogin(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="form">
          <h2>Login</h2>
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
          <Button type="submit" size="sm" variant="solid">
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
