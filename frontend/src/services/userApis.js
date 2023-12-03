import axios from "axios";

async function registerUser(username, password) {
  await axios.post("http://localhost:8001/auth/register", {
    username,
    password,
  });
}

async function loginUser(username, password) {
  const result = await axios.post("http://localhost:8001/auth/login", {
    username,
    password,
  });
  return result;
}

export { registerUser, loginUser };
