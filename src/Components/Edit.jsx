import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import logo from "../assets/Pictures/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Edit = (props) => {
  const navigate = useNavigate();
  console.log(useParams());
  const { id } = useParams();

  const handleClose = () => {
    navigate("/home");
  };

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [price, setPrice] = useState("");
  const [nameError, setNameError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [breedError, setBreedError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    if (props.animalData[parseInt(id)]) {
      setName(props.animalData[parseInt(id)].name);
      setType(props.animalData[parseInt(id)].type);
      setBreed(props.animalData[parseInt(id)].breed);
      setPrice(props.animalData[parseInt(id)].price);
    }
  }, [props.animalData, id]);

  const isPositiveNumber = (value) => {
    const number = parseFloat(value);
    return !isNaN(number) && number > 0;
  };

  const editData = () => {
    const validName = name.trim() !== "";
    const validType = type.trim() !== "";
    const validBreed = breed.trim() !== "";
    const validPrice = isPositiveNumber(price.trim());

    if (validName && validType && validBreed && validPrice) {
      const updatedData = [...props.animalData];
      updatedData[parseInt(id)] = {
        ...updatedData[parseInt(id)],
        name: name,
        type: type,
        breed: breed,
        price: price,
      };
      props.editHandler(updatedData);
      navigate("/home");
    } else {
      setNameError(!name);
      setTypeError(!type);
      setBreedError(!breed);
      setPriceError(!price);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(e.target.value === "");
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setTypeError(e.target.value === "");
  };

  const handleBreedChange = (e) => {
    setBreed(e.target.value);
    setBreedError(e.target.value === "");
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setPriceError(!isPositiveNumber(e.target.value) && e.target.value !== "");
  };

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
            // top: "10px",
            // left: "20px",
            top: "14px",
            left: "190px",
            width: "130px", // Adjust width as needed
            height: "85px", // Maintain aspect ratio
            boxShadow:
              "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      </NavLink>

      <div style={{ marginRight: "45vh" }}>
        <Typography variant="h3">Edit Your Animal</Typography>
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

      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "20px",
          borderRadius: "10px",
          top: "75px",
          right: "235px",
          //  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Box shadow for prominence
          width: "350px",
          maxWidth: "100%",
          position: "relative",
          boxShadow:
            "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <IconButton
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "-5px",
            right: "6px",
            padding: "8px", // Adjust padding as needed
            color: "#000000", // Black color for icon
            left: "365px",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Form Fields */}
        <TextField
          label="Name"
          type="text"
          value={name}
          variant="outlined"
          onChange={handleNameChange}
          required
          fullWidth
          error={nameError}
          style={{ marginBottom: "20px", marginTop: "10px" }}
          InputProps={{
            style: {
              fontWeight: 500,
              color: "#000000",
              backgroundColor: "#F0F0F0",
            },
          }}
        />

        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}
          required
          error={typeError}
        >
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={handleTypeChange}
            label="Type"
            fullWidth
            style={{ fontWeight: 500, color: "#000000" }}
          >
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Bird">Bird</MenuItem>
            <MenuItem value="Fish">Fish</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Breed"
          type="text"
          value={breed}
          variant="outlined"
          onChange={handleBreedChange}
          required
          fullWidth
          error={breedError}
          style={{ marginBottom: "20px" }}
          InputProps={{
            style: {
              fontWeight: 500,
              color: "#000000",
              backgroundColor: "#F0F0F0",
            },
          }}
        />

        <TextField
          label="Price"
          type="text"
          value={price}
          variant="outlined"
          onChange={handlePriceChange}
          required
          fullWidth
          error={priceError}
          style={{ marginBottom: "20px" }}
          InputProps={{
            style: {
              fontWeight: 500,
              color: "#000000",
              backgroundColor: "#F0F0F0",
            },
          }}
        />

        {/* Edit Animal Button */}
        <Button
          variant="contained"
          style={{
            backgroundColor: "#7aa5d2",
            color: "#000000",
            width: "100%",
            //  fontWeight: "bold",
            fontSize: "16px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Box shadow for the button
          }}
          onClick={editData}
        >
          Edit Animal
        </Button>
      </div>
    </Container>
  );
};

export default Edit;
