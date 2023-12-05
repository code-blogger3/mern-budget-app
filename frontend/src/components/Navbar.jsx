import { Button, Grid } from "@mui/joy";
import { useCookies } from "react-cookie";
import "../styles/navbar.css";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    // navigate("/auth");
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
      >
        <Grid>
          <Button color="neutral" onClick={logout} variant="plain">
            Logout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Navbar;
