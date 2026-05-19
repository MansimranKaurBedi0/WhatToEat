import { useState, useContext } from "react";

import API from "../api/api";

import { AuthContext } from "../context/AuthContext";

function Signup() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const { login } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      // context login
      login(res.data.token);

      setMessage("Signup successful ✅");
    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSignup}
        className="
                bg-white
                p-8
                rounded-xl
                shadow-lg
                w-[350px]
                flex
                flex-col
                gap-4
                "
      >
        <h1
          className="
                    text-3xl
                    font-bold
                    text-center
                    "
        >
          Signup
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
                    border
                    p-3
                    rounded-lg
                    outline-none
                    "
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
                    border
                    p-3
                    rounded-lg
                    outline-none
                    "
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
                    border
                    p-3
                    rounded-lg
                    outline-none
                    "
        />

        <button
          type="submit"
          className="
                    bg-black
                    text-white
                    p-3
                    rounded-lg
                    hover:opacity-90
                    "
        >
          Signup
        </button>

        <p
          className="
                    text-center
                    text-sm
                    "
        >
          {message}
        </p>
      </form>
    </div>
  );
}

export default Signup;
