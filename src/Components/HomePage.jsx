import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import logo from "../assets/Pictures/logo.png";
import { NavLink } from "react-router-dom";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function HomePage(props) {
  const animalData = props.animalData;
  const navigate = useNavigate();
  const [indexToBeDeleted, setIndexToBeDeleted] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUser, setOpenDialogUser] = useState(false);
  const location = useLocation();

  var userIndex;
  const handleOpenDialog = (index) => {
    setIndexToBeDeleted(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const deleteAnimal = () => {
    if (indexToBeDeleted !== null) {
      const updatedAnimalData = animalData.filter(
        (_, index) => index !== indexToBeDeleted
      );
      props.deleteHandler(updatedAnimalData);
      setIndexToBeDeleted(null); // Reset indexToBeDeleted state
    }
    handleCloseDialog();
  };

  const handleOpenDialogUser = () => {
    setOpenDialogUser(true);
  };

  const handleCloseDialogUser = () => {
    setOpenDialogUser(false);
  };

  const handleLogOut = () => {
    userIndex = JSON.parse(localStorage.getItem("userIndex"));
    if (userIndex !== undefined) {
      localStorage.removeItem("userIndex");
    }
    handleCloseDialogUser();
    navigate("/");
  };

  useEffect(() => {
    const userIndex = JSON.parse(localStorage.getItem("userIndex"));
    const currentPath = location.pathname;
    console.log("home effect", userIndex);
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
            top: "14px",
            left: "190px",
            width: "130px",
            height: "85px",
            boxShadow:
              "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      </NavLink>
      <div
        style={{
          marginRight: "55vh",
        }}
      >
        <Typography variant="h3">Your Pets</Typography>
      </div>
      <div>
        {" "}
        <Button
          variant="contained"
          style={{
            marginRight: "-15px",
            marginTop: "-130px",
            backgroundColor: "#7aa5d2",
            color: "#000000",
            width: "80px",
            height: "30px",
            fontSize: "0.8rem",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
          onClick={handleOpenDialogUser}
        >
          logout
        </Button>
      </div>
      <div
        style={{
          position: "absolute",
          left: "182px",
          right: "182px",
          top: "110px",
          borderTop: "1.4px solid #000000",
        }}
      ></div>

      <NavLink to="/add" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          style={{
            marginRight: "355px",
            marginTop: "39px",
            backgroundColor: "#7aa5d2",
            color: "#000000",
            width: "149px",
            height: "40px",
            fontSize: "0.8rem",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          Add New Animal
        </Button>
      </NavLink>
      {animalData && (
        <Container
          maxWidth="md"
          style={{
            display: "flex",
            flexWrap: "wrap", // Ensure cards wrap to the next line if needed
            justifyContent: "flex-start", // Align cards from the left
            gap: "30px", // Space between cards
            marginTop: "35px",
            marginBottom: "20px", // Bottom margin for spacing
            marginLeft: "20px",
          }}
        >
          {animalData.map((animal, index) => (
            <Card
              key={index}
              style={{
                width: "150px",
                height: "150px",
                marginBottom: "20px",
                position: "relative",
                marginLeft: "16px",
              }}
            >
              <CardContent>
                <Typography variant="body1" style={{ fontSize: "0.8rem" }}>
                  {"Name: "}
                  {animal.name}
                  <br />
                  {"Type: "}
                  {animal.type}
                  <br />
                  {"Breed: "}
                  {animal.breed}
                  <br />
                  {"Price: $"}
                  {animal.price}
                  <br />
                </Typography>
                <ModeEditOutlineTwoToneIcon
                  style={{
                    position: "absolute",
                    top: "125px",
                    right: "22px",
                    cursor: "pointer",
                    color: "#333", // Adjust icon color as needed
                  }}
                  onClick={() => {
                    navigate("/edit/" + index);
                  }}
                />
                <DeleteTwoToneIcon
                  style={{
                    position: "absolute",
                    top: "125px",
                    right: "3px",
                    cursor: "pointer",
                    color: "#333", // Adjust icon color as needed
                  }}
                  onClick={() => handleOpenDialog(index)}
                />
              </CardContent>
            </Card>
          ))}
        </Container>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1" style={{ fontSize: "0.8rem" }}>
            Are you sure you want to delete this pet?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteAnimal} color="primary">
            Yes
          </Button>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialogUser}
        onClose={handleCloseDialogUser}
        aria-labelledby="confirm-logout-dialog-title"
        aria-describedby="confirm-logout-dialog-description"
      >
        <DialogTitle id="confirm-logout-dialog-title">
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" style={{ fontSize: "0.8rem" }}>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogOut} color="primary">
            Yes
          </Button>
          <Button onClick={handleCloseDialogUser} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default HomePage;
