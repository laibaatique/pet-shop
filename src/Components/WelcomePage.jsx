import React from "react";
import { Container, Typography, Button } from "@mui/material";
import pets from "../assets/Pictures/pets_images.jpg";
import logo from "../assets/Pictures/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const userIndex = JSON.parse(localStorage.getItem("userIndex"));
    const currentPath = location.pathname;

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

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        padding: "20px",
        minHeight: "100vh", // Ensure the container covers the full viewport height
        background:
          " radial-gradient(circle at 50.3% 44.5%, rgb(116, 147, 179) 0%, rgb(62, 83, 104) 100.2%)",
      }}
    >
      <NavLink to="/logo" style={{ textDecoration: "none" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            position: "absolute",
            top: "14px",
            left: "190px",
            width: "130px", // Adjust width as needed
            height: "85px", // Maintain aspect ratio
            boxShadow:
              "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(0, 0, 0, 0.2)",
          }}
        ></img>
      </NavLink>
      <div style={{ marginRight: "45vh" }}>
        <Typography variant="h4">Welcome to Pet Mania</Typography>
      </div>

      <div
        style={{
          position: "absolute",
          top: "480px",
          right: "420px",
          padding: "20px",
          borderRadius: "5px",
          height: "40px",
          width: "350px",
          backgroundColor: "#F0F0F0",
          boxShadow:
            "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{
              top: "-13px",
              backgroundColor: "#7aa5d2",
              color: "#000000",
              width: "370px",
              height: "27px",
              fontSize: "1.2rem",
              marginBottom: "10px",
              right: "9px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Box shadow for the button
            }}
          >
            Login
          </Button>
        </NavLink>

        <NavLink to="/signup" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{
              top: "-13px",
              color: "#000000",
              width: "370px",
              height: "27px",
              fontSize: "1.2rem",
              right: "9px",

              marginBottom: "10px",
              backgroundColor: "#7aa5d2",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Box shadow for the button
            }}
          >
            Signup
          </Button>
        </NavLink>
      </div>

      <img
        src={pets}
        alt="Pet Image 1"
        style={{
          width: "630px",
          marginTop: "30px",
          marginLeft: "-50px",
          marginRight: "100px",
          boxShadow:
            "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(0, 0, 0, 0.2)",
        }}
      />
    </Container>
  );
}

export default WelcomePage;
