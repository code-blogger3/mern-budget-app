import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    // navigate("/auth");
  };
  return (
    <>
      <button onClick={logout}> Logout </button>
    </>
  );
}

export default Navbar;
