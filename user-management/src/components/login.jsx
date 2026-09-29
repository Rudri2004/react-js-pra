import { useState } from "react";
import { loginUser } from "../fileservice/userapi";
import "../App.css";

function Login({ onLoginSuccess }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        // Clear previous error
        setError("");

        // Validation
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {

            setLoading(true);

            // Call login API
            const data = await loginUser(email, password);

            console.log("Login response:", data);

            // Store token
            localStorage.setItem(
                "token",
                data.accessToken
            );

            // Tell App.jsx login was successful
            onLoginSuccess();

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="login-page">

            <div className="login-card">

                {/* Header */}

                <div className="login-header">

                    <h1>
                        User Management
                    </h1>

                    <p>
                        Login to manage your users
                    </p>

                </div>


                {/* Login Form */}

                <form onSubmit={handleLogin}>

                    {/* Email */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                        />

                    </div>


                    {/* Password */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                        />

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="error-message">

                            {error}

                        </div>

                    )}


                    {/* Login Button */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>

            </div>

        </div>

    );
}

export default Login;