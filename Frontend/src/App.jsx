import "./App.css";

import { useContext } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthContext } from "./context/AuthContext";
import Profile from "./pages/Profile";
import FoodLog from "./pages/Food";
import RecipeGenerator from "./pages/RecipeGenerator";

function App() {
  const { isLogin, logout } = useContext(AuthContext);

  // if user NOT logged in
  if (!isLogin) {
    return (
      <div>
        <h1>WhatToEat 🍽️</h1>
        <p>Smart AI Based Health Food Recommendation</p>

        <div>
          <Login />
          <Signup />
        </div>
      </div>
    );
  }

  // if user logged in
  return (
    <div>
      <h1>Welcome To WhatToEat 🚀</h1>
      <Profile></Profile>
      <FoodLog></FoodLog>
      <RecipeGenerator></RecipeGenerator>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
