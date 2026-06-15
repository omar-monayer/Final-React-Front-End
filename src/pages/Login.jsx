import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { loginUser } from "../auth/authService";
import API_URL from "../config/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [weather, setWeather] = useState(null);

  useEffect(() => {
  async function loadWeather() {
    try {
      const response = await fetch(`${API_URL}/api/weather/amman`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.log("Weather failed to load:", error.message);
    }
  }

  loadWeather();
}, []);

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

        {weather ? (
          <div className="card bg-dark border-info text-light mb-4 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge text-bg-info">Live Weather</span>
              </div>

              <h6 className="card-title mb-2">🌤️ {weather.city}</h6>

              <div className="d-flex justify-content-between align-items-center">
                <strong className="fs-3">{Math.round(weather.temperature)}°C</strong>
                <span className="text-secondary">{weather.description}</span>
              </div>

              <small className="text-secondary">
                Wind speed: {weather.windSpeed} km/h
              </small>
            </div>
          </div>
        ) : (
          <div className="alert alert-info d-flex align-items-center gap-2 mb-4">
            <div className="spinner-border spinner-border-sm" role="status"></div>
            <span>Loading live weather...</span>
          </div>
        )}

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