import React from "react";
import { Container } from "@mui/material";
import logo from "../assets/Pictures/logo.png";

function Logo() {
  return (
    <Container
      maxWidth="md"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column", // Align items in a column
        justifyContent: "flex-start", // Align items at the top
        alignItems: "flex-end", // Align items to the right
        padding: "20px", // Padding for the container
        background:
          " radial-gradient(circle at 50.3% 44.5%, rgb(116, 147, 179) 0%, rgb(62, 83, 104) 100.2%)",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          position: "absolute",
          top: "50px",
          left: "330px",
          width: "600px", // Adjust width as needed
          height: "500px", // Maintain aspect ratio
          boxShadow:
            "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(0, 0, 0, 0.2)",
        }}
      ></img>
    </Container>
  );
}

export default Logo;
