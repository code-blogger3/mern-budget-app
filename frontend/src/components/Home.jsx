import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Home() {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [budget, setBudget] = useState({
    name: "",
    max: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBudget({ ...budget, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:8001/budget",
        { ...budget, userID },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("buget created");
      //   navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={budget.name}
          onChange={handleChange}
        />
        <label htmlFor="max">Maximum amount</label>
        <input
          type="number"
          name="max"
          id="max"
          value={budget.max}
          onChange={handleChange}
        />
        <button>add</button>
      </form>
    </>
  );
}

export default Home;
