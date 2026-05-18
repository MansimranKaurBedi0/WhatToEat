import { useState } from "react";
import API from "../api/api";

function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [message, setMessage] =
        useState("");


    const handleLogin =
        async (e) => {

            e.preventDefault();

            try {

                const res =
                    await API.post(
                        "/auth/login",
                        {
                            email,
                            password
                        }
                    );

                // save token
                localStorage.setItem(
                    "token",
                    res.data.token
                );

                setMessage(
                    "Login successful ✅"
                );

                console.log(
                    res.data
                );

            }

            catch (error) {

                console.log(error);

                setMessage(
                    error.response?.data?.message ||
                    "Login failed"
                );

            }

        };


    return (

        <div

        >

            <form
                onSubmit={handleLogin}

            >

                <h1

                >
                    Login
                </h1>


                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }

                />


                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }

                />


                <button
                    type="submit"

                >
                    Login
                </button>


                <p

                >
                    {message}
                </p>

            </form>

        </div>

    );

}

export default Login;