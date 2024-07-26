import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logo from "../assets/Pictures/logo.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
function LoginPage({ secret }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const location = useLocation();
  useEffect(() => {
    const userIndex = JSON.parse(localStorage.getItem("userIndex"));
    const currentPath = location.pathname;
    console.log("login effect", userIndex, currentPath);
    if (userIndex !== null && userIndex !== undefined) {
      // User is logged in
      if (currentPath === "/login") {
        navigate("/home");
      } else {
        navigate(currentPath);
      }
    } else {
      // User is not logged in
      if (currentPath !== "/login") {
        navigate("/");
      }
    }
  }, [navigate, location.pathname]);

  const handleLogin = () => {
    const storedTokens = JSON.parse(localStorage.getItem("userTokens")) || [];
    var userIndex;
    function decodeAllStoredTokens(storedTokens, secret) {
      const decodedDataArray = storedTokens.map((jwtToken) => {
        try {
          const decoded = jwtDecode(jwtToken, secret);
          return {
            jwt: jwtToken,
            userName: decoded.userName,
            password: decoded.password,
            isLogged: decoded.isLogged,
          };
        } catch (error) {
          console.error("Error decoding JWT:", error);
          return null; // or handle the error as needed
        }
      });

      return decodedDataArray.filter((data) => data !== null);
    }

    const decodedArray = decodeAllStoredTokens(storedTokens, secret);

    // const foundUser = decodedArray.find(
    //   (user) => user.userName.toLowerCase() === userName.toLowerCase()
    // );
    const foundUser = decodedArray.find((user) => user.password === password);

    userIndex = decodedArray.findIndex(
      (user) => user.userName.toLowerCase() === userName.toLowerCase()
    );
    console.log("after", userIndex);
    if (foundUser === undefined) {
      setError("User not found");
      return;
    }

    if (userName === "" && password === "") {
      setError("Enter your credentials");
      return;
    }
    if (userName === "") {
      setError("Enter your complete credentials");
      return;
    }
    if (password === "") {
      setError("Enter your complete credentials");
      return;
    }

    if (foundUser.password !== password) {
      setError("Incorrect password");
    } else {
      localStorage.setItem("userIndex", JSON.stringify(userIndex));
      navigate("/home");
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        flexDirection: "column", // Align items in a column
        justifyContent: "flex-start", // Align items at the top
        alignItems: "flex-end", // Align items to the right
        padding: "20px", // Padding for the container
        background:
          " radial-gradient(circle at 50.3% 44.5%, rgb(116, 147, 179) 0%, rgb(62, 83, 104) 100.2%)",
        minHeight: "100vh",
      }}
    >
      <NavLink to="/logo" style={{ textDecoration: "none" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            position: "absolute",
            top: "15px",
            left: "530px",
            width: "190px", // Adjust width as needed
            height: "150px", // Maintain aspect ratio
            boxShadow:
              "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(0, 0, 0, 0.2)",
          }}
        ></img>
      </NavLink>
      <div style={{ marginRight: "67vh", marginTop: "25vh" }}>
        <Typography variant="h4" align="center">
          Login
        </Typography>
      </div>

      <div
        style={{
          position: "absolute",
          top: "226px",
          right: "428px",
          padding: "20px",
          borderRadius: "5px",
          height: "315px",
          width: "350px",
          backgroundColor: "#F0F0F0",
          boxShadow:
            "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ marginRight: "56vh", marginTop: "7vh" }}>
          <TextField
            label="Username"
            variant="outlined"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              marginTop: "-35px",
              width: "350px",
              marginRight: "-60px",
              marginLeft: "0px",
            }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              style: {
                backgroundColor: "transparent",
              },
            }}
          ></TextField>
        </div>

        <div style={{ marginRight: "50vh", marginTop: "3vh" }}>
          <TextField
            label="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginTop: "-2px",
              width: "350px",
              marginRight: "-60px",
              marginLeft: "0px",
            }}
            InputProps={{
              style: {
                backgroundColor: "transparent",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          ></TextField>
        </div>

        <div style={{ marginRight: "48vh", marginTop: "2vh" }}>
          <Button
            variant="contained"
            onClick={handleLogin}
            style={{
              width: "350px",
              marginRight: "-60px",
              marginLeft: "0px",
              backgroundColor: "#7aa5d2",

              color: "#000000",
              marginTop: "5px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            Login
          </Button>
        </div>

        <div
          style={{
            position: "absolute",
            left: "-6px",
            right: "500px",
            top: "230px",
            height: "1.6px", // Set the height of the line
            width: "400px",
            background:
              "linear-gradient(to right, rgba(0,0,0,0), #000000, rgba(0,0,0,0))",
          }}
        ></div>

        <Typography
          variant="body1"
          style={{
            color: "#000000",
            display: "block",
            marginLeft: "120px", // Adjusted to a smaller value
            maxWidth: "200px",
            marginTop: "35px",
          }}
        >
          Not Registered?
        </Typography>

        <div>
          <NavLink to="/signup" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                // backgroundColor: "#CCCCCC",
                // backgroundColor: "#85a6b1",
                backgroundColor: "#7aa5d2",

                color: "#000000",

                width: "350px",
                marginRight: "-60px",
                marginLeft: "0px",

                marginTop: "9px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              Sign Up
            </Button>
          </NavLink>
        </div>

        {error && (
          <Typography
            variant="body1"
            style={{
              color: "red",
              marginRight: "40vh",
              marginTop: "2vh",
              display: "inline-block",
              width: "200px",
              height: "10px",
              marginLeft: "20vh",
            }}
          >
            {error}
          </Typography>
        )}
      </div>
    </Container>
  );
}

export default LoginPage;
