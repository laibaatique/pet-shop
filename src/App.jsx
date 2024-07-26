import { useState, createContext, useEffect } from "react";
import WelcomePage from "./Components/WelcomePage";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import HomePage from "./Components/HomePage";
import ErrorPage from "./Components/ErrorPage";
import Logo from "./Components/Logo";
import { Routes, Route } from "react-router-dom";
import Add from "./Components/Add";
import sign from "jwt-encode";
import Edit from "./Components/Edit";

export const AnimalDataContext = createContext();

function App() {
  const [animalData, setAnimalData] = useState([
    { name: "Fluffy", type: "Cat", breed: "Persian", price: 50 },
    { name: "Buddy", type: "Dog", breed: "Golden Retriever", price: 100 },
  ]);

  const [userNames, setUserNames] = useState([
    {
      userName: "Laiba",
      email: "laibaatique55@gmail.com",
      password: "happy",
    },
    {
      userName: "Talha",
      email: "talha.asgher222@gmail.com",
      password: "bajwa",
    },
  ]);

  // Function to generate a random string for JWT secret
  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  const secret = generateRandomString(32);

  // Function to generate JWT for a user
  function generateJWT(user) {
    const data = {
      userName: user.userName,
      password: user.password,
      isLogged: user.isLogged,
    };

    const jwt = sign(data, secret);
    return jwt;
  }

  // Function to update tokens for all users
  const updateTokens = (updatedUserNames) => {
    const updatedTokens = updatedUserNames.map((user) => ({
      ...user,
      JWT: generateJWT(user),
    }));
    setUserNames(updatedTokens);
    storeTokens(updatedTokens); // Store updated tokens in localStorage
  };

  // Function to store tokens in localStorage
  function storeTokens(users) {
    const tokens = users.map((user) => user.JWT);
    localStorage.setItem("userTokens", JSON.stringify(tokens));
  }

  // Initial generation of tokens when component mounts
  useEffect(() => {
    updateTokens(userNames);
  }, []);

  storeTokens(userNames);
  // Handler to add a new user
  const handleAddUser = (newUser) => {
    var newUserData = [...userNames, newUser];
    setUserNames(newUserData);
    updateTokens(newUserData); // Update tokens when a new user is added
  };

  const handleDeleteUser = (usersAfterDeletion) => {
    setUserNames(usersAfterDeletion);
    updateTokens(usersAfterDeletion); // Update tokens when a user is deleted
  };

  const handleAddAnimal = (newAnimal) => {
    const newAnimalData = [...animalData, newAnimal];
    setAnimalData(newAnimalData);
  };

  const editAnimalData = (updatedAnimalData) => {
    setAnimalData(updatedAnimalData);
  };

  console.log(userNames);
  const handleDeleteAnimal = (animalsAfterDeletion) => {
    setAnimalData(animalsAfterDeletion);
  };
  return (
    <div>
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage secret={secret} />} />
        <Route
          path="/signup"
          element={
            <SignupPage
              addUser={(newUser) => handleAddUser(newUser)}
              userNames={userNames}
            />
          }
        />
        <Route path="/logo" element={<Logo />} />
        <Route
          path="/home"
          element={
            <HomePage
              animalData={animalData}
              deleteHandler={(animalsAfterDeletion) =>
                handleDeleteAnimal(animalsAfterDeletion)
              }
            />
          }
        />
        <Route
          path="/add"
          element={
            <Add addHandler={(newAnimal) => handleAddAnimal(newAnimal)} />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Edit
              editHandler={(updatedAnimalData) =>
                editAnimalData(updatedAnimalData)
              }
              animalData={animalData}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
