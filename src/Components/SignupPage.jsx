import React, { useState } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";

function SignupPage(props) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    if (password !== password1) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (userName === "" && password === "") {
      setPasswordError("Enter your complete credentials");
      return;
    }
    if (userName === "") {
      setPasswordError("Enter your complete credentials");
      return;
    }
    if (password === "") {
      setPasswordError("Enter your complete credentials");
      return;
    }

    if (password1 === "") {
      setPasswordError("Enter your complete credentials");
      return;
    }

    if (email === "") {
      setPasswordError("Enter your complete credentials");
      return;
    }

    if (
      props.userNames.some(
        (user) => user.userName.toLowerCase() === userName.toLowerCase()
      )
    ) {
      setPasswordError("Username already exists");
      return;
    }

    if (props.userNames.some((user) => user.email === email)) {
      setPasswordError("Email already exists");
      return;
    }

    props.addUser({ userName, email, password });

    console.log("signup", props.userNames);
    navigate("/login");
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
            top: "13px",
            left: "530px",
            width: "190px", // Adjust width as needed
            height: "150px", // Maintain aspect ratio
            boxShadow:
              "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(0, 0, 0, 0.2)",
          }}
        ></img>
      </NavLink>
      <div style={{ marginRight: "65vh", marginTop: "23.5vh" }}>
        <Typography variant="h4" align="center">
          Signup
        </Typography>
      </div>

      <div
        style={{
          position: "absolute",
          top: "210px",
          right: "428px",
          padding: "20px",
          borderRadius: "5px",
          height: "334px",
          width: "350px",
          backgroundColor: "#F0F0F0",
          boxShadow:
            "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ marginRight: "-3vh", marginTop: "6vh", width: "600px" }}>
          <TextField
            label="Username"
            type="text"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              marginTop: "-35px",
              width: "350px",
              marginRight: "-60px",
              marginLeft: "0px",
            }}
            FormHelperTextProps={{
              style: {
                color: "#CCCCCC", // Helper text color
              },
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

        <div style={{ marginRight: "-3vh", marginTop: "-2vh", width: "600px" }}>
          <TextField
            label="Email"
            type="text"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              marginTop: "25px",
              width: "350px",
              marginRight: "-60px",
              marginLeft: "0px",
            }}
            FormHelperTextProps={{
              style: {
                color: "#CCCCCC", // Helper text color
              },
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

        <div style={{ marginRight: "-3vh", marginTop: "-2vh", width: "600px" }}>
          <TextField
            label="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginTop: "25px",
              width: "350px",
              marginRight: "-60px",
              marginLeft: "0px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                backgroundColor: "transparent",
              },
            }}
            FormHelperTextProps={{
              style: {
                color: "#CCCCCC", // Helper text color
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          ></TextField>
        </div>

        <div style={{ marginRight: "-3vh", marginTop: "-2vh", width: "600px" }}>
          <TextField
            label="Confirm password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            required
            onChange={(e) => setPassword1(e.target.value)}
            style={{
              marginTop: "25px",
              width: "350px",
              marginRight: "-60px",
              marginLeft: "0px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                backgroundColor: "transparent",
              },
            }}
            FormHelperTextProps={{
              style: {
                color: "#CCCCCC", // Helper text color
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          ></TextField>
        </div>

        <div style={{ marginRight: "65vh", marginTop: "-1vh" }}>
          <Button
            variant="contained"
            style={{
              width: "350px",
              marginRight: "-60px",
              marginLeft: "0px",
              backgroundColor: "#7aa5d2",
              color: "#000000",
              marginTop: "20px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            }}
            onClick={handleSignup}
          >
            Signup
          </Button>
        </div>

        {passwordError && (
          <Typography
            variant="body1"
            style={{
              color: "red",
              marginRight: "35vh",
              marginTop: "1vh",
              display: "inline-block",
              width: "400px",
              height: "10px",
              marginLeft: "16vh",
            }}
          >
            {passwordError}
          </Typography>
        )}
      </div>
    </Container>
  );
}

export default SignupPage;
