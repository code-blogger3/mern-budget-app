import axios from "axios";

async function registerUser(username, password) {
  await axios.post("/api/register", {
    username,
    password,
  });
}

async function loginUser(username, password) {
  const result = await axios.post("/api/login", {
    username,
    password,
  });
  return result;
}

export { registerUser, loginUser };
