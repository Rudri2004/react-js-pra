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
        setError("");

  if (!email || !password) {
     setError("Email and password are required");
     return;
  } try {
            setLoading(true); 
            const data = await loginUser(email, password);
            console.log("Login response:", data);

            localStorage.setItem(
                "token",
                data.accessToken
            );

  onLoginSuccess();  }
   catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="login-page">
            <div className="login-card">
         <div className="login-header">

                    <h1>  User Management</h1>

                    <p> Login to manage your users </p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="form-group">

                        <label>Email </label>

                        <input type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)
                            }
                            placeholder="Enter your email"  />
                    </div>
<div className="form-group">

                        <label> Password </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                        />   </div>

                    {error && (

                        <div className="error-message">
                            {error}
                        </div>  )}
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