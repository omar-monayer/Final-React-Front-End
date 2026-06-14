import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { loginUser } from "../auth/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
  event.preventDefault();

  setError("");
  setLoading(true);

  try {
    const user = await loginUser(email, password);

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    const role = String(user.role).toLowerCase();

    if (role === "admin") {
      navigate("/admin/company-filters");
    } else if (role === "user") {
      navigate("/");
    } else {
      setError("Invalid user role.");
    }
  } catch (err) {
    setError(err.message || "Login failed.");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Sign in to continue</p>

        {error && <div className="login-error">{error}</div>}

        <div className="login-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;