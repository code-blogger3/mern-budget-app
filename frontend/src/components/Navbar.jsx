import { Button, Grid } from "@mui/joy";
import { useCookies } from "react-cookie";
import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { isUserLogin } from "../states/atoms/userLogin";
import { useRecoilState } from "recoil";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [isLogin, setIsLogin] = useRecoilState(isUserLogin);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/login");
    setIsLogin(false);
  };
  console.log(cookies);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        sx={{}}
      >
        {isLogin ? (
          <Grid>
            <Button color="neutral" onClick={logout} variant="plain">
              <span className="link">Logout</span>
            </Button>
          </Grid>
        ) : (
          <>
            <Grid>
              <Button color="neutral" variant="plain">
                <Link to="/register" className="link">
                  Sign Up
                </Link>
              </Button>
            </Grid>
            <Button color="neutral" variant="plain">
              <Link to="/login" className="link">
                Login
              </Link>
            </Button>
          </>
        )}
      </Grid>
    </>
  );
}

export default Navbar;
